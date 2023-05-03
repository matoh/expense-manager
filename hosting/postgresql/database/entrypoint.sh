#!/bin/sh
echo "#!/bin/sh" >> /docker-entrypoint-initdb.d/00-ssl.sh
chmod 0777 /docker-entrypoint-initdb.d/00-ssl.sh

exec docker-entrypoint.sh postgres
