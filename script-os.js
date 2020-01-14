/* eslint-disable camelcase, no-console */
const { spawn } = require('child_process');

const scripts = require('./script-os.json');

const { platform } = process;
const { ANDROID_HOME, npm_config_argv } = process.env;
const { original } = JSON.parse(npm_config_argv);
const os = platform === 'win32' ? platform : 'default';
const scriptCmd = original.find(o => !!scripts[`${o}:default`]);
const script = scripts[`${scriptCmd}:${os}`] || scripts[`${scriptCmd}:default`];
const cmd = script.replace(/\$ANDROID_HOME/g, ANDROID_HOME);

console.log(`Command: ${cmd}`);

spawn(cmd, { shell: true, stdio: 'inherit' });
