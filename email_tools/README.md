First you'll need to edit the configuration file *config.ini* according
with your configuration. My configuration is as follows:

```
[database]
host = localhost
user = usermail
password = PASSWORD_HERE
name = servermail

[disk]
vhostdir = /var/mail/vhosts
uid = 5000
gid = 5000

```

Now you will be able to run the scripts as follows:

```
sudo ./addUser.py -e email -p password
sudo ./removeUser.py -e email
./changePassword.py -e email -p newpassword
./listUsers.py

sudo ./addDomain.py -d domain
sudo ./removeDomain.py -d domain
./listDomains.py

./addAlias.py -s source -d destination
./removeAlias.py -s source
./listAliases.py
```

Some scripts need root permissions in order to create or delete the mailboxes
on disk.
