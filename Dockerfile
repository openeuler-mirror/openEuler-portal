FROM swr.cn-north-4.myhuaweicloud.com/opensourceway/node:latest as Builder

RUN mkdir -p /home/openeuler/web
WORKDIR /home/openeuler/web
COPY . /home/openeuler/web

RUN npm install pnpm -g && \
    pnpm install && \
    pnpm build

FROM swr.cn-north-4.myhuaweicloud.com/opensourceway/openeuler/nginx:latest as NginxBuilder

FROM swr.cn-north-4.myhuaweicloud.com/opensourceway/openeuler/base:latest

ENV NGINX_CONFIG_FILE /etc/nginx/nginx.conf
ENV NGINX_CONFIG_PATH /etc/nginx/
ENV NGINX_PID /var/run/nginx.pid
ENV NGINX_USER nginx
ENV NGINX_GROUP nginx
ENV NGINX_BIN /usr/share/nginx/sbin/
ENV NGINX_HOME /usr/share/nginx/
ENV NGINX_EXE_FILE /usr/share/nginx/sbin/nginx
ENV DST_PATH /etc/nginx/cert

COPY --from=NginxBuilder /usr/share/nginx /usr/share/nginx
COPY --from=NginxBuilder /usr/share/nginx/sbin/nginx /usr/share/nginx/sbin/nginx
COPY --from=NginxBuilder /etc/nginx/modules /etc/nginx/modules
COPY --from=NginxBuilder /etc/nginx/geoip  /etc/nginx/geoip
COPY --from=NginxBuilder /etc/nginx/mime.types  /etc/nginx/mime.types
COPY --from=Builder /home/openeuler/web/app/.vitepress/dist /usr/share/nginx/www/
COPY ./deploy/monitor.sh ./deploy/entrypoint.sh /etc/nginx/
COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf.template

RUN sed -i "s|repo.openeuler.org|mirrors.nju.edu.cn/openeuler|g" /etc/yum.repos.d/openEuler.repo \
    && sed -i '/metalink/d' /etc/yum.repos.d/openEuler.repo \
    && sed -i '/metadata_expire/d' /etc/yum.repos.d/openEuler.repo \
    && yum update -y \
    && yum install -y findutils passwd shadow pcre-devel net-tools libmaxminddb libmaxminddb-devel \
    && find /usr/share/nginx/www -type d -print0| xargs -0 chmod 500 \
    && find /usr/share/nginx/www -type f -print0| xargs -0 chmod 400 \
    && touch /var/run/nginx.pid \
    && groupadd -g 1000 nginx \
    && useradd -u 1000 -g nginx -s /sbin/nologin nginx \
    && sed -i '/^PATH="\$HOME\/\.local\/bin:\$HOME\/bin:\$PATH"/d; /^export PATH/d' /home/nginx/.bashrc \
    && chmod 750 /usr \
    && chmod 550 /usr/share \
    && chown -R nginx:nginx /usr/share/nginx \
    && find /usr/share/nginx -type d -print0 | xargs -0 chmod 500 \
    && chmod 500 /usr/share/nginx/sbin/nginx \
    && mkdir -p /var/log/nginx \
    && mkdir -p /etc/nginx/cert \
    && chown -R nginx:nginx /etc/nginx/cert \
    && chmod -R 700 /etc/nginx/cert \
    && chown -R nginx:nginx /var/log/nginx \
    && chmod -R 640 /var/log/nginx \
    && touch /var/log/nginx/error.log \
    && touch /var/log/nginx/access.log \
    && chmod 640 /var/log/nginx/error.log \
    && chmod 640 /var/log/nginx/access.log \
    && chmod 640 /var/log/dnf.librepo.log \
    && chmod 640 /var/log/dnf.log \
    && chmod 640 /var/log/dnf.rpm.log \
    && chmod 640 /var/log/hawkey.log \
    && chmod 640 /var/log/*.log \
    && chmod 440 /etc/nginx/nginx*.conf* \
    && chown -R nginx:nginx /var/log/nginx/* \
    && mkdir -p /var/lib/nginx/tmp/client_body \
    && chown -R nginx:nginx /var/lib/nginx/tmp/client_body \
    && mkdir -p /var/lib/nginx/tmp/fastcgi \
    && chown -R nginx:nginx /var/lib/nginx/tmp/fastcgi \
    && mkdir -p /var/lib/nginx/tmp/proxy \
    && chown -R nginx:nginx /var/lib/nginx/tmp/proxy \
    && mkdir -p /var/lib/nginx/tmp/scgi \
    && chown -R nginx:nginx /var/lib/nginx/tmp/scgi \
    && mkdir -p /var/lib/nginx/tmp/uwsgi \
    && chown -R nginx:nginx /var/lib/nginx/tmp/uwsgi \
    && chmod -R 500 /var/lib/nginx/ \
    && chmod -R 750 /var/lib/nginx/tmp/proxy \
    && chown -R nginx:nginx /var/lib/nginx/ \
    && chown -R nginx:nginx /var/run/nginx.pid \
    && chmod 640 /var/run/nginx.pid \
    && chown -R nginx:nginx /etc/nginx \
    && chmod 550 /etc/nginx \
    && chmod 550 /etc/nginx/geoip/ \
    && chmod 440 /etc/nginx/geoip/* \
    && chmod 550 /etc/nginx/modules \
    && chmod 440 /etc/nginx/modules/* \
    && touch /etc/nginx/nginx.conf \
    && chown nginx:nginx /etc/nginx/nginx.conf \
    && chmod 640 /etc/nginx/nginx.conf \
    && chmod 640 /etc/nginx/nginx.conf.template \
    && chmod 440 /etc/nginx/mime.types \
    && chmod 700 /var/lib/nginx/tmp/client_body \
    && lsd() { \
      local v="$1"; \
        ls -ld "$v"; \
        while :; do \
          v="${v%/*}"; \
          [[ "$v" && ! -f "$v" ]] || break; \
          chown root:root "$v"; \
        done; \
      }; lsd "$NGINX_HOME" \
    && lsd() { \
      local v="$1"; \
        ls -ld $v; \
        while :; do \
        v="${v%/*}"; \
        [[ "$v"  && ! -f "$v" ]] || break; \
        chmod 550 "$v"; \
        done; \
      }; lsd $NGINX_HOME \
    && lsd() { \
      local v="$1"; \
        ls -ld $v; \
        while :; do \
        v="${v%/*}"; \
        [[ "$v"  && ! -f "$v" ]] || break; \
        chown $NGINX_USER:$NGINX_GROUP "$v"; \
        done; \
      }; lsd $NGINX_HOME \
    && rm -rf /usr/share/nginx/html/ \
    && rm -rf /usr/share/nginx/logs/ \
    && echo "umask 0027" >> /etc/bashrc \
    && echo "set +o history" >> /etc/bashrc \
    && sed -i "s|HISTSIZE=1000|HISTSIZE=0|" /etc/profile \
    && sed -i "s/PASS_MAX_DAYS.*/PASS_MAX_DAYS 30/" /etc/login.defs \
    && echo "ALWAYS_SET_PATH yes" >> /etc/login.defs \
    && chage --maxdays 30 nginx \
    && passwd -l $NGINX_USER \
    && yum clean all \
    && usermod -s /sbin/nologin sync \
    && usermod -s /sbin/nologin shutdown \
    && usermod -s /sbin/nologin halt \
    && echo "export TMOUT=1800 readonly TMOUT" >> /etc/profile \
    && rm -rf /usr/bin/gdb* \
    && rm -rf /usr/share/gdb \
    && rm -rf /usr/share/gcc* \
    && rm -rf /usr/lib64/python3.11/bdb.py \
    && rm -rf /usr/lib64/python3.11/pdb.py \
    && rm -rf /usr/lib64/python3.11/timeit.py \
    && rm -rf /usr/lib64/python3.11/trace.py \
    && rm -rf /usr/lib64/python3.11/tracemalloc.py \
    && rm -rf /usr/share/licenses/glibc \
    && rm -rf /usr/share/locale/ar \
    && rm -rf /usr/share/locale/cpp \
    && yum remove gdb-gdbserver findutils passwd shadow -y

RUN chmod 500 /etc/nginx/monitor.sh \
    && chmod 500 /etc/nginx/entrypoint.sh \
    && chown nginx:nginx /etc/nginx/monitor.sh \
    && chown nginx:nginx /etc/nginx/entrypoint.sh \
    && sed -i "/PATH=/d" /home/nginx/.bashrc \
    && source /home/nginx/.bashrc

EXPOSE 8080

USER nginx

ENTRYPOINT ["/etc/nginx/entrypoint.sh"]
