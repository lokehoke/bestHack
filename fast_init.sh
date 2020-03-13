sudo rm -rf db_data
sudo service postgresql stop
sudo docker-compose build
sudo docker-compose up  --force-recreate
