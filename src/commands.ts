import * as core from '@actions/core';
import { constants } from './constants';
import { isNullOrEmpty } from './utils';
import { Options } from './validate';

export function getLoginCommand(options: Options): string {
    let authCommand: string;

    if (options.ADMIN_USERNAME || options.ADMIN_PASSWORD) {
        if (isNullOrEmpty(options.ADMIN_USERNAME)) { throw new Error('ADMIN_USERNAME is required.'); };
        if (isNullOrEmpty(options.ADMIN_PASSWORD)) { throw new Error('ADMIN_PASSWORD is required.'); };
        
        core.info('ℹ️ Logging in using user credentials...');
        
        authCommand = `login --authType password --userName ${options.ADMIN_USERNAME} --password ${options.ADMIN_PASSWORD}`;
    }
    else if (options.CERTIFICATE_ENCODED) {
        core.info('ℹ️ Logging in using certificate credentials...');
        
        authCommand = `login --authType certificate --certificateBase64Encoded ${options.CERTIFICATE_ENCODED}`;
        
        if (options.CERTIFICATE_PASSWORD) {
            authCommand += ` --password ${options.CERTIFICATE_PASSWORD}`;
        }
    }
    else {
        core.info('ℹ️ Logging in using federated identity...');
        
        authCommand = `login --authType federatedIdentity`;
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
        if (!options.ADMIN_USERNAME && !options.ADMIN_PASSWORD && !options.CERTIFICATE_ENCODED && options.CLI_VERSION !== 'latest' && options.CLI_VERSION !== 'next') {
            const splitVersion = options.CLI_VERSION.split('.');
            const majorVersionNr = parseInt(splitVersion[0]);
            const minorVersionNr = parseInt(splitVersion[1]);

            if (majorVersionNr < 10 || (majorVersionNr === 10 && minorVersionNr < 5)) {
                throw new Error('Federated identity login is only supported in version 10.5.0 and above of the CLI for Microsoft 365.');
            }
        }
        installCommand = `${constants.CLI_NPMINSTALL_COMMAND}@${options.CLI_VERSION}`;
    }
    else {
        installCommand = constants.CLI_NPMINSTALL_COMMAND;
    }

    return installCommand;
}