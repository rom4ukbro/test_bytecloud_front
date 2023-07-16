FROM node:14

WORKDIR /test_bytecloud_frontend

COPY "package.json" . 

RUN npm i 

COPY . . 

RUN npm run build

CMD ["npm", "run", "start:prod"]