use std::ptr::null_mut;
use libc::c_void;
use libc::c_char;

use std::ffi::CStr;
use std::str;

use std::sync::atomic::Ordering;

use plan::Plan;
use ::plan::MutatorContext;
use ::plan::TraceLocal;
use ::plan::CollectorContext;
use ::plan::ParallelCollectorGroup;
use ::plan::plan::CONTROL_COLLECTOR_CONTEXT;

use ::vm::{Collection, VMCollection};

#[cfg(feature = "jikesrvm")]
use ::vm::jikesrvm::JTOC_BASE;

use ::util::{Address, ObjectReference};
use ::util::options::OPTION_MAP;

use ::plan::selected_plan;
use self::selected_plan::SelectedPlan;

use ::plan::Allocator;
use util::constants::LOG_BYTES_IN_PAGE;
use util::heap::layout::vm_layout_constants::HEAP_START;
use util::heap::layout::vm_layout_constants::HEAP_END;
use ::util::sanity::sanity_checker::{INSIDE_SANITY, SanityChecker};

#[no_mangle]
#[cfg(feature = "jikesrvm")]
pub unsafe extern fn jikesrvm_gc_init(jtoc: *mut c_void, heap_size: usize) {
    ::util::logger::init().unwrap();
    JTOC_BASE = Address::from_mut_ptr(jtoc);
    selected_plan::PLAN.gc_init(heap_size);
    debug_assert!(54 == ::vm::JikesRVM::test(44));
    debug_assert!(112 == ::vm::JikesRVM::test2(45, 67));
    debug_assert!(731 == ::vm::JikesRVM::test3(21, 34, 9, 8));
}

#[no_mangle]
#[cfg(not(feature = "jikesrvm"))]
pub extern fn jikesrvm_gc_init(_jtoc: *mut c_void, _heap_size: usize) {
    panic!("Cannot call jikesrvm_gc_init when not building for JikesRVM");
}

#[no_mangle]
#[cfg(feature = "jikesrvm")]
pub extern fn start_control_collector(thread_id: usize) {
    CONTROL_COLLECTOR_CONTEXT.run(thread_id);
}

#[no_mangle]
#[cfg(not(feature = "jikesrvm"))]
pub extern fn start_control_collector(rvm_thread: *mut c_void) {
    panic!("Cannot call start_control_collector when not building for JikesRVM");
}

#[no_mangle]
pub unsafe extern fn gc_init(heap_size: usize) {
    if cfg!(feature = "jikesrvm") {
        panic!("Should be calling jikesrvm_gc_init instead");
    }
    ::util::logger::init().unwrap();
    selected_plan::PLAN.gc_init(heap_size);
    ::plan::plan::INITIALIZED.store(true, Ordering::SeqCst);
}

#[no_mangle]
pub extern fn bind_mutator(thread_id: usize) -> *mut c_void {
    SelectedPlan::bind_mutator(&selected_plan::PLAN, thread_id)
}

#[no_mangle]
pub unsafe fn alloc(mutator: *mut c_void, size: usize,
             align: usize, offset: isize, allocator: Allocator) -> *mut c_void {
    let local = &mut *(mutator as *mut <SelectedPlan as Plan>::MutatorT);
    local.alloc(size, align, offset, allocator).as_usize() as *mut c_void
}

#[no_mangle]
#[inline(never)]
pub unsafe fn alloc_slow(mutator: *mut c_void, size: usize,
                  align: usize, offset: isize, allocator: Allocator) -> *mut c_void {
    let local = &mut *(mutator as *mut <SelectedPlan as Plan>::MutatorT);
    local.alloc_slow(size, align, offset, allocator).as_usize() as *mut c_void
}

#[no_mangle]
pub extern fn post_alloc(mutator: *mut c_void, refer: ObjectReference, type_refer: ObjectReference,
                         bytes: usize, allocator: Allocator) {
    let local = unsafe {&mut *(mutator as *mut <SelectedPlan as Plan>::MutatorT)};
    local.post_alloc(refer, type_refer, bytes, allocator);
}

#[no_mangle]
pub unsafe extern fn mmtk_malloc(size: usize) -> *mut c_void {
    alloc(null_mut(), size, 1, 0, Allocator::Default)
}

#[no_mangle]
pub extern fn mmtk_free(_ptr: *const c_void) {}

#[no_mangle]
pub extern fn will_never_move(object: ObjectReference) -> bool {
    selected_plan::PLAN.will_never_move(object)
}

#[no_mangle]
pub unsafe extern fn is_valid_ref(val: ObjectReference) -> bool {
    selected_plan::PLAN.is_valid_ref(val)
}

#[no_mangle]
pub unsafe extern fn report_delayed_root_edge(trace_local: *mut c_void, addr: *mut c_void) {
    trace!("JikesRVM called report_delayed_root_edge with trace_local={:?}", trace_local);
    if cfg!(feature = "sanity") && INSIDE_SANITY.load(Ordering::Relaxed) {
        let local = &mut *(trace_local as *mut SanityChecker);
        local.report_delayed_root_edge(Address::from_usize(addr as usize));
    } else {
        let local = &mut *(trace_local as *mut <SelectedPlan as Plan>::TraceLocalT);
        local.report_delayed_root_edge(Address::from_usize(addr as usize));
    }
    trace!("report_delayed_root_edge returned with trace_local={:?}", trace_local);
}

#[no_mangle]
pub unsafe extern fn will_not_move_in_current_collection(trace_local: *mut c_void, obj: *mut c_void) -> bool {
    trace!("will_not_move_in_current_collection({:?}, {:?})", trace_local, obj);
    if cfg!(feature = "sanity") && INSIDE_SANITY.load(Ordering::Relaxed) {
        let local = &mut *(trace_local as *mut SanityChecker);
        let ret = local.will_not_move_in_current_collection(Address::from_usize(obj as usize).to_object_reference());
        trace!("will_not_move_in_current_collection returned with trace_local={:?}", trace_local);
        ret
    } else {
        let local = &mut *(trace_local as *mut <SelectedPlan as Plan>::TraceLocalT);
        let ret = local.will_not_move_in_current_collection(Address::from_usize(obj as usize).to_object_reference());
        trace!("will_not_move_in_current_collection returned with trace_local={:?}", trace_local);
        ret
    }
}

#[no_mangle]
pub unsafe extern fn process_interior_edge(trace_local: *mut c_void, target: *mut c_void, slot: *mut c_void, root: bool) {
    trace!("JikesRVM called process_interior_edge with trace_local={:?}", trace_local);
    if cfg!(feature = "sanity") && INSIDE_SANITY.load(Ordering::Relaxed) {
        let local = &mut *(trace_local as *mut SanityChecker);
        local.process_interior_edge(Address::from_usize(target as usize).to_object_reference(),
                                     Address::from_usize(slot as usize), root);
    } else {
        let local = &mut *(trace_local as *mut <SelectedPlan as Plan>::TraceLocalT);
        local.process_interior_edge(Address::from_usize(target as usize).to_object_reference(),
                                    Address::from_usize(slot as usize), root);
    }
    trace!("process_interior_root_edge returned with trace_local={:?}", trace_local);

}

#[no_mangle]
pub unsafe extern fn start_worker(thread_id: usize, worker: *mut c_void) {
    let worker_instance = &mut *(worker as *mut <SelectedPlan as Plan>::CollectorT);
    worker_instance.init(thread_id);
    worker_instance.run(thread_id);
}

#[no_mangle]
#[cfg(feature = "jikesrvm")]
pub unsafe extern fn enable_collection(thread_id: usize) {
    (&mut *CONTROL_COLLECTOR_CONTEXT.workers.get()).init_group(thread_id);
    VMCollection::spawn_worker_thread::<<SelectedPlan as Plan>::CollectorT>(thread_id, null_mut()); // spawn controller thread
    ::plan::plan::INITIALIZED.store(true, Ordering::SeqCst);
}

#[no_mangle]
#[cfg(not(feature = "jikesrvm"))]
pub extern fn enable_collection(size: usize) {
    panic!("Cannot call enable_collection when not building for JikesRVM");
}

#[no_mangle]
pub extern fn process(name: *const c_char, value: *const c_char) -> bool {
    let name_str: &CStr = unsafe { CStr::from_ptr(name) };
    let value_str: &CStr = unsafe { CStr::from_ptr(value) };
    let option = &OPTION_MAP;
    unsafe {
        option.process(name_str.to_str().unwrap(), value_str.to_str().unwrap())
    }
}

#[no_mangle]
#[cfg(feature = "openjdk")]
pub extern fn used_bytes() -> usize {
    selected_plan::PLAN.get_pages_used() << LOG_BYTES_IN_PAGE
}


#[no_mangle]
pub extern fn free_bytes() -> usize {
    selected_plan::PLAN.get_free_pages() << LOG_BYTES_IN_PAGE
}


#[no_mangle]
#[cfg(not(feature = "openjdk"))]
pub extern fn used_bytes() -> usize {
    panic!("Cannot call used_bytes when not building for OpenJDK");
}

#[no_mangle]
pub extern fn starting_heap_address() -> *mut c_void {
    HEAP_START.as_usize() as *mut c_void
}

#[no_mangle]
pub extern fn last_heap_address() -> *mut c_void {
    HEAP_END.as_usize() as *mut c_void
}

#[no_mangle]
pub extern fn total_bytes() -> usize {
    selected_plan::PLAN.get_total_pages() << LOG_BYTES_IN_PAGE
}

#[no_mangle]
#[cfg(feature = "openjdk")]
pub extern fn openjdk_max_capacity() -> usize {
    selected_plan::PLAN.get_total_pages() << LOG_BYTES_IN_PAGE
}

#[no_mangle]
#[cfg(not(feature = "openjdk"))]
pub extern fn openjdk_max_capacity() -> usize {
    panic!("Cannot call max_capacity when not building for OpenJDK");
}

#[no_mangle]
#[cfg(feature = "openjdk")]
pub extern fn executable() -> bool {
    true
}

#[no_mangle]
#[cfg(not(feature = "openjdk"))]
pub extern fn executable() -> bool {
    panic!("Cannot call executable when not building for OpenJDK")
}

#[no_mangle]
pub unsafe extern fn scan_region(){
    ::util::sanity::memory_scan::scan_region();
}

#[no_mangle]
pub unsafe extern fn trace_get_forwarded_referent(trace_local: *mut c_void, object: ObjectReference) -> ObjectReference{
    let local = &mut *(trace_local as *mut <SelectedPlan as Plan>::TraceLocalT);
    local.get_forwarded_reference(object)
}

#[no_mangle]
pub unsafe extern fn trace_get_forwarded_reference(trace_local: *mut c_void, object: ObjectReference) -> ObjectReference{
    let local = &mut *(trace_local as *mut <SelectedPlan as Plan>::TraceLocalT);
    local.get_forwarded_reference(object)
}

#[no_mangle]
pub unsafe extern fn trace_is_live(trace_local: *mut c_void, object: ObjectReference) -> bool{
    let local = &mut *(trace_local as *mut <SelectedPlan as Plan>::TraceLocalT);
    local.is_live(object)
}

#[no_mangle]
pub unsafe extern fn trace_retain_referent(trace_local: *mut c_void, object: ObjectReference) -> ObjectReference{
    let local = &mut *(trace_local as *mut <SelectedPlan as Plan>::TraceLocalT);
    local.retain_referent(object)
}

#[no_mangle]
pub extern fn handle_user_collection_request(thread_id: usize) {
    selected_plan::SelectedPlan::handle_user_collection_request(thread_id);
}

#[no_mangle]
pub extern fn is_mapped_object(object: ObjectReference) -> bool {
    selected_plan::PLAN.is_mapped_object(object)
}

#[no_mangle]
pub extern fn is_mapped_address(address: Address) -> bool {
    selected_plan::PLAN.is_mapped_address(address)
}

#[no_mangle]
pub extern fn modify_check(object: ObjectReference) {
    selected_plan::PLAN.modify_check(object);
}

#[no_mangle]
pub unsafe extern fn add_weak_candidate(reff: *mut c_void, referent: *mut c_void) {
    ::util::reference_processor::add_weak_candidate(
        Address::from_mut_ptr(reff).to_object_reference(),
        Address::from_mut_ptr(referent).to_object_reference());
}

#[no_mangle]
pub unsafe extern fn add_soft_candidate(reff: *mut c_void, referent: *mut c_void) {
    ::util::reference_processor::add_soft_candidate(
        Address::from_mut_ptr(reff).to_object_reference(),
        Address::from_mut_ptr(referent).to_object_reference());
}

#[no_mangle]
pub unsafe extern fn add_phantom_candidate(reff: *mut c_void, referent: *mut c_void) {
    ::util::reference_processor::add_phantom_candidate(
        Address::from_mut_ptr(reff).to_object_reference(),
        Address::from_mut_ptr(referent).to_object_reference());
}