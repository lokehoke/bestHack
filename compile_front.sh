root=`pwd`

echo "compile front"
cd src/front/
yarn install
yarn webpack
cd $root
