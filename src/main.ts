import * as core from '@actions/core';
import { exec } from '@actions/exec';
import { which } from '@actions/io';

let o365CLIPath: string;

async function main() {
    try{
        const username: string = core.getInput("ADMIN_USERNAME", { required: true });
        const password: string = core.getInput("ADMIN_PASSWORD", { required: true });
        
        core.info("ℹ️ Installing Office 365 CLI...");

        let o365CLIInstallCommand: string = "npm install -g @pnp/office365-cli";
        const options: any = {};
        options.silent = true;
        if(process.env.RUNNER_OS == "Windows") {
            await exec(o365CLIInstallCommand, [], options);
        } else {
            await exec(`sudo ${o365CLIInstallCommand}`, [], options);
        }
        o365CLIPath = await which("o365", true);
        
        core.info("✅ Completed installing Office 365 CLI.");

        core.info("ℹ️ Logging in to the tenant...");

        await executeO365CLICommand(`login --authType password --userName ${username} --password ${password}`);
        await executeO365CLICommand("status");

        core.info("✅ Login successful.");
        
    } catch (err) {
        core.error("🚨 Login to the tenant failed. Please check the credentials. For more information refer https://aka.ms/create-secrets-for-GitHub-workflows");
        core.setFailed(err);
    } 
}

async function executeO365CLICommand(command: string) {
    try {
        await exec(`"${o365CLIPath}" ${command}`, [],  {}); 
    }
    catch(err) {
        throw new Error(err);
    }
}

main();