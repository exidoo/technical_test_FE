interface RegisterRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}
export declare const useRegister: () => import("@tanstack/react-query").UseMutationResult<any, Error, RegisterRequest, unknown>;
export {};
