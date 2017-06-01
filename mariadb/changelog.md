# MariaDB
```
apt-get install mariadb-client mariadb-server
mysql_secure_installation
mysql -u root -pNx-z2_kLsc5=XHGpm7
  CREATE DATABASE mail;
  USE mail;
  GRANT SELECT, INSERT, UPDATE, DELETE ON mail.* TO 'administrator'@'localhost' IDENTIFIED BY 'H_6Ad3Xx=Yzv4v+Qgj';
  GRANT SELECT, INSERT, UPDATE, DELETE ON mail.* TO 'administrator'@'localhost.localdomain' IDENTIFIED BY 'H_6Ad3Xx=Yzv4v+Qgj';
  FLUSH PRIVILEGES;
  CREATE TABLE domains (domain varchar(32) NOT NULL, PRIMARY KEY (domain));
  CREATE TABLE forwardings (source varchar(128) NOT NULL, destination TEXT NOT NULL, PRIMARY KEY (source));
  CREATE TABLE users (email varchar(128) NOT NULL, password varchar(64) NOT NULL, PRIMARY KEY (email));
  CREATE TABLE transport (domain varchar(128) NOT NULL default '', transport varchar(128) NOT NULL default '', UNIQUE KEY domain (domain));
  INSERT INTO domains (domain) VALUES ('luceatmail.com');
  INSERT INTO users (email, password) VALUES ('beta@luceatmail.com', ENCRYPT('BADh4ck3r'));
  quit;
systemctl enable mysqld.service
systemctl restart !$
```
