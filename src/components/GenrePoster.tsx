import Image from 'next/image';
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
    <Link href={`/genre/${id}`} className="h-full w-full group">
      <div className="h-full w-full overflow-hidden rounded-md relative">
        <span className="absolute h-full w-full z-10 flex justify-center items-center font-bold text-2xl">
          {name}
        </span>
        <Image
          src={image}
          alt={name}
          width={250}
          height={375}
          quality={100}
          priority
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
