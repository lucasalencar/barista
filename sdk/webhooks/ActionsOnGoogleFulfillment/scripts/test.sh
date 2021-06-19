#!/bin/bash
set -euo pipefail

echo 'REMINDER: Make sure you have deployed through Google Actions interface accessing Test page.'

if [ ! -d "node_modules" ]; then
    npm install
fi

export GOOGLE_APPLICATION_CREDENTIALS=$HOME/.google-cloud-credentials/barista-3b2b6-5137c11445fb.json
npm test
