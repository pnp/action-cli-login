import * as assert from 'assert';
import { getInstallCommand, getLoginCommand, } from './commands';
import { constants } from './constants';
import { Options } from './validate';

describe('commands', () => {

    describe('getLoginCommand', () => {

        it('returns correct command with options (authType password)', () => {
            const options: Options = {
                ADMIN_USERNAME: 'adminUsername',
                ADMIN_PASSWORD: 'adminPassword',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                CLI_VERSION: ''
            };
            const expected = 'login --authType password --userName adminUsername --password adminPassword';
            const actual = getLoginCommand(options);
            assert.equal(actual, expected);
        });

        it('returns correct command with options (authType certificate, without password)', () => {
            const options: Options = {
                ADMIN_USERNAME: '',
                ADMIN_PASSWORD: '',
                CERTIFICATE_ENCODED: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '36e3a540-6f25-4483-9542-9f5fa00bb633',
                TENANT: '187d6ed4-5c94-40eb-87c7-d311ec5f647a',
                CLI_VERSION: ''
            };
            const expected = 'login --authType certificate --certificateBase64Encoded ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 --appId 36e3a540-6f25-4483-9542-9f5fa00bb633 --tenant 187d6ed4-5c94-40eb-87c7-d311ec5f647a';
            const actual = getLoginCommand(options);
            assert.equal(actual, expected);
        });

        it('returns correct command with options (authType certificate, with password)', () => {
            const options: Options = {
                ADMIN_USERNAME: '',
                ADMIN_PASSWORD: '',
                CERTIFICATE_ENCODED: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                CERTIFICATE_PASSWORD: 'Pass@w0rd!',
                APP_ID: '36e3a540-6f25-4483-9542-9f5fa00bb633',
                TENANT: '187d6ed4-5c94-40eb-87c7-d311ec5f647a',
                CLI_VERSION: ''
            };
            const expected = 'login --authType certificate --certificateBase64Encoded ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 --password Pass@w0rd! --appId 36e3a540-6f25-4483-9542-9f5fa00bb633 --tenant 187d6ed4-5c94-40eb-87c7-d311ec5f647a';
            const actual = getLoginCommand(options);
            assert.equal(actual, expected);
        });

        it('returns correct command with options (authType federatedIdentity)', () => {
            const options: Options = {
                ADMIN_USERNAME: '',
                ADMIN_PASSWORD: '',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '36e3a540-6f25-4483-9542-9f5fa00bb633',
                TENANT: '187d6ed4-5c94-40eb-87c7-d311ec5f647a',
                CLI_VERSION: ''
            };
            const expected = 'login --authType federatedIdentity --appId 36e3a540-6f25-4483-9542-9f5fa00bb633 --tenant 187d6ed4-5c94-40eb-87c7-d311ec5f647a';
            const actual = getLoginCommand(options);
            assert.equal(actual, expected);
        });

        it('throws error if ADMIN_PASSWORD is passed without ADMIN_USERNAME', () => {
            const options: Options = {
                ADMIN_USERNAME: '',
                ADMIN_PASSWORD: 'adminPassword',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                CLI_VERSION: ''
            };
            assert.throws(() => getLoginCommand(options), Error, 'ADMIN_USERNAME is required.');
        });

        it('throws error if ADMIN_USERNAME is passed without ADMIN_PASSWORD', () => {
            const options: Options = {
                ADMIN_USERNAME: 'adminUsername',
                ADMIN_PASSWORD: '',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                CLI_VERSION: ''
            };
            assert.throws(() => getLoginCommand(options), Error, 'ADMIN_PASSWORD is required.');
        });

        it('does not throw error when ADMIN_USERNAME and ADMIN_PASSWORD passed', () => {
            const options: Options = {
                ADMIN_USERNAME: 'adminUsername',
                ADMIN_PASSWORD: 'adminPassword',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                CLI_VERSION: ''
            };
            assert.doesNotThrow(() => getLoginCommand(options), Error);
        });

        it('does not throw error when CERTIFICATE_ENCODED passed', () => {
            const options: Options = {
                ADMIN_USERNAME: '',
                ADMIN_PASSWORD: '',
                CERTIFICATE_ENCODED: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                CLI_VERSION: ''
            };
            assert.doesNotThrow(() => getLoginCommand(options), Error);
        });
    });

    describe('getInstallCommand', () => {
        it('returns correct install command (latest version of the CLI)', () => {
            const options: Options = {
                ADMIN_USERNAME: 'adminUsername',
                ADMIN_PASSWORD: 'adminPassword',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                CLI_VERSION: ''
            };
            const expected = constants.CLI_NPMINSTALL_COMMAND;
            const actual = getInstallCommand(options);
            assert.equal(actual, expected);
        });

        it('returns correct install command (specific version of the CLI)', () => {
            const options: Options = {
                ADMIN_USERNAME: 'adminUsername',
                ADMIN_PASSWORD: 'adminPassword',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                CLI_VERSION: '10.5.0'
            };
            const expected = `${constants.CLI_NPMINSTALL_COMMAND}@${options.CLI_VERSION}`;
            const actual = getInstallCommand(options);
            assert.equal(actual, expected);
        });

        
        it('throws error if CLI_VERSION lower than 10.5.0 is selected with federated identity login (minor version difference)', () => {
            const options: Options = {
                ADMIN_USERNAME: '',
                ADMIN_PASSWORD: '',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '36e3a540-6f25-4483-9542-9f5fa00bb633',
                TENANT: '187d6ed4-5c94-40eb-87c7-d311ec5f647a',
                CLI_VERSION: '10.4.0'
            };
            assert.throws(() => getInstallCommand(options), Error, 'Federated identity login is only supported in version 10.5.0 and above of the CLI for Microsoft 365.');
        });

        it('throws error if CLI_VERSION lower than 10.5.0 is selected with federated identity login (major version difference)', () => {
            const options: Options = {
                ADMIN_USERNAME: '',
                ADMIN_PASSWORD: '',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '36e3a540-6f25-4483-9542-9f5fa00bb633',
                TENANT: '187d6ed4-5c94-40eb-87c7-d311ec5f647a',
                CLI_VERSION: '9.0.0'
            };
            assert.throws(() => getInstallCommand(options), Error, 'Federated identity login is only supported in version 10.5.0 and above of the CLI for Microsoft 365.');
        });
    });
});