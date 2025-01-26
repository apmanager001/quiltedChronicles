import React from 'react'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import accountStore from '../../../store/accountStore';

const Buttons = () => {
  const { id } = useParams();
  const setMiddleColumn = accountStore((state) => state.setMiddleColumn);

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      <Link
        href={`/chapter/${id}`}
        className="btn btn-primary btn-sm"
        onClick={() => setMiddleColumn("chapter")}
      >
        Chapter
      </Link>
      <Link
        href={`/chapter/${id}`}
        className="btn btn-primary btn-sm"
        onClick={() => setMiddleColumn("add")}
      >
        Add a Chapter
      </Link>
      <Link href={`/chain/${id}`} className="btn btn-primary btn-sm">
        View Full Chain
      </Link>
    </div>
  );
}

export default Buttons