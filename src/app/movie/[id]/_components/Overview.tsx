import React from 'react';
import Heading from '@/components/ui/Heading';

function Overview({ overview }: { overview: string }) {
    return (
        <div className="flex flex-col items-start justify-start gap-4">
            <Heading>Overview</Heading>
            <p>{overview}</p>
        </div>
    );
}

export default Overview;
