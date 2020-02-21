#!/usr/bin/env bash

if [ $ENV == "production"  ];
then
  echo "Switching to Production environment"
  yes | cp -rf "credentials/release.keystore" android/app
else
  echo "Switching to Development environment"
  yes | cp -rf "credentials/release.keystore" android/app
fi
