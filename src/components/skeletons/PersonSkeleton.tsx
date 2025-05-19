import React from 'react';

function PersonSkeleton() {
    return (
        <div className="grid grid-cols-[min-content_1fr] grid-rows-2 gap-4 items-center p-2">
            <div className="w-12 h-16 col-span-1 row-span-2 rounded-xl bg-black/15" />
            <div className="self-end w-32 h-4 col-span-1 row-span-1 rounded-xl bg-black/15" />
            <div className="self-start w-32 h-2 col-span-1 row-span-1 rounded-xl bg-black/15" />
        </div>
    );
}

export default PersonSkeleton;
