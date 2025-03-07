FROM gplane/pnpm as Builder

RUN mkdir -p /home/openeuler/web
WORKDIR /home/openeuler/web
COPY . /home/openeuler/web

RUN rm -rf ./app/ru

RUN pnpm install
RUN pnpm build

FROM swr.cn-north-4.myhuaweicloud.com/opensourceway/openeuler/nginx:latest

RUN yum update -y \
    && yum install -y pcre-devel

COPY --from=Builder /home/openeuler/web/app/.vitepress/dist /usr/share/nginx/www/
RUN chmod -R 755 /usr/share/nginx/www
RUN rm -rf  /usr/share/nginx/www/ru
COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf

RUN touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/log/nginx \
    && chown -R nginx:nginx /var/run/nginx.pid \
    && chown -R nginx:nginx /etc/nginx

EXPOSE 8080

USER nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]
