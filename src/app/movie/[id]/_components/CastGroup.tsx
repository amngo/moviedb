import { useEffect, useState } from 'react';
import Person from './Person';
import PersonSkeleton from '../../../../components/skeletons/PersonSkeleton';
import Heading from '../../../../components/ui/Heading';

function CastGroup({
    cast,
    loading,
}: {
    cast: {
        id: number;
        name: string;
        character: string;
        profile_path: string;
    }[];
    loading: boolean;
}) {
    const [currentCast, setCurrentCast] = useState(cast);
    const [showAll, setShowAll] = useState(false);

    const handleClick = () => {
        setShowAll((prev) => !prev);
    };

    useEffect(() => {
        if (showAll) {
            setCurrentCast(cast);
        } else {
            setCurrentCast(cast.slice(0, 12));
        }
    }, [showAll, cast]);

    if (cast.length === 0 && !loading) {
        return (
            <div className="flex flex-col items-start justify-start w-full gap-4">
                <Heading>Cast</Heading>
                <p>No cast information available.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start justify-start w-full gap-4">
            <Heading>Cast</Heading>

            {loading && (
                <div
                    role="status"
                    className="grid w-full grid-cols-2 sm:grid-cols-3 animate-pulse gap-y-2"
                >
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <span className="sr-only">Loading...</span>
                </div>
            )}

            {cast.length > 0 && (
                <ul className="grid w-full grid-cols-2 sm:grid-cols-3 gap-y-2">
                    {currentCast.map((person) => (
                        <Person
                            key={person.id}
                            // id={person.id}
                            name={person.name}
                            character={person.character}
                            profile_path={person.profile_path}
                        />
                    ))}
                </ul>
            )}

            {currentCast.length > 12 && (
                <button
                    className="flex items-center self-center gap-2 px-4 py-2 transition-all duration-500 ease-out rounded-lg bg-black/15 hover:bg-black/30"
                    onClick={handleClick}
                >
                    {showAll ? <span>See Less</span> : <span>See All</span>}
                </button>
            )}
        </div>
    );
}

export default CastGroup;
