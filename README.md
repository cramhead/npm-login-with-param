# npm-login-with-param

A simple script to login into npm from the command line, in case you don't have
an interactive shell, `expect` or anything fancy. This package extends the great work Arian Stolwijk did by allowing you to provide parameters to the login process. Very handy for docker builds

### Usage

With parameters
`npx npm-login-with-param -u john -p secret -e john@test.com`
or
`npx npm-login-with-param --username john --password secret --email john@test.com`

With environment variables

```bash
export NPM_USER=john
export NPM_PASS=secret
export NPM_EMAIL=john@example.com
npx npm-login-with-param
```

### How it works

It's a simple child process that reads/writes from/to the stdout/stdin.
