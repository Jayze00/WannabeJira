FROM nginx:1.15-alpine
EXPOSE 8080
RUN chmod -R 777 /var/log/nginx /var/cache/nginx/ /var/run/ /etc/nginx/*
COPY ./build/ /usr/share/nginx/html
COPY ./nginx.conf.template /etc/nginx/nginx.conf
