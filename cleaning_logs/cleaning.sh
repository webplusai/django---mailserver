find /var/log/ -type f -exec cp /dev/null {} \;
cd /root/
rm -R .*_history .viminfo .vifm/ .vim/
cd /home/administrator/
rm .*_history
