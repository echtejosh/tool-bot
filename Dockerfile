FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache python3 make g++

COPY package*.json .

RUN npm install

COPY . .