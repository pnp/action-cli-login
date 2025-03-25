# CLI for Microsoft 365 Login

GitHub action to log in to a tenant using the CLI for Microsoft 365.

![CLI for Microsoft 365](./images/pnp-cli-microsoft365-blue.svg)

This GitHub Action (created using typescript) uses [CLI for Microsoft 365](https://pnp.github.io/cli-microsoft365/), specifically the [login command](https://pnp.github.io/cli-microsoft365/cmd/login), to allow you to log in to Microsoft 365.

## Usage
### Pre-requisites

Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#example-workflow---cli-for-microsoft-365-login) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs

- `ADMIN_USERNAME` : Username (upn) of the admin
- `ADMIN_PASSWORD` : Password of the admin
- `CERTIFICATE_ENCODED` : Base64-encoded string with certificate private key
- `CERTIFICATE_PASSWORD` : Password for the certificate
- `APP_ID` : App ID of the Entra application to use for authentication. If not specified, use the app specified in the 'CLIMICROSOFT365_ENTRAAPPID' environment variable.
- `TENANT` : ID of the tenant from which accounts should be able to authenticate. Use `common` or `organization` if the app is multitenant. If not specified, use the tenant specified in the `CLIMICROSOFT365_TENANT` environment variable. If the environment variable is not defined, it will use `common` as the tenant identifier
- `CLI_VERSION` : Accepts `latest`, `next` or a specific version tag. Otherwise, installs the `latest` version when omitted

All inputs are optional. But depending of the authentication type chosen, following pair of inputs will be necessary:

- `authType` is `federatedIdentity`: only `APP_ID` and `TENANT` are necessary. (If not filled in, it will use the values from the environment variables `CLIMICROSOFT365_ENTRAAPPID` and `CLIMICROSOFT365_TENANT` respectively.)
- `authType` is `password`: `ADMIN_USERNAME` and `ADMIN_PASSWORD` are required
- `authType` is `certificate`: at least `CERTIFICATE_ENCODED` and `APP_ID` are required
  - Depending on the certificate provided, if encoded with password, `CERTIFICATE_PASSWORD` will be required

#### Optional requirement

Since this action requires sensitive information such as user name, password and encoded certificate for example, it would be ideal to store them securely. We can achieve this in a GitHub repo by using [secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets). So, click on `settings` tab in your repo and add:

- 2 new secrets for the Entra ID identity:
  - `APP_ID` - store App ID of the Entra application to use for authentication
  - `TENANT` - store the ID of the tenant where the Entra application is located

- 2 new secrets if `authType` is `password`:
  - `ADMIN_USERNAME` - store the admin user name in this (e.g. user@contoso.onmicrosoft.com)
  - `ADMIN_PASSWORD` - store the password of that user in this.

- 2 new secrets if `authType` is `certificate`:
  - `CERTIFICATE_ENCODED` - store the Base64-encoded string of the certificate stored in the Entra application
  - `CERTIFICATE_PASSWORD` - store the certificate password

These secrets are encrypted and can only be used by GitHub actions.

### Example workflow - CLI for Microsoft 365 Login (federated identity authentication)

On every `push` build the code and then log in to Microsoft 365 before deploying, using federated identity authentication.

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
        node-version: [22.x]

    steps:

    ##
    ## Code to get the package omitted
    ##

    # CLI for Microsoft 365 login action
    - name: Login to tenant
      uses: pnp/action-cli-login@v3
      with:
        TENANT: ${{ secrets.TENANT }}
        APP_ID: ${{ secrets.APP_ID }}

    ##
    ## Code to deploy the package to tenant omitted
    ##
```

### Example workflow - CLI for Microsoft 365 Login (user name/password authentication)

On every `push` build the code and then log in to Microsoft 365 before deploying, using user login/password authentication.

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
        node-version: [22.x]

    steps:

    ##
    ## Code to get the package omitted
    ##

    # CLI for Microsoft 365 login action
    - name: Login to tenant
      uses: pnp/action-cli-login@v3
      with:
        TENANT: ${{ secrets.TENANT }}
        APP_ID: ${{ secrets.APP_ID }}
        ADMIN_USERNAME:  ${{ secrets.ADMIN_USERNAME }}
        ADMIN_PASSWORD:  ${{ secrets.ADMIN_PASSWORD }}

    ##
    ## Code to deploy the package to tenant omitted
    ##
```

### Example workflow - CLI for Microsoft 365 Login (certificate authentication)

On every `push` build the code and then log in to Microsoft 365 before deploying, using certificate authentication.

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
        node-version: [22.x]

    steps:

    ##
    ## Code to get the package omitted
    ##

    # CLI for Microsoft 365 login action
    - name: Login to tenant
      uses: pnp/action-cli-login@v3
      with:
        TENANT: ${{ secrets.TENANT }}
        APP_ID: ${{ secrets.APP_ID }}
        CERTIFICATE_ENCODED: ${{ secrets.CERTIFICATE_ENCODED }}
        CERTIFICATE_PASSWORD: ${{ secrets.CERTIFICATE_PASSWORD }}

    ##
    ## Code to deploy the package to tenant omitted
    ##
```

### Example workflow - CLI for Microsoft 365 Login (beta version of the CLI)

On every `push` build the code and then log in to Microsoft 365 before deploying, using beta version of the CLI.

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
        node-version: [22.x]

    steps:

    ##
    ## Code to get the package omitted
    ##

    # CLI for Microsoft 365 login action
    - name: Login to tenant
      uses: pnp/action-cli-login@v3
      with:
        TENANT: ${{ secrets.TENANT }}
        APP_ID: ${{ secrets.APP_ID }}
        CLI_VERSION: next

    ##
    ## Code to deploy the package to tenant omitted
    ##
```

#### Self-hosted runners

If self-hosted runners are used for running the workflow, then please make sure that they have `PowerShell` or `bash` installed on them.
