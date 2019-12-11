FROM node:12-alpine

WORKDIR /src/app

COPY package.json ./

RUN npm install && npm i -g nodemon

COPY . .

EXPOSE 3001

CMD [ "nodemon", "-L", "server.js"]