import * as core from '@actions/core';
import { exec } from '@actions/exec';
import { which } from '@actions/io';
import { getLoginCommand } from './commands';
import { constants } from './constants';
import { getOptions } from './utils';
import { Options, validate } from './validate';

async function run(): Promise<void> {

    const options: Options = getOptions([
        constants.ACTION_ADMIN_USERNAME,
        constants.ACTION_ADMIN_PASSWORD,
        constants.ACTION_CERTIFICATE_ENCODED,
        constants.ACTION_CERTIFICATE_PASSWORD,
        constants.ACTION_APP_ID,
        constants.ACTION_TENANT,
        constants.ACTION_USE_NEXT
    ]);

    try {
        validate(options);

        if (options.USE_NEXT) {
            core.info('ℹ️ Installing CLI for Microsoft 365 (next version)...');
            await exec(constants.CLI_NEXT_NPMINSTALL_COMMAND, [], { silent: true });
        }
        else {
            core.info('ℹ️ Installing CLI for Microsoft 365...');
            await exec(constants.CLI_NPMINSTALL_COMMAND, [], { silent: true });
        }
        
        const cliPath = await which(constants.CLI_PREFIX, true);
        core.info(`✅ CLI for Microsoft 365 successfully installed at ${cliPath}`);

        core.info('ℹ️ Attempting to log in...');
        const loginCommand = getLoginCommand(options);
        await exec(`${constants.CLI_PREFIX} ${loginCommand}`, [], { });
        await exec(`${constants.CLI_PREFIX} status`, [], { silent: false });
        core.info('✅ Login successful');
    }
    catch (err: unknown) {
        const error = err as Error;
        core.error(`🚨 ${error.message}`);
        core.setFailed(error);
    }
}

run();
