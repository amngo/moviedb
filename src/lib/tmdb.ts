import { Movie, TMDB } from 'tmdb-ts';

export const tmdb = new TMDB(
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmU3NWIxNmVhNzhjZGY4ZWI5ZDU5NDM0YTJlMzYyNiIsIm5iZiI6MTU3OTc3MjMxNy4wMiwic3ViIjoiNWUyOTY5OWQxNjg1ZGEwMDEzZTJlNzJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.WXJTUbxCSx3NZuOuxVkoYx-laF1LkKwYqeiIErqVX2U'
);

export type MovieWithRgb = Movie & { rgb: string };

export async function getNowPlayingMovies() {
    const response = await tmdb.movies.nowPlaying();
    return response.results;
}

export async function getUpcomingMovies() {
    const response = await tmdb.discover.movie({
        'primary_release_date.gte': new Date().toISOString().split('T')[0],
    });
    return response.results;
}

export async function getPopularMovies() {
    const response = await tmdb.movies.popular();
    return response.results;
}

export async function getCertification(movieId: number) {
    const response = await tmdb.movies.releaseDates(movieId);
    const usCertification = response.results.find(
        (certification: {
            iso_3166_1: string;
            release_dates: { certification: string }[];
        }) => certification.iso_3166_1 === 'US'
    );
    return usCertification?.release_dates[0].certification ?? null;
}

export async function getCastImages(movieId: number) {
    const response = await tmdb.movies.credits(movieId);
    const cast = response.cast;
    const promises = cast.map(async (castMember: { id: number }, i) => {
        const castMemberResponse = await tmdb.people.details(castMember.id);
        cast[i].profile_path = castMemberResponse.profile_path;
    });

    await Promise.all(promises);
    return cast;
}

export async function getDirectors(movieId: number) {
    const response = await tmdb.movies.credits(movieId);
    const crew = response.crew.filter(
        (member: { job: string }) =>
            member.job === 'Director' ||
            member.job === 'Writer' ||
            member.job === 'Screenplay' ||
            member.job === 'Story' ||
            member.job === 'Characters'
    );

    // Concatenate job titles for duplicate crew members
    const crewMap = new Map();
    for (const member of crew) {
        const existingMember = crewMap.get(member.id);
        if (existingMember) {
            existingMember.job += `, ${member.job}`;
        } else {
            crewMap.set(member.id, member);
        }
    }
    return Array.from(crewMap.values());
}

export async function getRecommendations(movieId: number) {
    const response = await tmdb.movies.recommendations(movieId);
    return response.results;
}

export async function getTrailer(movieId: number) {
    const response = await tmdb.movies.videos(movieId);
    return (
        response.results.find(
            (video: { type: string }) => video.type === 'Trailer'
        ) ?? null
    );
}

export async function getMovieImages(movieId: number) {
    const response = await tmdb.movies.images(movieId);
    return response.backdrops;
}

export async function getMovieCredits(personId: number) {
    const response = await tmdb.people.movieCredits(personId);
    return response.cast;
}

export async function getMovieGenres() {
    const response = await tmdb.genres.movies();
    return response.genres;
}

export async function getMoviesFromGenre(genreId: string, page: number) {
    const response = await tmdb.discover.movie({
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page,
    });
    return response;
}

export async function searchMovies(query: string, page: number) {
    const response = await tmdb.search.movies({
        query,
        page,
    });

    return response;
}

export async function getMutipleMovies(movieIds: number[]) {
    const promises = movieIds.map(async (id) => {
        const response = await tmdb.movies.details(id);
        return response;
    });

    const movies = await Promise.all(promises);
    return movies;
}
