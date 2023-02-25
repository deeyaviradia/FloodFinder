#!/bin/bash

yarn build
date ; netstat -tupln | grep 3000 | awk  '{print $NF}' | sed -e 's/\/node//g' | xargs kill -9

