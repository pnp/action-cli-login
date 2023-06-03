import { isNullOrEmpty } from './utils';
export interface Options {
    ADMIN_USERNAME: string;
    ADMIN_PASSWORD: string;
    CERTIFICATE_ENCODED: string;
    CERTIFICATE_PASSWORD: string;
    IDENTITY: boolean;
    APP_ID: string;
    TENANT: string;
    CLI_VERSION: string;
}

export function validate(options: Options): void | Error {
    if (isNullOrEmpty(options.ADMIN_USERNAME) && isNullOrEmpty(options.ADMIN_PASSWORD)
    && isNullOrEmpty(options.CERTIFICATE_ENCODED)
    && !options.IDENTITY) {
        throw new Error('You must provide either ADMIN_USERNAME and ADMIN_PASSWORD parameters (if authenticating with user name / password), CERTIFICATE_ENCODED (if authenticating with a certificate) parameter or at least IDENTITY (if authentication with managed identity). More information here: https://pnp.github.io/cli-microsoft365/cmd/login/');
    }
    else if (options.IDENTITY) {
        if (isNullOrEmpty(options.ADMIN_USERNAME)) {
            throw new Error('ADMIN_USERNAME is required if IDENTITY is passed');
        }

        if (isNullOrEmpty(options.TENANT)) {
            throw new Error('TENANT is required if IDENTITY is passed');
        }
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

