export interface CaptchaRes {
    repCode: string;
    repMsg: string;
    repData: any;
    success: boolean;
}

export interface LoginData {
    uid: number;
    username: string;
    jwt: string;
    refreshJwt: string;
}