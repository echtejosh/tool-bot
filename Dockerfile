FROM node:20-alpine as builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i pnpm
RUN pnpm i
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/node_modules ./node_modules
