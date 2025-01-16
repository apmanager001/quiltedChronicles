import React from 'react'

const Buttons = () => {
  return (
    <div
      className={`h-24 flex justify-center items-center w-full md:max-w-60 xl:max-w-96 p-4 ${universalDiv}`}
    >
      <div className="flex gap-2">
        <div>
          <button className="btn btn-accent">Add a Chapter</button>
        </div>
        <div>
          <button className="btn btn-accent">View Full Chain</button>
        </div>
      </div>
    </div>
  );
}

export default Buttons