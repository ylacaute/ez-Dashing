FROM node:8-stretch

LABEL maintainer "Yannick Lacaute <yannick.lacaute@gmail.com>"

# As this container is build by the jenkins pipeline, permission of checkouted files
# will be jenkins, so we need to keep this user inside our new container.
ARG uid=1000
ARG gid=1000
RUN addgroup --gid ${gid} jenkins
RUN useradd jenkins --create-home --home /home/jenkins --shell /bin/sh --uid ${uid} --gid ${gid}

# Add packages
RUN apt-get update -qq && apt-get install -qqy \
    cowsay\
    sysvbanner\
    && rm -rf /var/lib/apt/lists/*

# Need to put cowsay in path
RUN ln -s /usr/games/cowsay /usr/bin/cowsay

