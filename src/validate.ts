import { isNullOrEmpty } from './utils';
export interface Options {
    ADMIN_USERNAME: string;
    ADMIN_PASSWORD: string;
}

export function validate(options: Options): void | Error {
    if (isNullOrEmpty(options.ADMIN_USERNAME) && isNullOrEmpty(options.ADMIN_PASSWORD)) {
        throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD are required');
    }
    if (isNullOrEmpty(options.ADMIN_USERNAME)) {
        throw new Error('ADMIN_USERNAME is required');
    }
    if (isNullOrEmpty(options.ADMIN_PASSWORD)) {
        throw new Error('ADMIN_PASSWORD is required');
    }
};

