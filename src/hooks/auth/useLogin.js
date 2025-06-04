// import useMutation dari '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
//import service API
import Api from '@/helpers/Api';
export const useLogin = () => {
    return useMutation({
        // mutation untuk login
        mutationFn: async (data) => {
            //menggunakan service API untuk login
            const response = await Api.post('/login', data);
            //mengembalikan response data
            return response.data;
        },
    });
};
