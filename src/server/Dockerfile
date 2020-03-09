FROM node:latest
MAINTAINER lokehoke
WORKDIR /server/


COPY src/server/package.json /server
RUN yarn install


COPY src/server  /server
COPY public /server/public

EXPOSE 3000
CMD ["node", "index.js"]
