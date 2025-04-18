import * as assert from 'assert';
import { Options, validate } from './validate';

describe('validate', () => {
    const appId = 'c7ae9aae-8056-4fa4-8999-8d49085e2f13';
    const tenantId = '49999c35-5fe2-4f8f-a7b4-3979e4c9096d';

    beforeEach(() => {
        process.env.CLIMICROSOFT365_ENTRAAPPID = '';
        process.env.CLIMICROSOFT365_TENANT = '';
    });

    it('throws error if APP_ID is not passed and env variable CLIMICROSOFT365_ENTRAAPPID is empty', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', APP_ID: '', TENANT: tenantId, CLI_VERSION: '' };
        assert.throws(() => validate(options), Error, 'APP_ID is required or the environment variable CLIMICROSOFT365_ENTRAAPPID must be set with the app ID of the Entra application used for authentication.');
    });

    it('throws error if TENANT is not passed and env variable CLIMICROSOFT365_TENANT is empty', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', APP_ID: appId, TENANT: '', CLI_VERSION: '' };
        assert.throws(() => validate(options), Error, 'TENANT is required or the environment variable CLIMICROSOFT365_TENANT must be set with the ID of the tenant where the Entra application that is used for authentication resides.');
    });

    it('throws error if ADMIN_USERNAME is passed without ADMIN_PASSWORD', () => {
        const options: Options = { ADMIN_USERNAME: 'adminUsername', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', APP_ID: appId, TENANT: tenantId, CLI_VERSION: '' };
        assert.throws(() => validate(options), Error, 'ADMIN_PASSWORD is required if ADMIN_USERNAME is passed.');
    });

    it('throws error if ADMIN_PASSWORD is passed without ADMIN_USERNAME', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: 'adminPassword', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', APP_ID: appId, TENANT: tenantId, CLI_VERSION: '' };
        assert.throws(() => validate(options), Error, 'ADMIN_USERNAME is required if ADMIN_PASSWORD is passed.');
    });

    it('does not throw error when ADMIN_USERNAME and ADMIN_PASSWORD passed', () => {
        const options: Options = { ADMIN_USERNAME: 'adminUsername', ADMIN_PASSWORD: 'adminPassword', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', APP_ID: appId, TENANT: tenantId, CLI_VERSION: '' };
        assert.doesNotThrow(() => validate(options), Error);
    });

    it('does not throw error when CERTIFICATE_ENCODED passed', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: 'EDDFSFEZRZZER2342RER3423RZER234234R', CERTIFICATE_PASSWORD: '', APP_ID: appId, TENANT: tenantId, CLI_VERSION: '' };
        assert.doesNotThrow(() => validate(options), Error);
    });
    
    it('does not throw error when ADMIN_USERNAME, ADMIN_PASSWORD and CERTIFICATE_ENCODED are not passed', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', APP_ID: appId, TENANT: tenantId, CLI_VERSION: '' };
        assert.doesNotThrow(() => validate(options), Error);
    });

    it('does not throw error when APP_ID is not passed and env variable CLIMICROSOFT365_ENTRAAPPID is filled', () => {
        process.env.CLIMICROSOFT365_ENTRAAPPID = appId;
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', APP_ID: '', TENANT: tenantId, CLI_VERSION: '' };
        assert.doesNotThrow(() => validate(options), Error);
    });
    
    it('does not throw error when TENANT is not passed and env variable CLIMICROSOFT365_TENANT is filled', () => {
        process.env.CLIMICROSOFT365_TENANT = tenantId;
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', APP_ID: appId, TENANT: '', CLI_VERSION: '' };
        assert.doesNotThrow(() => validate(options), Error);
    });
    
    it('does not throw error when APP_ID and TENANT are not passed and env variables are filled', () => {
        process.env.CLIMICROSOFT365_ENTRAAPPID = appId;        
        process.env.CLIMICROSOFT365_TENANT = tenantId;
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', APP_ID: '', TENANT: '', CLI_VERSION: '' };
        assert.doesNotThrow(() => validate(options), Error);
    });
});