# Postfix
```
apt-get install postfix postfix-mysql
```
- Select "Internet Site".
- Set "gs17.solarcom.ch" as the FQDM.

```
vim /etc/postfix/mysql-virtual_domains.cf
  user = administrator
  password = H_6Ad3Xx=Yzv4v+Qgj
  dbname = mail
  query = SELECT domain AS virtual FROM domains WHERE domain='%s'
  hosts = 127.0.0.1
vim /etc/postfix/mysql-virtual_forwardings.cf
  user = administrator
  password = H_6Ad3Xx=Yzv4v+Qgj
  dbname = mail
  query = SELECT destination FROM forwardings WHERE source='%s'
  hosts = 127.0.0.1
vim /etc/postfix/mysql-virtual_mailboxes.cf
  user = administrator
  password = H_6Ad3Xx=Yzv4v+Qgj
  dbname = mail
  query = SELECT CONCAT(SUBSTRING_INDEX(email,'@',-1),'/',SUBSTRING_INDEX(email,'@',1),'/') FROM users WHERE email='%s'
  hosts = 127.0.0.1
vim /etc/postfix/mysql-virtual_email2email.cf
  user = administrator
  password = H_6Ad3Xx=Yzv4v+Qgj
  dbname = mail
  query = SELECT email FROM users WHERE email='%s'
  hosts = 127.0.0.1
chmod o= /etc/postfix/mysql-virtual_*.cf
chgrp postfix /etc/postfix/mysql-virtual_*.cf
groupadd -g 5000 vmail
useradd -g vmail -u 5000 vmail -d /home/vmail -m
postconf -e 'myhostname = gs17.solarcom.ch'
postconf -e 'mydestination = localhost, localhost.localdomain'
postconf -e 'inet_interfaces = all'
postconf -e 'message_size_limit = 30720000'
postconf -e 'virtual_alias_domains ='
postconf -e 'virtual_alias_maps = proxy:mysql:/etc/postfix/mysql-virtual_forwardings.cf, mysql:/etc/postfix/mysql-virtual_email2email.cf'
postconf -e 'virtual_mailbox_domains = proxy:mysql:/etc/postfix/mysql-virtual_domains.cf'
postconf -e 'virtual_mailbox_maps = proxy:mysql:/etc/postfix/mysql-virtual_mailboxes.cf'
postconf -e 'virtual_mailbox_base = /home/vmail'
postconf -e 'virtual_uid_maps = static:5000'
postconf -e 'virtual_gid_maps = static:5000'
postconf -e 'smtpd_sasl_type = dovecot'
postconf -e 'smtpd_sasl_path = private/auth'
postconf -e 'smtpd_sasl_auth_enable = yes'
postconf -e 'broken_sasl_auth_clients = yes'
postconf -e 'smtpd_sasl_authenticated_header = yes'
postconf -e 'smtpd_recipient_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_unauth_destination'
postconf -e 'smtpd_use_tls = yes'
postconf -e 'smtpd_tls_cert_file = /etc/letsencrypt/live/luceatmail.com/fullchain.pem;'
postconf -e 'smtpd_tls_key_file = /etc/letsencrypt/live/luceatmail.com/privkey.pem;'
postconf -e 'proxy_read_maps = $local_recipient_maps $mydestination $virtual_alias_maps $virtual_alias_domains $virtual_mailbox_maps $virtual_mailbox_domains $relay_recipient_maps $relay_domains $canonical_maps $sender_canonical_maps $recipient_canonical_maps $relocated_maps $transport_maps $mynetworks'
postconf -e 'virtual_transport = dovecot'
postconf -e 'dovecot_destination_recipient_limit = 1'
vim /etc/postfix/master.cf
  submission inet n       -       -       -       -       smtpd
    -o syslog_name=postfix/submission
    -o smtpd_tls_security_level=encrypt
    -o smtpd_sasl_auth_enable=yes
    -o smtpd_client_restrictions=permit_sasl_authenticated,reject
    -o milter_macro_daemon_name=ORIGINATING
  smtps     inet  n       -       -       -       -       smtpd
    -o syslog_name=postfix/smtps
    -o smtpd_tls_wrappermode=yes
    -o smtpd_sasl_auth_enable=yes
    -o smtpd_client_restrictions=permit_sasl_authenticated,reject
    -o milter_macro_daemon_name=ORIGINATING
  dovecot   unix  -       n       n       -       -       pipe
    flags=DRhu user=vmail:vmail argv=/usr/lib/dovecot/deliver -f ${sender} -d ${recipient}
vim /etc/aliases
  postmaster: root
  root: postmaster@luceatmail.com
newaliases
postfix reload
systemctl enable postfix.service
systemctl restart !$
```

# Dovecot
```
apt-get install dovecot-core dovecot-mysql dovecot-imapd dovecot-pop3d
mv /etc/dovecot/dovecot.conf /etc/dovecot/dovecot.conf-backup
vim /etc/dovecot/dovecot.conf
  protocols = imap pop3
  log_timestamp = "%Y-%m-%d %H:%M:%S "
  mail_location = maildir:/home/vmail/%d/%n/Maildir

  ssl_cert = </etc/letsencrypt/live/luceatmail.com/fullchain.pem
  ssl_key = </etc/letsencrypt/live/luceatmail.com/privkey.pem

  namespace {
      type = private
      separator = .
      prefix = INBOX.
      inbox = yes
  }

  service auth {
      unix_listener auth-master {
          mode = 0600
          user = vmail
      }

      unix_listener /var/spool/postfix/private/auth {
          mode = 0666
          user = postfix
          group = postfix
      }

  user = root
  }

  service auth-worker {
      user = root
  }

  protocol lda {
      log_path = /home/vmail/dovecot-deliver.log
      auth_socket_path = /var/run/dovecot/auth-master
      postmaster_address = postmaster@luceatmail.com
  }

  protocol pop3 {
      pop3_uidl_format = %08Xu%08Xv
  }

  passdb {
      driver = sql
      args = /etc/dovecot/dovecot-sql.conf.ext
  }

  userdb {
      driver = static
      args = uid=5000 gid=5000 home=/home/vmail/%d/%n allow_all_users=yes
  }

vim /etc/dovecot/dovecot-sql.conf.ext
  driver = mysql
  connect = host=127.0.0.1 dbname=mail user=administrator password=H_6Ad3Xx=Yzv4v+Qgj
  default_pass_scheme = CRYPT
  password_query = SELECT email as user, password FROM users WHERE email='%u';
chgrp dovecot /etc/dovecot/dovecot-sql.conf.ext
chmod o= !$
systemctl enable dovecot.service
systemctl restart !$
```

# Testing email server
telnet localhost pop3
telnet localhost imap
telnet localhost 25
apt-get install heirloom-mailx mutt
mailx beta@luceatmail.com
cd /home/vmail/luceatmail.com/beta/Maildir
mutt -f .
