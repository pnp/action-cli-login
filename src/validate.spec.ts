import * as assert from 'assert';
import { Options, validate } from './validate';

describe('validate', () => {

    it('throws error if ADMIN_USERNAME and ADMIN_PASSWORD not passed', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: '' };
        assert.throws(() => validate(options), Error, 'ADMIN_USERNAME and ADMIN_PASSWORD are required');
    });

    it('throws error if ADMIN_USERNAME not passed', () => {
        const options: Options = { ADMIN_USERNAME: '', ADMIN_PASSWORD: 'adminPassword' };
        assert.throws(() => validate(options), Error, 'ADMIN_USERNAME is required');
    });

    it('throws error if ADMIN_PASSWORD not passed', () => {
        const options: Options = { ADMIN_USERNAME: 'adminUsername', ADMIN_PASSWORD: '' };
        assert.throws(() => validate(options), Error, 'ADMIN_PASSWORD is required');
    });

    it('does not throw error when ADMIN_USERNAME and ADMIN_PASSWORD passed', () => {
        const options: Options = { ADMIN_USERNAME: 'adminUsername', ADMIN_PASSWORD: 'adminPassword' };
        assert.doesNotThrow(() => validate(options), Error);
    });

});