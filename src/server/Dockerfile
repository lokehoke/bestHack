FROM node:latest
MAINTAINER lokehoke
WORKDIR /server/

RUN apt update
RUN apt install default-jre -y

COPY src/server/package.json /server
RUN yarn install


COPY src/server  /server
COPY public /server/public

COPY src/db /db

EXPOSE 3000
CMD sleep 10; node index.js
