import React from 'react';
import SectionTree from '../comps/homeComp/sectionTree'
import Section1 from '../comps/homeComp/section1'
import Section2 from '../comps/homeComp/section2'

export default function Home() {
  return (
    <div className='flex flex-col justify-center'>
      <Section1 />
      {/* <Section2 /> */}
      {/* <SectionTree /> */}
    </div>
  );
}