import * as assert from 'assert';
import { getLoginCommand, } from './commands';
import { Options } from './validate';

describe('commands', () => {

    describe('getLoginCommand', () => {

        it('returns correct command with options', () => {
            const options: Options = {
                ADMIN_USERNAME: 'adminUsername',
                ADMIN_PASSWORD: 'adminPassword'
            };
            const expected = 'login --authType password --userName adminUsername --password adminPassword';
            const actual = getLoginCommand(options);
            assert.equal(actual, expected);
        });

        it('throws error if ADMIN_USERNAME not passed', () => {
            const options: Options = {
                ADMIN_USERNAME: '',
                ADMIN_PASSWORD: 'adminPassword'
            };
            assert.throws(() => getLoginCommand(options), Error, 'ADMIN_USERNAME is required');
        });

        it('throws error if ADMIN_PASSWORD not passed', () => {
            const options: Options = {
                ADMIN_USERNAME: 'adminUsername',
                ADMIN_PASSWORD: ''
            };
            assert.throws(() => getLoginCommand(options), Error, 'ADMIN_PASSWORD is required');
        });

        it('does not throw error when ADMIN_USERNAME and ADMIN_PASSWORD passed', () => {
            const options: Options = {
                ADMIN_USERNAME: 'adminUsername',
                ADMIN_PASSWORD: 'adminPassword'
            };
            assert.doesNotThrow(() => getLoginCommand(options), Error);
        });

    });

});