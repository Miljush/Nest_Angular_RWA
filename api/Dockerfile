FROM node:19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN NPM RUN BUILD

EXPOSE 3000

CMD ["npm","run","start:prod"]