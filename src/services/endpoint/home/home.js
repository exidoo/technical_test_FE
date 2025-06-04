import Api from '../../../helpers/Api';
export const ArticleData = {
    getDataApple: () => {
        return Api.get('everything?q=apple&from=2025-06-01&to=2025-06-01&sortBy=popularity&apiKey=7c4a9bd0390943699d5a2943e9274e64');
    },
    getDataTesla: () => {
        return Api.get('everything?q=tesla&from=2025-05-03&sortBy=publishedAt&apiKey=7c4a9bd0390943699d5a2943e9274e64');
    },
    getDataBusiness: () => {
        return Api.get('top-headlines?country=us&category=business&apiKey=7c4a9bd0390943699d5a2943e9274e64');
    },
    getDataTechCrunch: () => {
        return Api.get('top-headlines?sources=techcrunch&apiKey=7c4a9bd0390943699d5a2943e9274e64');
    },
    getDataWallStreet: () => {
        return Api.get('everything?domains=wsj.com&apiKey=7c4a9bd0390943699d5a2943e9274e64');
    },
};
