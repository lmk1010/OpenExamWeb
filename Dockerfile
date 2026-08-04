# 站点是纯静态的，构建在本地或 CI 完成，镜像里只有 nginx + dist。
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

EXPOSE 80
