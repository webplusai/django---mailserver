# Automatic traces cleaning
```
mkdir ~/bin/
cd !$
vim cleaning.sh
  find /var/log/ -type f -exec cp /dev/null {} \;
  cd /root/
  rm -R .*_history .viminfo .vifm/ .vim/
  cd /home/administrator/
  rm .*_history
chmod +x !$
crontab -e
  MAILTO=""
  33 */3 * * * /root/bin/cleaning.sh >> /dev/null 2>&1
```
