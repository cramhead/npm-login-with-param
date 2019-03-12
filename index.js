#!/usr/bin/env node

/* eslint-disable no-console */
const childProcess = require('child_process');
const args = require('commander');

args
  .version('1.1.0')
  .option('-e, --email <email>', 'Email address')
  .option('-u, --username <username>', 'Username')
  .option('-p, --password <password>', 'Password')
  .option('--echo', 'Echo the values')
  .parse(process.argv);

const username = args.username || process.env.NPM_USER;
const password = args.password || process.env.NPM_PASS;
const email = args.email || process.env.NPM_EMAIL;

if (args.echo) {
  console.log(`email ${email} username ${username} password ${password}`);
}

if (!username) {
  console.error('Please pass arg username or set the NPM_USER environment variable');
  process.exit(1);
}

if (!password) {
  console.error('Please pass arg password or set the NPM_PASS environment variable');
  process.exit(1);
}

if (!email) {
  console.error('Please pass arg email or set the NPM_EMAIL environment variable');
  process.exit(1);
}

const child = childProcess.spawn('npm', ['login', '-q'], {
  stdio: ['pipe', 'pipe', 'inherit'],
});

child.stdout.on('data', d => {
  const data = d.toString();
  process.stdout.write(`${d}\n`);
  if (data.match(/username/i)) {
    child.stdin.write(`${username}\n`);
  } else if (data.match(/password/i)) {
    child.stdin.write(`${password}\n`);
  } else if (data.match(/email/i)) {
    child.stdin.write(`${email}\n`);
  } else if (data.match(/logged in as/i)) {
    child.stdin.end();
  }
});
