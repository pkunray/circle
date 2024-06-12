# syntax=docker/dockerfile:1.4

FROM node:lts-buster

WORKDIR /circle-frontend

COPY package.json /circle-frontend
COPY package-lock.json /circle-frontend

RUN npm ci

COPY . /circle-frontend

EXPOSE 3000

CMD ["npm", "run", "dev"]