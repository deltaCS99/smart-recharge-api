FROM node:18.18.0

WORKDIR /smart-recharge-api

COPY package*.json /smart-recharge-api
RUN npm install
RUN npm install -g sequelize-cli

COPY . /smart-recharge-api

EXPOSE 3000