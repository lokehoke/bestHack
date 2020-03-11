root=`pwd`

./compile_front.sh

echo "start server"
cd src/server/
yarn install
cd $root

sudo docker-compose build
sudo docker-compose up
