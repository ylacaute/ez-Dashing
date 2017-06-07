# ~~~~~~~~~~~~~~~~~~~~~ #
# ez-Dashing Dockerfile #
# ~~~~~~~~~~~~~~~~~~~~~ #

# Expected docker run :
# docker run -itp 8080:8080 --name ez-dashing -v /tmp/ez-config:/ez-config  ez-dashing:latest
#
# Note that '/tmp/ez-config' is your local directory containg configuration files. This directory
# must be in lower case and should contains 'server.properties' and 'dashboard.json'.

# TODO : optimize dependency
# In order to build this image you first need to build the core dependency
FROM ez-dashing:os

MAINTAINER Yannick Lacaute <yannick.lacaute@gmail.com>

COPY ez-server/target/classes /usr/src/app/classes

COPY ez-server/target/ez-dashing-0.0.1-SNAPSHOT.jar /usr/src/app/ez-dashing-0.0.1-SNAPSHOT.jar

WORKDIR /usr/src/app/

EXPOSE 8080

ENTRYPOINT ["java","-jar","ez-dashing-0.0.1-SNAPSHOT.jar", "--spring.config.location=file:/ez-config/server.properties"]
CMD [""]
