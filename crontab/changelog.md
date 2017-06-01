# Cleaning traces
MAILTO=""
33 */3 * * * /root/bin/cleaning.sh > /dev/null 2>&1

# Update certificates
@weekly certbot renew --standalone --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx" --quiet

# OpenVPN firewall settings
@reboot iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -j SNAT --to 46.28.205.118
