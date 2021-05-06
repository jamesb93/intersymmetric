yarn run build
rsync -a build/ /var/www/distrib.xyz/html
systemctl restart nginx