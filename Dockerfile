FROM node:18.18.0

WORKDIR /smart-recharge-api

COPY package*.json /smart-recharge-api
RUN npm install

COPY . /smart-recharge-api

EXPOSE 3000
CMD ["npm", "run", "dev"]