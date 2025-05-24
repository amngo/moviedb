import Tag from './Tag';

function GenreTags({ genres }: { genres: { id: number; name: string }[] }) {
    return (
        <div className="flex flex-wrap justify-center gap-1 lg:gap-2 sm:justify-start">
            {genres.map((genre) => (
                <Tag key={genre.id} name={genre.name} />
            ))}
        </div>
    );
}

export default GenreTags;
