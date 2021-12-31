#!/bin/bash
cd /home/ubuntu/CloudLounge/server

export USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE --query Parameters[0].Value | sed 's/"//g')
export HOST=$(aws ssm get-parameters --region ap-northeast-2 --names HOST --query Parameters[0].Value | sed 's/"//g')
export PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names PASSWORD --query Parameters[0].Value | sed 's/"//g')
export PORT=$(aws ssm get-parameters --region ap-northeast-2 --names PORT --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js