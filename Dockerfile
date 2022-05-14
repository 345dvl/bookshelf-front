FROM node:18.1
WORKDIR /usr/src/app

RUN npm install -g npm@latest && npm install create-next-app
RUN npm install firebase