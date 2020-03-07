FROM ubuntu:latest
MAINTAINER lokehoke


RUN apt update
RUN apt dist-upgrade
RUN curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
RUN apt install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN apt install -y yarn

RUN yarn install

EXPOSE 80

