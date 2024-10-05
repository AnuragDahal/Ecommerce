export interface IUser extends Document {
    firstName:String;
    lastName:String;
    email:String;
    password:String;
    refreshToken:String;
    isPasswordCorrect(password:String):Promise<Boolean>;
    generateAccessToken():String;
    generateRefreshToken():String;
}

