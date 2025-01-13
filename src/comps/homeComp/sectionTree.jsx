'use client'
import { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";


const SectionTree = () => {
  const style = {
    backgroundColor: "#90EE90",
    borderRadius: "25px",
    color: "black",
    width: "100px",
    borderWidth: "3px",
    borderColor: "#000",
  };
  const initialNodes = [
    {
      id: "1",
      position: { x: 350, y: 0 },
      data: { label: "First Story Chapter" },
      style,
      className: "hover:bg-yellow-400",
    },
    {
      id: "2",
      position: { x: 300, y: 100 },
      data: { label: "Chapter" },
      style,
    },
    {
      id: "3",
      position: { x: 400, y: 100 },
      data: { label: "Chapter" },
      style,
    },
    {
      id: "4",
      position: { x: 150, y: 200 },
      data: { label: "Chapter" },
      style,
    },
    {
      id: "5",
      position: { x: 250, y: 200 },
      data: { label: "Chapter" },
      style,
    },
    {
      id: "6",
      position: { x: 450, y: 200 },
      data: { label: "Chapter" },
      style,
    },
    {
      id: "7",
      position: { x: 550, y: 200 },
      data: { label: "Chapter" },
      style,
    },

    // New row
    { id: "8", position: { x: 0, y: 300 }, data: { label: "Chapter" }, style },
    {
      id: "9",
      position: { x: 100, y: 300 },
      data: { label: "Chapter" },
      style,
    },
    {
      id: "10",
      position: { x: 200, y: 300 },
      data: { label: "Chapter" },
      style,
    },
    {
      id: "11",
      position: { x: 300, y: 300 },
      data: { label: "Chapter" },
      style,
    },
    {
      id: "12",
      position: { x: 400, y: 300 },
      data: { label: "Chapter" },
      style,
    },
    {
      id: "13",
      position: { x: 500, y: 300 },
      data: { label: "Chapter" },
      style,
    },
    {
      id: "14",
      position: { x: 600, y: 300 },
      data: { label: "Chapter" },
      style,
    },
    {
      id: "15",
      position: { x: 700, y: 300 },
      data: { label: "Chapter" },
      style,
    },
  ];

  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e2-4", source: "2", target: "4" },
    { id: "e2-5", source: "2", target: "5" },
    { id: "e3-6", source: "3", target: "6" },
    { id: "e3-7", source: "3", target: "7" },

    // New edges for the new row
    { id: "e4-8", source: "4", target: "8" },
    { id: "e4-9", source: "4", target: "9" },
    { id: "e5-10", source: "5", target: "10" },
    { id: "e5-11", source: "5", target: "11" },
    { id: "e6-12", source: "6", target: "12" },
    { id: "e6-13", source: "6", target: "13" },
    { id: "e7-14", source: "7", target: "14" },
    { id: "e7-15", source: "7", target: "15" },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  return (
    <div className="w-[800] h-[500] font-bold ">
      <h2 className="text-center my-10">Full Story Chain</h2>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // nodesDraggable={false}
        // panOnDrag={false} 
        // zoomOnScroll={false} 
        // zoomOnPinch={false}
      ></ReactFlow>
    </div>
  );
};

export default SectionTree;
