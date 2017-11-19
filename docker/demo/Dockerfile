# ~~~~~~~~~~~~~~~~~~~~~~~~~~ #
# ez-Dashing Demo Dockerfile #
# ~~~~~~~~~~~~~~~~~~~~~~~~~~ #

# This demo just allow to quickly a running dashboard.
# There is no backend: API is mocked, exactly as when you are developping the application

# USAGE : docker run --rm -it -p 8081:8081 --name ez-demo ylacaute/ez-dashing:demo
# Port 8080 (mocks) is also exposed if needed

FROM node:8-stretch

LABEL maintainer "Yannick Lacaute <yannick.lacaute@gmail.com>"

# ez-client/node_modules are ignored (see .dockerignore)
COPY ez-client /usr/src/app/ez-client

WORKDIR /usr/src/app/ez-client
RUN npm install

EXPOSE 8080 8081

# Create a script to ease to start of this container
RUN echo "#!/bin/sh\n\
  npm run api &\n\
  sleep 3\n\
  npm run serve\n" > demo.sh
RUN chmod +x demo.sh

CMD ["sh","demo.sh"]
