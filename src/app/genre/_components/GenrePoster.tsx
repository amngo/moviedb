import Link from 'next/link';

function GenrePoster({
    id,
    name,
    image,
    color,
}: {
    id: string;
    name: string;
    image: string;
    color: string;
}) {
    return (
        <Link href={`/genre/${id}`} className="w-full h-full group">
            <div className="relative w-full h-full overflow-hidden rounded-md">
                <span className="absolute z-10 flex items-center justify-center w-full h-full text-2xl font-bold">
                    {name}
                </span>
                <img
                    src={image}
                    alt={name}
                    width={250}
                    height={375}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out grayscale"
                />

                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundColor: `rgba(${color}, 0.75)`,
                        filter: 'brightness(0.4)',
                    }}
                />
            </div>
        </Link>
    );
}

export default GenrePoster;
