const {spawn} = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const {whatsappClient} = require('./whatsapp');

const targetDir = '<your-target-directory>'; // Replace with your actual target directory

function runCommand(command, args, cwd, onClose) {
  console.log(
    `Running command: "${command} ${args.join(' ')}" in directory: "${cwd}"`
  );
  const child = spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: true,
  });
  child.on('close', (code) => {
    console.log(`Process exited with code ${code}`);
    if (onClose) onClose(code);
  });
}

function runCommandAfterMinutes(command, args, cwd, minutes, onClose) {
  console.log(
    `Will run command: "${command} ${args.join(
      ' '
    )}" in directory: "${cwd}" after ${minutes} minutes...`
  );
  setTimeout(() => {
    runCommand(command, args, cwd, onClose);
  }, minutes * 60 * 1000);
}

function updateEnvVariable(envPath, key, value) {
  if (!fs.existsSync(envPath)) {
    console.log(`.env file does not exist at ${envPath}, nothing to update.`);
    return;
  }
  let envContent = fs.readFileSync(envPath, 'utf8');
  let found = false;
  // Update and uncomment the first matching line, comment out all others
  envContent = envContent
    .split('\n')
    .map((line) => {
      if (line.match(/^#*\s*REACT_APP_ENV\s*=/)) {
        if (!found) {
          found = true;
          return `${key} = ${value}`;
        } else {
          // Comment out any other REACT_APP_ENV lines
          return `#${line.replace(/^#*/, '')}`;
        }
      }
      return line;
    })
    .join('\n');
  fs.writeFileSync(envPath, envContent, 'utf8');
  if (found) {
    console.log(`Updated existing ${key} in ${envPath}`);
  } else {
    console.log(`No ${key} found in ${envPath}, nothing updated.`);
  }
}

function runCommandAfterMinutes(command, args, cwd, minutes, onClose) {
  console.log(
    `Will run command: "${command} ${args.join(
      ' '
    )}" in directory: "${cwd}" after ${minutes} minutes...`
  );
  setTimeout(() => {
    // Update .env just before running the command
    const envPath = path.join(cwd, '.env');
    updateEnvVariable(envPath, 'REACT_APP_ENV', 'Development');
    runCommand(command, args, cwd, onClose);
  }, minutes * 60 * 1000);
}

// // Example: Run 'yarn build' after 10 = n10 minutes, then 'yarn start' if build succeeds
// // 5 / 60 is after 5 seconds
runCommandAfterMinutes('yarn', ['build'], targetDir, 5 / 60, (code) => {
  if (code === 0 || code === 1) {
    runCommand('yarn', ['swa-accustix'], targetDir, (startCode) => {
      if (startCode === 0 || startCode === 1) {
        const message =
          'Message from the script: Build and start commands executed successfully.';
        whatsappClient.sendWhenReady('919260303151@c.us', message);
        whatsappClient.sendMessageToGroup('your-group-name', message);
      } else {
        console.error('yarn start failed, WhatsApp message not sent.');
      }
    });
  } else {
    console.error('Build failed, not starting the app.');
  }
});
