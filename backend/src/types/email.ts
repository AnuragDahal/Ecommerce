export interface IEmail {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}

export interface IEmailTemplate {
    userName: string;
    otp?: string | number;
}
