interface LoginRequest {
    username: string;
    password: string;
}
export declare const useLogin: () => import("@tanstack/react-query").UseMutationResult<any, Error, LoginRequest, unknown>;
export {};
