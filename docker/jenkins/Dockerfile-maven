# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #
# ez-Dashing Maven build Dockerfile #
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #
FROM maven:3.5-jdk-8

LABEL maintainer "Yannick Lacaute <yannick.lacaute@gmail.com>"

ARG uid=1000
ARG gid=1000
RUN addgroup --gid ${gid} jenkins
RUN useradd jenkins --create-home --home /home/jenkins --shell /bin/sh --uid ${uid} --gid ${gid}

RUN apt-get update -qq && apt-get install -qqy \
    cowsay\
    sysvbanner\
    && rm -rf /var/lib/apt/lists/*

# Need to put cowsay in path
RUN ln -s /usr/games/cowsay /usr/bin/cowsay
