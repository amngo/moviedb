import React from 'react';

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold tracking-wider text-white uppercase">
      {children}
    </h2>
  );
}

export default Heading;
