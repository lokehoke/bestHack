root=`pwd`


echo "compile front"
cd src/front/
yarn install
yarn webpack
cd $root


echo "start server"
cd src/server/
sudo docker build -t lokehoke/best_hack_server .
sudo docker run -p 1337:3000 lokehoke/best_hack_server
cd $root
