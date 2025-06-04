import type { GetDataArticle } from '@/services/type/home';
export declare const ArticleData: {
    getDataApple: () => Promise<import("axios").AxiosResponse<GetDataArticle, any>>;
    getDataTesla: () => Promise<import("axios").AxiosResponse<GetDataArticle, any>>;
    getDataBusiness: () => Promise<import("axios").AxiosResponse<GetDataArticle, any>>;
    getDataTechCrunch: () => Promise<import("axios").AxiosResponse<GetDataArticle, any>>;
    getDataWallStreet: () => Promise<import("axios").AxiosResponse<GetDataArticle, any>>;
};
