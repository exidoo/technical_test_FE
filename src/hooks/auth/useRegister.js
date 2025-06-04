// import useMutation dari '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
//import service API
import Api from '@/helpers/Api';
export const useRegister = () => {
    return useMutation({
        // mutation untuk register
        mutationFn: async (data) => {
            //menggunakan service API untuk register
            const response = await Api.post('/register', data);
            //mengembalikan response data
            return response.data;
        },
    });
};
