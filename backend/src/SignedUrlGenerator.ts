import { createHash } from 'crypto';
import { parse } from 'querystring';

interface SignOptions {
    secret: string;
    ttl?: number; // in seconds
}

interface ISignedUrlGenerator {
    sign(url: string): string;
    verify(signedUrl: string): boolean;
}

export class SignedUrlGenerator implements ISignedUrlGenerator {
    private secret: string;
    private ttl: number;
    private expiry: number = 0;
    private signature: string = '';

    constructor({ secret, ttl = 50000 }: SignOptions) {
        this.secret = secret;
        this.ttl = ttl;
    }

    private generateSignature(url: string) {
        let signedUrl = url;

        signedUrl += `?X-Expires=${this.expiry}`;
        console.log(this.expiry);

        const signature = createHash('md5')
            .update(signedUrl)
            .update(this.secret)
            .digest('hex');

        return signature;
    }

    sign(url: string) {
        this.expiry = Math.ceil(+new Date() / 1000) + this.ttl;
        this.signature = this.generateSignature(url);
        return `${url}?X-Expires=${this.expiry}&X-Signature=${this.signature} `;
    }

    private isExpired(exp: number) {
        return exp < Math.ceil(+new Date() / 1000);
    }

    private isValidSignature(url: string, signature: string) {
        console.log(this.generateSignature(url), signature);
        console.log(typeof signature);
        return this.signature == signature;
    }

    verify(signedUrl: string) {
        const startIndexOfQueryParams = signedUrl.indexOf('?');
        const url = signedUrl.substring(0, startIndexOfQueryParams);

        const queryParams = parse(
            signedUrl.substring(startIndexOfQueryParams + 1)
        );

        console.log(url, queryParams);

        const exp = queryParams['X-Expires'];
        const signature = queryParams['X-Signature'];

        if (!signature || !this.isValidSignature(url, signature.toString())) {
            console.log('invalid signature');
            return false;
        }

        if (!exp || this.isExpired(Number(exp))) {
            console.log('expired');
            return false;
        }

        return true;
    }
}
