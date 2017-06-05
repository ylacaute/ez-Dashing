
# ~~~~~~~~~~~~~~~~~~~~~ #
# ez-Dashing Dockerfile #
# ~~~~~~~~~~~~~~~~~~~~~ #

# In order to build this image you first need to build the core dependency
FROM ez-dashing:os

MAINTAINER Yannick Lacaute <yannick.lacaute@gmail.com>

RUN mkdir -p /usr/src/app

COPY * /usr/src/app/

WORKDIR /usr/src/app/ez-client

RUN npm install

WORKDIR /usr/src/app/

EXPOSE 2222 8080
