import { formatDate, formatNumber } from '@/lib/utils';
import React from 'react';
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
        <div className="flex gap-2">
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
