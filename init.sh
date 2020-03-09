root=`pwd`


echo "compile front"
cd src/front/
yarn install
yarn webpack
cd $root


echo "start server"
cd src/server/
yarn install
cd $root

sudo docker-compose build
sudo docker-compose up
