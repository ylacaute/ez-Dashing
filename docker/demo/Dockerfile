# ~~~~~~~~~~~~~~~~~~~~~~~~~~ #
# ez-Dashing Demo Dockerfile #
# ~~~~~~~~~~~~~~~~~~~~~~~~~~ #

# Expected command to run a the demo container :
#
#   docker run -it -p 8081:8081 --name ez-demo ez-dashing:demo
#
# Port 8080 (mocks) is also exposed if needed
#
FROM mkenney/npm

MAINTAINER Yannick Lacaute <yannick.lacaute@gmail.com>

COPY ez-client /usr/src/app/ez-client

WORKDIR /usr/src/app/ez-client
RUN npm install

EXPOSE 8080 8081

CMD ["sh","demo.sh"]
