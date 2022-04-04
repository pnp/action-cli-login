import * as core from '@actions/core';
import { Options } from './validate';

export function isNullOrEmpty(string: string | undefined | null): boolean {
    return !string;
}

export function getOptions(optionsList: string[]): Options {
    if (optionsList.length === 0) { throw new Error('Option names are required'); };

    const options = Object.create(null);
    optionsList.forEach(element => {
        options[element] = core.getInput(element, { trimWhitespace: true });
    });
    return options;
};
