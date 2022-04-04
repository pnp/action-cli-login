import { isNullOrEmpty } from './utils';
import { Options } from './validate';

export function getLoginCommand(options: Options): string {
    if (isNullOrEmpty(options.ADMIN_USERNAME)) { throw new Error('ADMIN_USERNAME is required'); };
    if (isNullOrEmpty(options.ADMIN_PASSWORD)) { throw new Error('ADMIN_PASSWORD is required'); };

    return `login --authType password --userName ${options.ADMIN_USERNAME} --password ${options.ADMIN_PASSWORD}`;
}