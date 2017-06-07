# ~~~~~~~~~~~~~~~~~~~~~~~~~~ #
# ez-Dashing Demo Dockerfile #
# ~~~~~~~~~~~~~~~~~~~~~~~~~~ #

# Expected command to run a the demo container :
#
#   docker run -it -p 2222:2222 --name ez-demo ez-dashing:demo
#
# Port 8080 is also exposed if needed
#
FROM mkenney/npm

MAINTAINER Yannick Lacaute <yannick.lacaute@gmail.com>

COPY ez-client /usr/src/app/ez-client

WORKDIR /usr/src/app/ez-client
RUN npm install

EXPOSE 2222 8080

CMD ["sh","demo.sh"]
