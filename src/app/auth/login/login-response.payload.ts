export interface LoginResponsePayload{
    authenticationToken: String;
    refreshToken: String;
    expireAt: Date;
    username: String;
}