# CLI for Microsoft 365 Login
GitHub action to login to a tenant using CLI for Microsoft 365.

![CLI for Microsoft 365](./images/pnp-cli-microsoft365-blue.svg)

This GitHub Action (created using typescript) uses [CLI for Microsoft 365](https://pnp.github.io/cli-microsoft365/), specifically the [login command](https://pnp.github.io/cli-microsoft365/cmd/login), to allow you log in to Microsoft 365.

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#example-workflow---cli-for-microsoft-365-login) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
- `ADMIN_USERNAME` : **Required** Username (email address of the admin)
- `ADMIN_PASSWORD` : **Required** Password of the admin

#### Optional requirement
Since this action requires user name and password which are sensitive pieces of information, it would be ideal to store them securely. We can achieve this in a GitHub repo by using [secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets). So, click on `settings` tab in your repo and add 2 new secrets:
- `ADMIN_USERNAME` - store the admin user name in this (e.g. user@contoso.onmicrosoft.com)
- `ADMIN_PASSWORD` - store the password of that user in this.
These secrets are encrypted and can only be used by GitHub actions. 

### Example workflow - CLI for Microsoft 365 Login
On every `push` build the code and then login to Microsoft 365 before deploying.

```yaml
name: SPFx CICD with Cli for Microsoft 365

on: [push]

jobs:
  build:
    ##
    ## Build code omitted
    ##
        
  deploy:
    needs: build
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x]
    
    steps:
    
    ##
    ## Code to get the package omitted
    ##

    # CLI for Microsoft 365 login action
    - name: Login to tenant
      uses: pnp/action-cli-login@v2.0.0
      with:
        ADMIN_USERNAME:  ${{ secrets.ADMIN_USERNAME }}
        ADMIN_PASSWORD:  ${{ secrets.ADMIN_PASSWORD }}
    
    ##
    ## Code to deploy the package to tenant omitted
    ##
```

#### Self-hosted runners
If self-hosted runners are used for running the workflow, then please make sure that they have `PowerShell` or `bash` installed on them. 

## Release notes

### v2.0.0
- Renames action to 'CLI for Microsoft 365'

### v1.0.0
- Added inital 'Office 365 CLI login' GitHub action solving #2