import { constants } from './constants';
import { isNullOrEmpty } from './utils';
import { Options } from './validate';

export function getLoginCommand(options: Options): string {
    let authCommand: string;

    if (options.ADMIN_USERNAME || options.ADMIN_PASSWORD) {
        if (isNullOrEmpty(options.ADMIN_USERNAME)) { throw new Error('ADMIN_USERNAME is required'); };
        if (isNullOrEmpty(options.ADMIN_PASSWORD)) { throw new Error('ADMIN_PASSWORD is required'); };
        
        authCommand = `login --authType password --userName ${options.ADMIN_USERNAME} --password ${options.ADMIN_PASSWORD}`;
    }
    else {
        if (isNullOrEmpty(options.CERTIFICATE_ENCODED)) { throw new Error('CERTIFICATE_ENCODED is required if ADMIN_USERNAME and ADMIN_PASSWORD are not provided'); };
        
        authCommand = `login --authType certificate --certificateBase64Encoded ${options.CERTIFICATE_ENCODED}`;
        
        if (options.CERTIFICATE_PASSWORD) {
            authCommand += ` --password ${options.CERTIFICATE_PASSWORD}`;
        }
    }

    if (options.APP_ID) {
        authCommand += ` --appId ${options.APP_ID}`;
    }

    if (options.TENANT) {
        authCommand += ` --tenant ${options.TENANT}`;
    }

    return authCommand;
}

export function getInstallCommand(options: Options): string {
    let installCommand: string;

    if (options.CLI_VERSION) {        
        installCommand = `${constants.CLI_NPMINSTALL_COMMAND}@${options.CLI_VERSION}`;
    }
    else {
        installCommand = constants.CLI_NPMINSTALL_COMMAND;
    }

    return installCommand;
}