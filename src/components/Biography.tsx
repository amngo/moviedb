import React from 'react';
import Heading from './ui/Heading';

function Biography({ bio }: { bio: string }) {
    return (
        <div className="flex flex-col items-start justify-start gap-4">
            <Heading>Biography</Heading>
            <p>{bio}</p>
        </div>
    );
}

export default Biography;
