import Link from 'next/link';

function PaginationItem({
  page,
  current,
  url,
}: {
  page: number;
  current?: boolean;
  url: string;
}) {
  return (
    <Link
      href={!current ? url : '#'}
      aria-disabled={current}
      aria-current={current ? 'page' : undefined}
      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:bg-white hover:text-black focus:z-20 focus:outline-offset-0 ${
        current ? 'font-bold text-black bg-white' : ''
      }`}
    >
      {page}
    </Link>
  );
}

export default PaginationItem;
