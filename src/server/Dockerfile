FROM ubuntu:latest
MAINTAINER lokehoke
WORKDIR /server/

RUN apt update
RUN apt dist-upgrade
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt install -y nodejs

RUN npm install -g yarn

COPY . /server
RUN yarn install

EXPOSE 80
CMD node index.js
