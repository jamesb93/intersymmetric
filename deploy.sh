pnpm run build
rsync -a dist/ /var/www/distrib.xyz/html
systemctl restart nginx