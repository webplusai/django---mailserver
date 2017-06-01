# OpenVPN
apt-get install openvpn easy-rsa libpam-mysql sasl2-bin
cp -R /usr/share/easy-rsa/ /etc/openvpn/
mkdir /etc/openvpn/easy-rsa/keys/
vim /etc/openvpn/easy-rsa/vars
  export KEY_SIZE=4096
  export KEY_COUNTRY="CH"
  export KEY_PROVINCE="ZH"
  export KEY_CITY="ZURICH"
  export KEY_ORG="Luceatmail"
  export KEY_EMAIL="vpn@luceatmail.com"
  export KEY_OU="VPN"
  export KEY_NAME="vpn.luceatmail.com"
cd /etc/openvpn/easy-rsa/
source ./vars
./clean-all
./build-ca
./build-key-server vpn.luceatmail.com
./build-dh
cp keys/{vpn.luceatmail.com.crt,vpn.luceatmail.com.key,ca.crt,dh4096.pem} /etc/openvpn/
gunzip -c /usr/share/doc/openvpn/examples/sample-config-files/server.conf.gz > /etc/openvpn/server.conf
vim /etc/openvpn/server.conf
  ca ca.crt
  cert vpn.luceatmail.com.crt
  key vpn.luceatmail.com.key
  dh dh4096.pem
  cipher AES-256-CBC
  push "redirect-gateway def1 bypass-dhcp"
  push "dhcp-option DNS 46.28.201.21"
  push "dhcp-option DNS 46.28.201.22"
  user nobody
  group nogroup
  client-cert-not-required
  username-as-common-name
  plugin /usr/lib/openvpn/openvpn-plugin-auth-pam.so openvpn
  auth SHA512
vim /etc/pam.d/openvpn
auth optional /lib/security/pam_mysql.so user=administrator passwd=H_6Ad3Xx=Yzv4v+Qgj host=localhost db=mail table=users usercolumn=email passwdcolumn=password crypt=1
account required /lib/security/pam_mysql.so user=administrator passwd=H_6Ad3Xx=Yzv4v+Qgj host=localhost db=mail table=users usercolumn=email passwdcolumn=password crypt=1
echo 1 > /proc/sys/net/ipv4/ip_forward
vim /etc/sysctl.conf
  net.ipv4.ip_forward=1
vim /etc/default/saslauthd
  START=yes
systemctl enable saslauthd
systemctl restart !$
systemctl enable openvpn@server
systemctl restart !$
iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -j SNAT --to 46.28.205.118
crontab -e
  @reboot iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -j SNAT --to 46.28.205.118
