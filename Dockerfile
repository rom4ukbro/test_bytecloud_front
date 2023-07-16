FROM node:18.15.0

WORKDIR /test_bytecloud_frontend

COPY "package.json" . 

RUN npm i 

COPY . . 

RUN npm run build

ENV NODE_OPTIONS=--openssl-legacy-provider

CMD ["npm", "run", "start"]