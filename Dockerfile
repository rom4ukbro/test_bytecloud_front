FROM node:18.15.0

WORKDIR /test_bytecloud_frontend

COPY "package.json" .

RUN npm i 

COPY . . 

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

CMD ["npm", "run", "start"]