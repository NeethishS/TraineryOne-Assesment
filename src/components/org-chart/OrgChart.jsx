import React, { useState, useMemo, useRef } from 'react';
import { buildHierarchy } from '../../utils/hierarchy';
import OrgNodeCard from './OrgNodeCard';
import { Maximize2, Minimize2, GitFork, ZoomIn, ZoomOut, Scan } from 'lucide-react';

/**
 * Recursive Tree Branch renderer.
 */
function OrgBranch({ node, expandedNodes, onToggleExpand }) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.employee.id);

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <OrgNodeCard
        node={node}
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
        hasChildren={hasChildren}
      />

      {/* Children Tree Branch with Connector Lines */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center w-full mt-5">
          {/* Vertical Stem Line Down from Parent */}
          <div className="w-0.5 h-6 bg-slate-300"></div>

          {/* Children Container */}
          <div className="flex items-start justify-center relative pt-2">
            {node.children.map((childNode, index) => {
              const isFirst = index === 0;
              const isLast = index === node.children.length - 1;
              const isOnlyChild = node.children.length === 1;

              return (
                <div key={childNode.employee.id} className="relative flex flex-col items-center px-3.5">
                  {/* Top Horizontal Connector Bar for multiple children */}
                  {!isOnlyChild && (
                    <div
                      className={`absolute top-0 h-0.5 bg-slate-300 ${
                        isFirst
                          ? 'left-1/2 right-0'
                          : isLast
                          ? 'left-0 right-1/2'
                          : 'left-0 right-0'
                      }`}
                    />
                  )}

                  {/* Vertical Line down into Child */}
                  <div className="w-0.5 h-4 bg-slate-300"></div>

                  {/* Recursive Child Branch */}
                  <OrgBranch
                    node={childNode}
                    expandedNodes={expandedNodes}
                    onToggleExpand={onToggleExpand}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Main Organization Chart component.
 */
export default function OrgChart({ employees }) {
  const canvasContainerRef = useRef(null);
  const canvasTreeRef = useRef(null);

  // Chart Zoom Scale state: min 50% (0.5), max 125% (1.25), default 100% (1.0)
  const [zoomScale, setZoomScale] = useState(1.0);

  // Build hierarchy tree from flat employees
  const rootNodes = useMemo(() => buildHierarchy(employees), [employees]);

  // Track expanded employee node IDs
  const [expandedNodes, setExpandedNodes] = useState(() => {
    // Default expand roots and top managers
    const set = new Set();
    employees.forEach((emp) => {
      if (emp.managerId === null || emp.managerId === 'emp-1' || emp.managerId === 'emp-2' || emp.managerId === 'emp-3') {
        set.add(emp.id);
      }
    });
    return set;
  });

  const toggleExpand = (employeeId) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(employeeId)) {
        next.delete(employeeId);
      } else {
        next.add(employeeId);
      }
      return next;
    });
  };

  const expandAll = () => {
    const all = new Set(employees.map((e) => e.id));
    setExpandedNodes(all);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  // Zoom In handler (+10%, max 1.25)
  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(1.25, Math.round((prev + 0.1) * 100) / 100));
  };

  // Zoom Out handler (-10%, min 0.5)
  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(0.5, Math.round((prev - 0.1) * 100) / 100));
  };

  // Fit handler — calculates optimal scale so hierarchy fits in view container comfortably
  const handleFit = () => {
    if (!canvasContainerRef.current || !canvasTreeRef.current) return;
    const containerWidth = canvasContainerRef.current.clientWidth - 48; // padding offset
    const treeWidth = canvasTreeRef.current.scrollWidth;

    if (treeWidth > 0 && containerWidth > 0) {
      const computedRatio = containerWidth / treeWidth;
      // Clamp scale between 0.50 (50%) and 1.0 (100%)
      const clampedScale = Math.max(0.5, Math.min(1.0, Math.round(computedRatio * 100) / 100));
      setZoomScale(clampedScale);
    }
  };

  if (!employees || employees.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-xl p-12 text-center text-slate-500 shadow-2xs">
        <GitFork className="w-10 h-10 mx-auto text-slate-400 mb-3" />
        <p className="font-medium text-slate-700">No organizational data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quick Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-xs shadow-2xs select-none">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <GitFork className="w-4 h-4 text-brand-600" />
          <span>Interactive Hierarchy View</span>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {/* Zoom Controls: [-] [100%] [+] [Fit] */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoomScale <= 0.5}
              className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed rounded hover:bg-slate-200/60 focus:outline-none focus:ring-1 focus:ring-brand-500"
              title="Zoom out organization chart"
              aria-label="Zoom out organization chart"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <span className="px-2 font-mono text-[11px] font-semibold text-slate-700 min-w-[42px] text-center select-none">
              {Math.round(zoomScale * 100)}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoomScale >= 1.25}
              className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed rounded hover:bg-slate-200/60 focus:outline-none focus:ring-1 focus:ring-brand-500"
              title="Zoom in organization chart"
              aria-label="Zoom in organization chart"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleFit}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            title="Fit organization chart to view"
            aria-label="Fit organization chart to view"
          >
            <Scan className="w-3.5 h-3.5 text-brand-600" />
            <span>Fit</span>
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          {/* Expand / Collapse Controls */}
          <button
            type="button"
            onClick={expandAll}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <Minimize2 className="w-3.5 h-3.5 text-slate-500" />
            Collapse All
          </button>
        </div>
      </div>

      {/* Org Chart Scroll Canvas Container */}
      <div
        ref={canvasContainerRef}
        className="w-full overflow-x-auto bg-slate-100/60 border border-slate-200/80 rounded-xl min-h-[520px] shadow-inner"
      >
        <div
          className="inline-flex min-w-full justify-center p-6 sm:p-8"
          style={{
            transform: `scale(${zoomScale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
        >
          <div ref={canvasTreeRef} className="flex gap-16 items-start py-2">
            {rootNodes.map((rootNode) => (
              <OrgBranch
                key={rootNode.employee.id}
                node={rootNode}
                expandedNodes={expandedNodes}
                onToggleExpand={toggleExpand}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
