import * as assert from 'assert';
import { getLoginCommand, } from './commands';
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
                USE_NEXT: false
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
                USE_NEXT: false
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
                USE_NEXT: false
            };
            const expected = 'login --authType certificate --certificateBase64Encoded ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 --password Pass@w0rd! --appId 36e3a540-6f25-4483-9542-9f5fa00bb633 --tenant 187d6ed4-5c94-40eb-87c7-d311ec5f647a';
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
                USE_NEXT: false
            };
            assert.throws(() => getLoginCommand(options), Error, 'ADMIN_USERNAME is required');
        });

        it('throws error if ADMIN_USERNAME is passed without ADMIN_PASSWORD', () => {
            const options: Options = {
                ADMIN_USERNAME: 'adminUsername',
                ADMIN_PASSWORD: '',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                USE_NEXT: false
            };
            assert.throws(() => getLoginCommand(options), Error, 'ADMIN_PASSWORD is required');
        });

        it('does not throw error when ADMIN_USERNAME and ADMIN_PASSWORD passed', () => {
            const options: Options = {
                ADMIN_USERNAME: 'adminUsername',
                ADMIN_PASSWORD: 'adminPassword',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                USE_NEXT: false
            };
            assert.doesNotThrow(() => getLoginCommand(options), Error);
        });

        it('throws error if CERTIFICATE_ENCODED is not passed', () => {
            const options: Options = {
                ADMIN_USERNAME: '',
                ADMIN_PASSWORD: '',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                USE_NEXT: false
            };
            assert.throws(() => getLoginCommand(options), Error, 'CERTIFICATE_ENCODED is required if ADMIN_USERNAME and ADMIN_PASSWORD are not provided');
        });

        it('does not throw error when CERTIFICATE_ENCODED passed', () => {
            const options: Options = {
                ADMIN_USERNAME: '',
                ADMIN_PASSWORD: '',
                CERTIFICATE_ENCODED: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                USE_NEXT: false
            };
            assert.doesNotThrow(() => getLoginCommand(options), Error);
        });
    });

});