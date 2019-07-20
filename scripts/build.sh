#! /bin/bash
rm -rf dist && NODE_ENV=production npx babel src/lib --out-dir dist --copy-files