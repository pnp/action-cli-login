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
    if (isNullOrEmpty(options.APP_ID) && isNullOrEmpty(process.env.CLIMICROSOFT365_ENTRAAPPID)) {
        throw new Error('APP_ID is required or the environment variable CLIMICROSOFT365_ENTRAAPPID must be set with the app ID of the Entra application used for authentication.');
    }
    
    if (isNullOrEmpty(options.TENANT) && isNullOrEmpty(process.env.CLIMICROSOFT365_TENANT)) {
        throw new Error('TENANT is required or the environment variable CLIMICROSOFT365_TENANT must be set with the ID of the tenant where the Entra application that is used for authentication resides.');
    }

    if (isNullOrEmpty(options.ADMIN_USERNAME) && !isNullOrEmpty(options.ADMIN_PASSWORD)) {
        throw new Error('ADMIN_USERNAME is required if ADMIN_PASSWORD is passed.');
    }

    if (!isNullOrEmpty(options.ADMIN_USERNAME) && isNullOrEmpty(options.ADMIN_PASSWORD)) {
        throw new Error('ADMIN_PASSWORD is required if ADMIN_USERNAME is passed.');
    }    
};

