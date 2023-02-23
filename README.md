# npm-login-with-param

A simple script to login into npm from the command line, in case you don't have
an interactive shell, `expect` or anything fancy. This package extends the great work Arian Stolwijk did by allowing you to provide parameters to the login process. Very handy for docker builds

### Usage

With parameters

```
npx npm-login-with-param -u john -p secret -e john@test.com
```

or

```
npx npm-login-with-param --username john --password secret --email john@test.com
```

With environment variables

```bash
export NPM_USER=john
export NPM_PASS=secret
export NPM_EMAIL=john@example.com
npx npm-login-with-param
```

### npm login --auth-type=legacy

If you are using the `npm` CLI version 9.0 or greater and you are logging in to a private registry
you will almost certainly need to use the `--auth-type=legacy` option of npm.

See: [npm login auth-type](https://docs.npmjs.com/cli/v9/commands/npm-login#auth-type)

To use `--auth-type` with this simple script, use a space and not an equal sign:

``` bash
npx npm-login-with-param --auth-type legacy --username john --password secret --email john@test.com
```

### How it works

It's a simple child process that reads/writes from/to the stdout/stdin.

