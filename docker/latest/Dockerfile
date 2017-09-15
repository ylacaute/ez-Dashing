# ~~~~~~~~~~~~~~~~~~~~~ #
# ez-Dashing Dockerfile #
# ~~~~~~~~~~~~~~~~~~~~~ #

# Expected docker run :
# docker run -itp 8080:8080 --name ez-dashing -v /tmp/ez-config:/ez-config  ez-dashing:latest
#
# Note that '/tmp/ez-config' is your local directory containg configuration files. This directory
# must be in lower case and should contains 'server.properties' and 'dashboard.json'.

FROM frolvlad/alpine-oraclejdk8:slim

MAINTAINER Yannick Lacaute <yannick.lacaute@gmail.com>

COPY ez-server/target/classes /usr/src/app/classes
COPY ez-server/target/ez-dashing-0.1.0-SNAPSHOT.jar /usr/src/app/ez-dashing-0.1.0-SNAPSHOT.jar
WORKDIR /usr/src/app/

ENV JAVA_OPTS=""

EXPOSE 8080

ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -Dspring.config.location=file:/ez-config/server.properties -Dlogging.file=/ez-config/ez-dashing.log -jar ez-dashing-0.1.0-SNAPSHOT.jar" ]
