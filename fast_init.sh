sudo service postgresql stop
sudo docker-compose rm -f -v --all
sudo docker-compose build --no-cache db
sudo docker-compose up  --force-recreate
