# gunicorn --bind 0.0.0.0:5000 wsgi:application
# Deactivate

# Make a file
# sudo vim /etc/systemd/system/news-classifier.service

# Description=News Classifier
# After=network.target

# ?Zxi?
# [Service]
# User=ubuntu
# Group=www-data
# WorkingDirectory=/home/ubuntu/server1
# Environment="PATH=/home/ubuntu/server1/venv/bin"
# ExecStart=/home/ubuntu/server1/venv/bin/gunicorn --workers 3 --bind unix:news-classifier.sock -m 007 wsgi:application

# [Install]
# WantedBy=multi-user.target


# sudo systemctl start news-classifier
# sudo systemctl enable news-classifier
# sudo systemctl status news-classifier


# Setup the nginx
# sudo apt install nginx

# sudo vim /etc/nginx/sites-available/news-classifier.conf

# server {
#     listen 80;
#     server_name server1;

#     location / {
#         include proxy_params;
#         proxy_pass http://unix:/home/ubuntu/server1/news-classifier.sock;
#     }

# sudo ln -s /etc/nginx/sites-available/news-classifier.conf /etc/nginx/sites-enabled/


# sudo nginx -t

# sudo systemctl restart nginx


# firewall
# sudo ufw allow 'Nginx Full'
# sudo ufw status


# sudo tail /var/log/nginx/error.log

# sudo chmod 775 /home/ubuntu/
