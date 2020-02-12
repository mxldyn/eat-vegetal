#!/usr/bin/env bash

if [ $ENV == "production"  ];
then
  echo "Switching to Production environment"
  yes | cp -rf "credentials/production/prod.keystore" android/app
else
else
  echo "Switching to Development environment"
  yes | cp -rf "credentials/development/dev.keystore" android/app
fi
