(function() {var implementors = {};
implementors["mmtk"] = [{"text":"impl RefUnwindSafe for Address","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for ObjectReference","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for Allocators&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for AllocatorSelector","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for BumpAllocator&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for DumpLinearScan","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for LargeObjectAllocator&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for GCByte","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for HeaderByte","synthetic":true,"types":[]},{"text":"impl !RefUnwindSafe for FragmentedMapper","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for Map64","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for CommonFreeListPageResource","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for FreeListPageResource&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for HeapMeta","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for MonotonePageResource&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for MonotonePageResourceConditional","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for CommonPageResource&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for SpaceDescriptor","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for VMRequest","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for IntArrayFreeList","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for OpaquePointer","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for NurseryZeroingOptions","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for PlanSelector","synthetic":true,"types":[]},{"text":"impl !RefUnwindSafe for UnsafeOptionsWrapper","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for Options","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for RawMemoryFreeList","synthetic":true,"types":[]},{"text":"impl !RefUnwindSafe for ReferenceProcessors","synthetic":true,"types":[]},{"text":"impl !RefUnwindSafe for ReferenceProcessor","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for Semantics","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for SanityChecker","synthetic":true,"types":[]},{"text":"impl&lt;P, W&gt; RefUnwindSafe for ScheduleSanityGC&lt;P, W&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;P: RefUnwindSafe,<br>&nbsp;&nbsp;&nbsp;&nbsp;W: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;P, W&gt; RefUnwindSafe for SanityPrepare&lt;P, W&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;P: RefUnwindSafe,<br>&nbsp;&nbsp;&nbsp;&nbsp;W: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;P, W&gt; RefUnwindSafe for SanityRelease&lt;P, W&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;P: RefUnwindSafe,<br>&nbsp;&nbsp;&nbsp;&nbsp;W: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for SanityGCProcessEdges&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for MonotoneNanoTime","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; RefUnwindSafe for LongCounter&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;T as Diffable&gt;::Val: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for SharedStats","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for Stats","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for SynchronizedCounter","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for TreadMill","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for MMTK&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for WriteTarget","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for NoBarrier","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for ModBuffer","synthetic":true,"types":[]},{"text":"impl&lt;E, S&gt; !RefUnwindSafe for FieldRememberingBarrier&lt;E, S&gt;","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for ControllerCollectorContext&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; RefUnwindSafe for NoCopy&lt;VM&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;VM: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for GcStatus","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for BasePlan&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for BaseUnsync&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for CommonPlan&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for CommonUnsync&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for AllocationSemantics","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for MutatorConfig&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for Mutator&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for PlanConstraints","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for GenCopy&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for NoGC&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for SemiSpace&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl !RefUnwindSafe for SFTMap","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for CommonSpace&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for SpaceOptions","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for CopySpace&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for ImmortalSpace&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for LargeObjectSpace&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; RefUnwindSafe for LockFreeImmortalSpace&lt;VM&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;VM: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;C&gt; !RefUnwindSafe for CoordinatorMessage&lt;C&gt;","synthetic":true,"types":[]},{"text":"impl&lt;C&gt; !RefUnwindSafe for Scheduler&lt;C&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for SchedulerStat","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for WorkStat","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for WorkerLocalStat","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for WorkBucketStage","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for WorkerLocalPtr","synthetic":true,"types":[]},{"text":"impl&lt;C&gt; !RefUnwindSafe for Worker&lt;C&gt;","synthetic":true,"types":[]},{"text":"impl&lt;C&gt; !RefUnwindSafe for WorkerGroup&lt;C&gt;","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for ScheduleCollection","synthetic":true,"types":[]},{"text":"impl&lt;P, W&gt; RefUnwindSafe for Prepare&lt;P, W&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;P: RefUnwindSafe,<br>&nbsp;&nbsp;&nbsp;&nbsp;W: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for PrepareMutator&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;W&gt; RefUnwindSafe for PrepareCollector&lt;W&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;W: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;P, W&gt; RefUnwindSafe for Release&lt;P, W&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;P: RefUnwindSafe,<br>&nbsp;&nbsp;&nbsp;&nbsp;W: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;VM&gt; !RefUnwindSafe for ReleaseMutator&lt;VM&gt;","synthetic":true,"types":[]},{"text":"impl&lt;W&gt; RefUnwindSafe for ReleaseCollector&lt;W&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;W: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;ScanEdges&gt; RefUnwindSafe for StopMutators&lt;ScanEdges&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;ScanEdges: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl RefUnwindSafe for EndOfGC","synthetic":true,"types":[]},{"text":"impl&lt;Edges&gt; RefUnwindSafe for ScanStackRoots&lt;Edges&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;Edges: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;Edges&gt; !RefUnwindSafe for ScanStackRoot&lt;Edges&gt;","synthetic":true,"types":[]},{"text":"impl&lt;Edges&gt; RefUnwindSafe for ScanVMSpecificRoots&lt;Edges&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;Edges: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;E&gt; !RefUnwindSafe for ProcessEdgesBase&lt;E&gt;","synthetic":true,"types":[]},{"text":"impl&lt;Edges&gt; RefUnwindSafe for ScanObjects&lt;Edges&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;Edges: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;E&gt; RefUnwindSafe for ProcessModBuf&lt;E&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;E: RefUnwindSafe,&nbsp;</span>","synthetic":true,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()