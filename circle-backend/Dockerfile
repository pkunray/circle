# syntax=docker/dockerfile:1.4

FROM node:lts-buster-slim

WORKDIR /circle-backend

COPY package.json /circle-backend/package.json
COPY package-lock.json /circle-backend/package-lock.json
RUN npm ci

COPY . /circle-backend

EXPOSE 9000

CMD [ "npm", "start" ]