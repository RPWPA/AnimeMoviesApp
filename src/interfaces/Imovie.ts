export interface IMovie {
    airing: boolean;
    duration: string;
    episodes: number;
    genres: [{
        name: string
    }];
    images: {
        jpg: {
            image_url: string
        },
    }
    rating: string;
    score: number;
    status: string;
    synopsis: string;
    title: string;
    title_english: string;
}