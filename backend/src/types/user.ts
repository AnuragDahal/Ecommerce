export interface IUser extends Document {
    firstName: String;
    lastName: String;
    email: String;
    userName: String;
    password: String;
    refreshToken: String;
    isPasswordCorrect(candidatePassword: String): Promise<Boolean>;
    generateAccessToken(): String;
    generateRefreshToken(): String;
}
export interface IResponse {
    success?: Boolean;
    message: String;
    data?: any;
}
