yarn run build
rm -rf /var/www/intersymmetric.xyz/html/*
rsync -a build/ /var/www/intersymmetric.xyz/html
systemctl restart nginx