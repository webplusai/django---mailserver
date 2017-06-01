# NGINX
```
mkdir /srv/www/
cd !$
mkdir luceatmail.com blog.luceatmail.com chat.luceatmail.com mail.luceatmail.com vpn.luceatmail.com
chown www-data:www-data -R .
apt-get install nginx
```
```
vim /etc/nginx/nginx.conf
  server_tokens off;
  access_log /dev/null;
  error_log /dev/null;
  gzip off; # Gzip shouldn't be used with SSL!

  # SSL
  ssl_protocols TLSv1.2;
  ssl_prefer_server_ciphers on;
  ssl_ciphers AES256+EECDH:AES256+EDH:!aNULL;
  ssl_dhparam /etc/nginx/ssl/dhparam.pem;
  ssl_stapling on;
  ssl_stapling_verify on;
  resolver 208.67.222.222 208.67.220.220 valid=300s;
  resolver_timeout 10s;
  ssl_session_cache shared:SSL:24m;
  ssl_session_timeout 180m;
  ssl_ecdh_curve secp384r1;

  # Headers
  add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
  add_header X-Frame-Options DENY;
  add_header X-Content-Type-Options nosniff;

  # Force HTTPS connection
  server {
      listen 80 default_server;
      listen [::]:80 default_server;
      server_name _;
      rewrite ^ https://$host$request_uri? permanent;
  }
```
```
vim /etc/nginx/sites-available/default
  server {
      listen 443 ssl http2 default_server;
      listen [::]:443 ssl http2 default_server;

      ssl_certificate /etc/letsencrypt/live/luceatmail.com/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/luceatmail.com/privkey.pem;

      root /srv/www/luceatmail.com;
      index index.html index.htm index.php;

      server_name _;

      location / {
          try_files $uri $uri/ =404;
      }

      location ~ \.php$ {
          include snippets/fastcgi-php.conf;
          fastcgi_pass unix:/var/run/php5-fpm.sock;
      }
  }
systemctl enable nginx.service
systemctl restart !$
```
