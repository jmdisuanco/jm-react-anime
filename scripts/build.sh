#!/bin/bash
rm -rf dist && NODE_ENV=production  npx babel src/lib --out-dir dist --copy-files --ignore __tests__,spec.js,test.js,__snapshots__