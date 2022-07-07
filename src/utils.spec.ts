import * as assert from 'assert';
import { getOptions, isNullOrEmpty } from './utils';
import { Options } from './validate';

describe('utils', () => {

    describe('isNullOrEmpty', () => {

        it('returns true when empty string is passed', () => {
            const expected = true;
            const actual = isNullOrEmpty('');
            assert.equal(actual, expected);
        });

        it('returns true when undefined passed', () => {
            const expected = true;
            const actual = isNullOrEmpty(undefined);
            assert.equal(actual, expected);
        });

        it('returns true when null passed', () => {
            const expected = true;
            const actual = isNullOrEmpty(null);
            assert.equal(actual, expected);
        });

        it('returns false when string is passed', () => {
            const expected = false;
            const actual = isNullOrEmpty('string');
            assert.equal(actual, expected);
        });

    });

    describe('getOptions', () => {

        it('throws error if list of options are not passed', () => {
            const optionsList: string[] = [];
            assert.throws(() => getOptions(optionsList), Error, 'Option names are required');
        });

        it('returns correct object', () => {
            const optionsList: string[] = ['ADMIN_USERNAME', 'ADMIN_PASSWORD', 'CERTIFICATE_ENCODED', 'CERTIFICATE_PASSWORD', 'APP_ID', 'TENANT', 'CLI_VERSION'];
            const actual: Options = getOptions(optionsList);
            const expected: Options = {
                ADMIN_USERNAME: '',
                ADMIN_PASSWORD: '',
                CERTIFICATE_ENCODED: '',
                CERTIFICATE_PASSWORD: '',
                APP_ID: '',
                TENANT: '',
                CLI_VERSION: ''

            }
            assert.deepEqual(actual, expected);
        });

    });

});