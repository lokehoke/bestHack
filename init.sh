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
sudo docker build -t lokehoke/best_hack_server -f src/server/Dockerfile .
sudo docker run -p 3000:3000 lokehoke/best_hack_server
