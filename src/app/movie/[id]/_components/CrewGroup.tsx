import Person from './Person';
import PersonSkeleton from '../../../../components/skeletons/PersonSkeleton';
import Heading from '../../../../components/ui/Heading';

function CrewGroup({
    crew,
    loading,
}: {
    crew: { id: number; name: string; job: string; profile_path: string }[];
    loading: boolean;
}) {
    if (crew.length === 0 && !loading) {
        return (
            <div className="flex flex-col items-start justify-start w-full gap-4">
                <Heading>Cast</Heading>
                <p>No crew information available.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start justify-start w-full gap-4">
            <Heading>Crew</Heading>
            {loading && (
                <div
                    role="status"
                    className="w-full grid grid-cols-3 animate-pulse gap-y-2"
                >
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <PersonSkeleton />
                    <span className="sr-only">Loading...</span>
                </div>
            )}

            {crew.length > 0 && (
                <ul className="w-full grid grid-cols-2 sm:grid-cols-3 gap-y-2">
                    {crew.map((person) => (
                        <Person
                            key={person.id}
                            // id={person.id}
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
