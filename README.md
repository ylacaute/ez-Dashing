# <img src="/ez-client/src/main/resources/img/tech/ezLogo.png" width="100" alt="ez-Dashing"> ez-Dashing

__ez-Dashing__ is a customizable free dashboard tool for agile development teams. The project is still in 
 development but already usable for production. I am aware that many things could be improved, feel free to contribute !

__Guidelines__

 - Responsive
 - Configurable
 - Ready to use
 
__Tech Stack__

<img src="/ez-client/src/main/resources/img/tech/react.png" alt="React" title="React 16" width="50px"/><img src="/ez
-client/src/main/resources/img/tech/redux.png" alt="Redux" title="Redux 4" width="50px"/><img src="/ez-client/src
/main/resources/img/tech/sass.png" alt="SASS" title="SASS" width="50px"/><img src="/ez-client/src/main/resources/img
/tech/webpack.png" alt="Webpack" title="Webpack 4" width="50px"/><img src="/ez-client/src/main/resources/img/tech
/springboot.png" alt="Spring boot" title="Spring boot 2.2" width="50px"/><img src="/ez-client/src/main/resources/img
/tech/maven.png" alt="Maven" title="Maven 3" width="50px"/><img src="/ez-client/src/main/resources/img/tech/docker.png
" alt="Docker" title="Docker" width="50px"/>

# Demo

## Online

I disabled the previous online demo based on real public API because those API are out of date, as the result the
 online demo is now only the frontend started with mocked API, like in development.  

Go on [http://demo.thorpora.fr/ez-dashing/](http://demo.thorpora.fr/ez-dashing/)

## From Docker Hub

The docker demo show a running dashboard (development build) configured to consume a mocked API. This demo is now the
 same as the online demo.
```sh
docker run --rm -it -p 8081:8081 --name ez-demo ylacaute/ez-dashing:demo
```
The first screenshots below is exactly what you should see.

Go on [http://localhost:8081](http://localhost:8081)


# Production

You can directly start to use __ez-Dashing__ by pulling the production docker image. You just have to define your
 json configuration.

## From Docker Hub
```sh
docker run --rm -itp 8080:8080 --name ez-dashing -v /ABSOLUTE/PATH/TO/CONFIG/DIR:/ez-config  ylacaute/ez-dashing:1.0.0
```
Go on [http://localhost:8080](http://localhost:8080)

__Please note that your config directory:__
 - MUST be in absolute path for Docker
 - MUST contains 'dashboard.json' (check sample config directory in the project)
 - CAN also contains 'application.yml' in order to override Spring Boot config 

## From sources

__DEPRECATED__

If you need ez-Dashing in production but without Docker, you will have to package it manually. 
__But keep in mind you should have no reason to start server like that, please use Docker for production.__

```sh
# BUILD FOR PRODUCTION
./ez.sh build-prod

# START FOR PRODUCTION
./ez.sh start-prod <location_directory>

# More options here
./ez.sh -h
```

# Documentation

## Overview

### Front configuration
Define a [dashboard.json](/config/online/dashboard.json) configuration file, composed of the sections below:
 - __env:__ global variables which can be used anywhere in the configuration
 - __server:__ server config, you should have no reason to use that in production
 - __theme:__ choose your favorite theme ("default", "black", etc)
 - __dataSources:__ refreshable dataSources making REST call and mapping the result to properties
 - __widgets:__ your widgets, usually attached to one or many dataSources. See widgets backlog to see available widgets.
 - __avatars:__ declare some avatars for your team
 - __thresholds:__ define the thresholds values which will impact the CSS rules 
 - __grid:__ mainly responsive configuration parameters of the grid

### Server configuration
You can define a server configuration file [application.yml](/config/local/application.yml) to override Spring
 Boot configuration. However, this file is not mandatory.

### Workflow
 - DataSources are regularly refreshed. When refreshed, REST responses are mapped to properties depending your configuration
 - Properties are then injected into the application state 
 - Widgets are dumb components with properties defined in the configuration and the mapped properties of the dataSources they listen to 
 - Widgets are re-rendered each time properties change

### Why dataSources ?
 - User have a total control of REST requests and how data are mapped to the application
 - No more REST client dependencies: you build your own
 - One dataSource can serve many components (no request duplication) 

## Widgets backlog
- [x] __ClockWidget__ (current date)
- [x] __BugWidget__ (Jira)
- [x] __SonkinsWidget__ (Jenkins + Sonar metrics)
- [x] __SprintWidget__ (current sprint status)
- [x] __BurndownChartWidget__ (graphical scrum burndown chart)
- [x] __VelocityWidget__ (team velocity average on last sprints, update config at end of sprint)
- [x] __ReliabilityWidget__ (team reliability average on last sprints, update config at end of sprint)
- [x] __TeamWidget__ (name and logo)
- [x] __TextWidget__ (editable text, update server config)
- [x] __MoodWidget__ (editable team mood)
- [ ] __AudioPlayerWidget__
- [ ] __HipTestWidget__ (test-run report)
- [ ] __PullRequestWidget__ (Gitlab)
- [ ] __PullRequestWidget__ (Github)
- [ ] __MediaWidget__ (Insert images, videos, sounds)
- [ ] __jenkinsMonitoringWidget__ (widget not migrating yet)
- [ ] __RadioWidget__ (shared music from server)

## Global backlog
- [x] __Provide online demo__
- [x] __Save widget position__ users can save/reset widget position in the localStorage
- [x] __Add a menu__ a menu allow to control the localStorage user settings
- [x] __Dashing theme__ add a dashing-like theme, even if ugly
- [x] __Add Jenkins pipeline__ build on commit, front + back tests, push docker images 
- [x] __Release management__ release 1.0.0 is out !
- [ ] __OpenShift__ pipeline + dedicated podTemplate + deploymentConfig
- [ ] __Better logging__ front & back
- [ ] __Add documentation__ 
- [ ] __Improve Startup__ break the "startup" state tree
- [ ] __DataSource Template__ dataSources should allow variables (not only global)
- [ ] __Improve WidgetFactory__ type declaration should be automatic 
- [ ] __Improve unit tests__
- [ ] __Improve RestClient__ improve error management
- [ ] __Fix React warning__  wrong way for minify/uglify for prod
- [ ] __Improve Sonkins Widget__ sonar metrics should be parameterizable
- [ ] __Dynamic widget__ ideally, make pure json configurable widget !
- [ ] __Use WebSockets__ instead of reloading config periodically, but do we really need that ?

## Build the application

### Requirements
 - Node 7
 - Java 8
 - Maven 3

### Development

Most of the time, you will work with front-end only, your best option is then to start a mocked API and start the dev
 server.

__Start the frontend__
```sh
npm run serve
```
 - __Hot reload__: works for any kind of front sources change (js, sass, html...)
 - __HMR__: sadly, HMR is still not working. Feel free to create a PR and make it working !!

__Start the mocked API__ (mock the backend)
```sh
npm run api
```
 - __On mocks change (ez-client/api/mocks)__: you need to restart the mocked API
 - __Verify all the chain without mocks__: turn off the mocked API and start the back-end

If you just work on the backend, use maven as usual. Please notice that ez-Dashing is now based on Spring-Boot 2.2 which
 bring many breaking changes, please read the [Spring Boot 2.2 Release Notes](https://github.com/spring-projects
 /spring-boot/wiki/Spring-Boot-2.2-Release-Notes) for more information.

__Build the back-end__
```sh
mvn package
```

__Start the back-end__
```sh
# Inside the ez-server directory
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# If you want to change the location of the dashboard config
mvn spring-boot:run -Dspring-boot.run.profiles=dev -Dspring-boot.run.jvmArguments="-Dspring.config.additional-location
=<YOUR_CONFIG_LOCATION>"
```
If you don't use the dev profile, the spring.config.additional-location become mandatory. Please care about the path
 which must end with a / otherwise Spring will kick you out.

__Start the back-end from IDEA Intellij__
 - __With dev profile:__ run the class `EzDashingApplication` with the vm arg -Dspring.profiles.active=dev
 - __With custom location:__ run the class `EzDashingApplication` with the vm arg -Dspring.config.additional-location
 =<YOUR_DIR>

### Production
The production build will generate a Spring Boot application by embedding the frontend inside the final fat jar. The
 frontend build must be triggered by the maven profile "prod". Without this profile, the Spring Application will not
  contain the frontend. 
```sh
# Package the application with the frontend
mvn package -P prod

# Start the application
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.config.additional-location=<YOUR_CONFIG_LOCATION>"
```

#FAQ

__Error:__ Application does not start
```
Caused by: java.io.FileNotFoundException: @project.parent.basedir@/config/local/dashboard.json
```
__Solution:__ You must first run maven to compile and do it again each time you modify the application.yml config
 because maven is in charge to generate some keys, @project.parent.basedir@ in this case.
```sh
mvn compile
```

## Browser compatibility: 
 - __Chromium__ : good (only last version tested)
 - __Firefox__ : good (only last version tested)
 - __Safari__ : not tested
 - __Internet Explorer__ not tested

# License
__ez-Dashing__ is licensed under the [Apache 2 license](/LICENSE).

# Screenshots

![Screenshot](/doc/img/screenshot1.png)

![Screenshot](/doc/img/screenshot2.png)

![Screenshot](/doc/img/screenshot3.png)

![Screenshot](/doc/img/screenshot4.png)

![Screenshot](/doc/img/screenshot5.png)
