./compile_front.sh
./compile_server.sh

sudo service postgresql start
node src/server/index.js
