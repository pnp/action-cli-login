import * as assert from 'assert';
import { Options, validate } from './validate';

describe('validate', () => {

    it('throws error if ADMIN_USERNAME, ADMIN_PASSWORD and CERTIFICATE_ENCODED not passed', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', IDENTITY: false, APP_ID: '', TENANT: '', CLI_VERSION: '' };
        assert.throws(() => validate(options), Error, 'You must provide either ADMIN_USERNAME and ADMIN_PASSWORD parameters (if authenticating with user name / password), CERTIFICATE_ENCODED (if authenticating with a certificate) parameter or at least IDENTITY (if authentication with managed identity). More information here: https://pnp.github.io/cli-microsoft365/cmd/login/');
    });

    it('throws error if CERTIFICATE_ENCODED not passed', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', IDENTITY: false, APP_ID: '', TENANT: '', CLI_VERSION: '' };
        assert.throws(() => validate(options), Error, 'You must provide either ADMIN_USERNAME and ADMIN_PASSWORD parameters (if authenticating with user name / password), or at least CERTIFICATE_ENCODED (if authenticating with a certificate). More information here: https://pnp.github.io/cli-microsoft365/cmd/login/');
    });

    it('throws error if ADMIN_USERNAME is passed without ADMIN_PASSWORD', () => {
        const options: Options = { ADMIN_USERNAME: 'adminUsername', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', IDENTITY: false, APP_ID: '', TENANT: '', CLI_VERSION: '' };
        assert.throws(() => validate(options), Error, 'ADMIN_PASSWORD is required if ADMIN_USERNAME is passed');
    });

    it('throws error if ADMIN_PASSWORD is passed without ADMIN_USERNAME', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: 'adminPassword', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', IDENTITY: false, APP_ID: '', TENANT: '', CLI_VERSION: '' };
        assert.throws(() => validate(options), Error, 'ADMIN_USERNAME is required if ADMIN_PASSWORD is passed');
    });

    it('throws error if IDENTITY is passed without ADMIN_USERNAME', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', IDENTITY: true, APP_ID: '', TENANT: '36e3a540-6f25-4483-9542-9f5fa00bb633', CLI_VERSION: '' };
        assert.throws(() => validate(options), Error, 'ADMIN_USERNAME is required if IDENTITY is passed');
    });

    it('throws error if IDENTITY is passed without TENANT', () => {
        const options: Options = { ADMIN_USERNAME: '36e3a540-6f25-4483-9542-9f5fa00bb633', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', IDENTITY: true, APP_ID: '', TENANT: '', CLI_VERSION: '' };
        assert.throws(() => validate(options), Error, 'ADMIN_USERNAME is required if IDENTITY is passed');
    });

    it('does not throw error when ADMIN_USERNAME and ADMIN_PASSWORD passed', () => {
        const options: Options = { ADMIN_USERNAME: 'adminUsername', ADMIN_PASSWORD: 'adminPassword', CERTIFICATE_ENCODED: '', CERTIFICATE_PASSWORD: '', IDENTITY: false, APP_ID: '', TENANT: '', CLI_VERSION: '' };
        assert.doesNotThrow(() => validate(options), Error);
    });

    it('does not throw error when CERTIFICATE_ENCODED passed', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '', CERTIFICATE_ENCODED: 'EDDFSFEZRZZER2342RER3423RZER234234R', CERTIFICATE_PASSWORD: '', IDENTITY: false, APP_ID: '', TENANT: '', CLI_VERSION: '' };
        assert.doesNotThrow(() => validate(options), Error);
    });
});