export interface CaptchaRes {
    repCode: string;
    repMsg: string;
    repData: any;
    success: boolean;
}

export interface TempPoints {
    x: number;
    y: number;
}

export interface CaptchaData {
    captchaType: string;
    clientUid: string;
    originalImageBase64: string;
    pointJson: string;
    pointList: [];
    result: boolean;
    secretKey: string;
    token: string;
}