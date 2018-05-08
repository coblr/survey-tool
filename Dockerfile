FROM nginx:1.11.8
COPY nginx.conf   /etc/nginx/nginx.conf
COPY build        /usr/share/nginx/html