FROM node:latest
MAINTAINER lokehoke
WORKDIR /server/


COPY src/server/package.json /server
RUN yarn install


COPY src/server  /server
COPY public /server/public

COPY src/db /db

EXPOSE 3000
CMD sleep 5; node index.js
