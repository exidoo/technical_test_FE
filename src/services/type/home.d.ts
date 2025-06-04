export interface GetDataArticle {
    status: string;
    totalResults: number;
    articles: Article[];
}
export interface Article {
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
export interface Source {
    id: string | null;
    name: string;
}
