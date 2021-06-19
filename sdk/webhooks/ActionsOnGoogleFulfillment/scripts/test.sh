#!/bin/bash

export GOOGLE_APPLICATION_CREDENTIALS=$HOME/.google-cloud-credentials/barista-3b2b6-5137c11445fb.json

if [ ! -d "node_modules" ]; then
    npm install
fi

npm test
