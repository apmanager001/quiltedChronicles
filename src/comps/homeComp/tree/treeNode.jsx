import React from "react";

const TreeNode = ({ node }) => {
  return (
    <div className="relative flex flex-col items-center my-4">
      
      {/* Node Content */}
      <div className="bg-gray-100 p-2 rounded shadow-md">{node.name}</div>
      {node.children && (
        <div className="flex mt-4 space-x-4">
   
          {node.children.map((childNode, index) => (
            <div className="relative flex flex-col items-center" key={index}>
            
              {/* Line from parent to children */}
              {index === 0 && (
                <div className="absolute top-0 left-1/2 -ml-px w-px h-4 bg-gray-400"></div>
              )}{" "}
              {/* Line connecting siblings */}{" "}
              {index > 0 && (
                <div className="absolute top-0 left-0 w-full h-4 border-t-2 border-gray-400"></div>
              )}{" "}
              {/* Child Node */} <TreeNode node={childNode} />{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default TreeNode;
