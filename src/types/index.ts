import { Cast, Crew, MovieDetails, Recommendation } from "tmdb-ts";

export type ExtendedMovieDetails = MovieDetails & {
  certification?: string;
  cast?: Cast[];
  crew?: Crew[];
  recommendations?: Recommendation[];
  trailer?: { key: string };
  rgb: string;
};
