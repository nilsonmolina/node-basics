#!/bin/bash
set -e # Any subsequent(*) commands which fail will cause the shell script to exit immediately

cd react-app/
sed -i -e 's/127.0.0.1/23.23.42.188/g' ./src/App.js
npm run build
rm -rf ../server/public/
cp -r build/ ../server/public/
cd ../server

tar czf chapp.tar.gz server.js package.json package-lock.json ecosystem.config.js public
scp -r -i ~/.ssh/aws-kp-2018-02-05.pem chapp.tar.gz ubuntu@23.23.42.188:~
rm chapp.tar.gz
mv ../react-app/src/App.js-e ../react-app/src/App.js

ssh -i ~/.ssh/aws-kp-2018-02-05.pem ubuntu@23.23.42.188 << 'ENDSSH'
pm2 delete chapp
rm -rf chapp
mkdir chapp
tar xf chapp.tar.gz -C chapp
rm chapp.tar.gz
cd chapp
npm install
mkdir logs
pm2 start
ENDSSH