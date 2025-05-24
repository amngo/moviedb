import { formatDate, formatNumber } from '@/lib/utils';
import Box from './Box';

function MovieInfo({
    certification,
    release_date,
    runtime,
    budget,
    revenue,
}: {
    certification?: string;
    release_date?: string;
    runtime?: number;
    budget?: number;
    revenue?: number;
}) {
    return (
        <div className="flex flex-wrap justify-center gap-4 lg:gap-2 lg:justify-start">
            <Box title="Rating" text={certification ? certification : 'N/A'} />
            <Box
                title="Release Date"
                text={release_date ? formatDate(release_date) : 'TBA'}
            />
            <Box
                title="Runtime"
                text={runtime ? `${runtime} min` : 'unknown'}
            />
            <Box title="Budget" text={budget ? formatNumber(budget) : 'N/A'} />
            <Box
                title="Revenue"
                text={revenue ? formatNumber(revenue) : 'N/A'}
            />
        </div>
    );
}

export default MovieInfo;
