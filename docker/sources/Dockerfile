# ~~~~~~~~~~~~~~~~~~~~~ #
# ez-Dashing Dockerfile #
# ~~~~~~~~~~~~~~~~~~~~~ #

# In order to build this image you first need to build the core dependency
FROM ez-dashing:os
MAINTAINER Yannick Lacaute <yannick.lacaute@gmail.com>

COPY * /usr/src/app/
COPY ez-client /usr/src/app/ez-client
COPY ez-server /usr/src/app/ez-server

# Build front
WORKDIR /usr/src/app/ez-client
RUN npm install

# Build server
# TODO : DONT FUCKING WORKS !!! WHY !!!
WORKDIR /usr/src/app/ez-server
RUN mvn package

WORKDIR /usr/src/app/

EXPOSE 2222 8080
