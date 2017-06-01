# Let's encrypt certbot
```
mkdir -p /etc/nginx/ssl/
openssl dhparam -out /etc/nginx/ssl/dhparam.pem 4096
vim /etc/apt/sources.list
  # Backports
  deb http://ftp.debian.org/debian jessie-backports main
apt-get update && apt-get install certbot -t jessie-backports
certbot certonly --standalone --rsa-key-size 4096 -d luceatmail.com -d www.luceatmail.com -d blog.luceatmail.com -d chat.luceatmail.com -d mail.luceatmail.com -d vpn.luceatmail.com --email cto@luceatmail.com --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx"
crontab -e
  @weekly certbot renew --standalone --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx" --quiet
```
