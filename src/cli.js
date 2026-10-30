#!/usr/bin/env node
const { createPrompt } = require('./index.js');
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
    console.log("Usage: node src/cli.js --age '40' --style 'anime' --ratio '9:16'");
    process.exit(0);
}

const input = {};
for (let i = 0; i < args.length; i += 2) {
    const arg = args[i];
    const key = arg.replace(/^--/, '');
    const value = args[i + 1];
    if (key && value) {
        input[key] = value;
    }
}

const finalOutput = createPrompt(input);
console.log("🎬 Generated New Story & Image Prompt:\n", JSON.stringify(finalOutput, null, 2));
