import React from 'react'
import Tree from '../homeComp/tree/tree'

const Section2 = () => {
    const treeData = {
      name: "First Story Chapter",
      children: [
        {
          name: "Chapter 1",
          children: [{ name: "Chapter 1.1" }, { name: "Chapter 1.2" }],
        },
        {
          name: "Chapter 2",
          children: [{ name: "Chapter 2.1" }, { name: "Chapter 2.2" }],
        },
      ],
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <Tree data={treeData} />
    </div>
  );
}

export default Section2