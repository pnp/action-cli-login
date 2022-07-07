import { isNullOrEmpty } from './utils';
export interface Options {
    ADMIN_USERNAME: string;
    ADMIN_PASSWORD: string;
    CERTIFICATE_ENCODED: string;
    CERTIFICATE_PASSWORD: string;
    APP_ID: string;
    TENANT: string;
    USE_NEXT: boolean;
}

export function validate(options: Options): void | Error {
    if (isNullOrEmpty(options.ADMIN_USERNAME) && isNullOrEmpty(options.ADMIN_PASSWORD)
    && isNullOrEmpty(options.CERTIFICATE_ENCODED)) {
        throw new Error('You must provide either ADMIN_USERNAME and ADMIN_PASSWORD parameters (if authenticating with user name / password), or at least CERTIFICATE_ENCODED (if authenticating with a certificate). More information here: https://pnp.github.io/cli-microsoft365/cmd/login/');
    }
    else {
        if (isNullOrEmpty(options.ADMIN_USERNAME) && !isNullOrEmpty(options.ADMIN_PASSWORD)) {
            throw new Error('ADMIN_USERNAME is required if ADMIN_PASSWORD is passed');
        }

        if (!isNullOrEmpty(options.ADMIN_USERNAME) && isNullOrEmpty(options.ADMIN_PASSWORD)) {
            throw new Error('ADMIN_PASSWORD is required if ADMIN_USERNAME is passed');
        }
    }
};

