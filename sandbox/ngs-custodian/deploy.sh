#!/bin/bash
tar czf ngs-custodian.tar.gz server.js package.json package-lock.json ecosystem.config.js db logs public routes uploads
scp -r -i ~/.ssh/aws-kp-2018-02-05.pem ngs-custodian.tar.gz ubuntu@23.23.42.188:~
rm ngs-custodian.tar.gz

ssh -i ~/.ssh/aws-kp-2018-02-05.pem ubuntu@23.23.42.188 << 'ENDSSH'
pm2 delete all
rm -rf ngs-custodian
mkdir ngs-custodian
tar xf ngs-custodian.tar.gz -C ngs-custodian
rm ngs-custodian.tar.gz
cd ngs-custodian
npm install
sed -i -e 's/127.0.0.1/23.23.42.188/g' ./public/index.html
rm db/index.js
mv db/.index.js db/index.js
pm2 start
ENDSSH

# tar czf easyio.tar.gz main.js package.json yarn.lock public LICENSE
# scp easyio.tar.gz nanogram.io:~
# rm easyio.tar.gz

# ssh nanogram.io << 'ENDSSH'
# pm2 stop all
# rm -rf easyio
# mkdir easyio
# tar xf easyio.tar.gz -C easyio
# rm easyio.tar.gz
# cd easyio 
# yarn install
# pm2 start all
# ENDSSH