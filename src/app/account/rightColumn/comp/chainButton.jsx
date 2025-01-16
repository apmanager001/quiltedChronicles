import React from 'react'
import accountStore from '../../../store/accountStore';

const Buttons = () => {
    const setMiddleColumn = accountStore((state) => state.setMiddleColumn);

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      <button
        className="btn btn-accent btn-sm"
        onClick={() => setMiddleColumn("chapter")}
      >
        Chapter
      </button>
      <button className="btn btn-accent btn-sm" onClick={() => setMiddleColumn("add")}>
        Add a Chapter
      </button>
      <button
        className="btn btn-accent btn-sm"
        onClick={() => setMiddleColumn("chain")}
      >
        View Full Chain
      </button>
    </div>
  );
}

export default Buttons