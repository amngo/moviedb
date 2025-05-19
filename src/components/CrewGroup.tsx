import React from 'react';
import Person from './Person';
import PersonSkeleton from './skeletons/PersonSkeleton';
import Heading from './ui/Heading';

function CrewGroup({
    crew,
    loading,
}: {
    crew: { id: number; name: string; job: string; profile_path: string }[];
    loading: boolean;
}) {
    return (
        <div className="flex flex-col items-start justify-start w-full gap-4">
            <Heading>Crew</Heading>
            {loading && (
                <div
                    role="status"
                    className="grid w-full grid-cols-3 animate-pulse gap-y-2"
                >
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <span className="sr-only">Loading...</span>
                </div>
            )}

            {crew.length > 0 && (
                <ul className="grid w-full grid-cols-3 gap-y-2">
                    {crew.map((person) => (
                        <Person
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            character={person.job}
                            profile_path={person.profile_path}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CrewGroup;
