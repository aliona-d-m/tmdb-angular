export interface MovieI {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    belongs_to_collection: null,
    budget: number,
    genres: GenreI[],
    homepage: string,
    imdb_id: string,
    origin_country: string[]
    production_companies: [],
    production_countries: [],
    revenue: number,
    runtime: number,
    spoken_languages: [],
    status: string, // enum
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
}

export interface MoviesI {
    page: number,
    results: MovieI[],
    total_pages: number,
    total_results: number,
}

export interface GenreI {
    id: number,
    name: string
}

export interface MovieListState {
    movies: MovieI[];
    page: number;
    totalPages: number;
    loading: boolean;
    query?: string;
}
