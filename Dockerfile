FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache python3 make g++

COPY package*.json .

RUN mkdir node_modules

RUN npm i -g pnpm
RUN npm ci --no-audit

COPY . .