import Tag from './Tag';

function GenreTags({ genres }: { genres: { id: number; name: string }[] }) {
    return (
        <div className="flex gap-2">
            {genres.map((genre) => (
                <Tag key={genre.id} name={genre.name} />
            ))}
        </div>
    );
}

export default GenreTags;
