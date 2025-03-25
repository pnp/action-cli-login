import { isNullOrEmpty } from './utils';
export interface Options {
    ADMIN_USERNAME: string;
    ADMIN_PASSWORD: string;
    CERTIFICATE_ENCODED: string;
    CERTIFICATE_PASSWORD: string;
    APP_ID: string;
    TENANT: string;
    CLI_VERSION: string;
}

export function validate(options: Options): void | Error {    
    if (isNullOrEmpty(options.ADMIN_USERNAME) && !isNullOrEmpty(options.ADMIN_PASSWORD)) {
        throw new Error('ADMIN_USERNAME is required if ADMIN_PASSWORD is passed');
    }

    if (!isNullOrEmpty(options.ADMIN_USERNAME) && isNullOrEmpty(options.ADMIN_PASSWORD)) {
        throw new Error('ADMIN_PASSWORD is required if ADMIN_USERNAME is passed');
    }    
};

