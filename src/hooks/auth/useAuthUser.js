//import Js Cookie
import Cookies from 'js-cookie';
export const useAuthUser = () => {
    // Mengambil data user dari cookie
    const user = Cookies.get('user');
    // Jika ada data user, parse JSON dan kembalikan
    // Jika tidak ada, kembalikan null
    return user ? JSON.parse(user) : null;
};
