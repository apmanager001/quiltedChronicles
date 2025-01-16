import React from 'react'
import accountStore from '../../../store/accountStore';

const Buttons = () => {
    const setMiddleColumn = accountStore((state) => state.setMiddleColumn);

  return (
    <div className="flex gap-2">
      <button
        className="btn btn-accent"
        onClick={() => setMiddleColumn("chapter")}
      >
        Chapter
      </button>
      <button className="btn btn-accent" onClick={() => setMiddleColumn("add")}>
        Add a Chapter
      </button>
      <button
        className="btn btn-accent"
        onClick={() => setMiddleColumn("chain")}
      >
        View Full Chain
      </button>
    </div>
  );
}

export default Buttons