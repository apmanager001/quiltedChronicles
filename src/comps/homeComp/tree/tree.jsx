import React from "react";
import TreeNode from "./treeNode";

const Tree = ({ data }) => {
  return (
    <div className="tree-container flex flex-col items-center">
      <TreeNode node={data} />
    </div>
  );
};

export default Tree;
