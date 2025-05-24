import Image from 'next/image';

function Person({
    // id,
    name,
    character,
    profile_path,
}: {
    // id: number;
    name: string;
    character: string;
    profile_path?: string;
}) {
    return (
        <li className="grid grid-cols-[48px_1fr] items-center gap-2 sm:gap-4 p-2 transition-all duration-500 ease-out rounded-lg group">
            {/* <Link
                href={`/person/${id}`}
                className="grid grid-cols-[48px_1fr] items-center gap-2 sm:gap-4 p-2 transition-all duration-500 ease-out rounded-lg group bg-black/0 hover:bg-black/15"
            > */}
            <div className="w-12 h-16 overflow-hidden rounded-xl">
                <Image
                    src={
                        profile_path
                            ? `https://image.tmdb.org/t/p/w500${profile_path}`
                            : '/actor_placeholder.png'
                    }
                    alt={name}
                    width={100}
                    height={200}
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
                    priority
                />
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-bold truncate">{name}</p>
                <p className="text-xs truncate">{character}</p>
            </div>
            {/* </Link> */}
        </li>
    );
}

export default Person;
