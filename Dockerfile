# starts from a base image
FROM bitnami/nginx 
# copy the build in 
COPY build /app

ADD nginx-react.conf /opt/bitnami/nginx/conf/bitnami/