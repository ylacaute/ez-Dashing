[![Build Status](http://jk.thorpora.fr/buildStatus/icon?job=ez-dashing/master)](http://jk.thorpora.fr/job/ez-dashing/job/master/)

# <img src="/ez-client/src/main/resources/img/tech/ezLogo.png" width="100" alt="ez-Dashing"> ez-Dashing

__ez-Dashing__ is a customizable free dashboard tool for agile development team. The project is very young but in active development. I contribute to this project during my free time, I am aware that many things could be improved. Feel free to contribute !

**Guidelines**

 - Responsive
 - Configurable
 - Ready to use
 
 **Tech Stack**

<img src="/ez-client/src/main/resources/img/tech/react.png" alt="React" title="React 16" width="50px"/><img src="/ez-client/src/main/resources/img/tech/redux.png" alt="Redux" title="Redux" width="50px"/><img src="/ez-client/src/main/resources/img/tech/sass.png" alt="SASS" title="SASS" width="50px"/><img src="/ez-client/src/main/resources/img/tech/webpack.png" alt="Webpack" title="Webpack 3" width="50px"/><img src="/ez-client/src/main/resources/img/tech/springboot.png" alt="Spring boot" title="Spring boot 1.5" width="50px"/><img src="/ez-client/src/main/resources/img/tech/maven.png" alt="Maven" title="Maven" width="50px"/><img src="/ez-client/src/main/resources/img/tech/docker.png" alt="Docker" title="Docker" width="50px"/>

# Demo

## Online

The online demo shows a running dashboard (release 1.0.0) configured to consume online public API (without authentication).
Go on [http://demo.thorpora.fr/ez-dashing/](http://demo.thorpora.fr/ez-dashing/)

## From Docker Hub

The docker demo show a running dashboard (development build) configured to consume a mocked API. This demo is
more complete because there are mocks for everything.
```sh
docker run --rm -it -p 8081:8081 --name ez-demo -t ylacaute/ez-dashing:demo
```
The first screenshots below is exactly what you should see.

Go on [http://localhost:8081](http://localhost:8081)


# Production

You can directly start to use __ez-Dashing__ by pulling the production docker image. You just have to define your json configuration.

## From Docker Hub
```sh
docker run --rm -itp 8080:8080 --name ez-dashing -v /ABSOLUTE/PATH/TO/CONFIG/DIR:/ez-config  ylacaute/ez-dashing:latest
```
Go on [http://localhost:8080](http://localhost:8080)

__Please note that your config directory:__
 - MUST be in absolute path for Docker
 - MUST contains 'server.properties' and 'dashboard.json' (check sample config directory in the project)

## From sources

**DEPRECATED**

If you need ez-Dashing in production but without Docker, you will have to package it manually. 

```sh
# BUILD FOR PRODUCTION
./ez.sh build-prod

# START FOR PRODUCTION (LOCAL)
./ez.sh start-prod <dir>

# More options here
./ez.sh -h
```

If this not satisfy your needs, you will maybe have to create scripts by yourself.

**But keep in mind you should have no reason to start server like that, please use Docker for production.**

# Documentation

## Overview

### Front configuration
Define a [dashboard.json](/config/dashboard.json) configuration file, composed of the sections below:
 - **env:** global variables which can be used anywhere in the configuration
 - **server:** server config, you currently can't touch this part
 - **theme:** choose your favorite theme ("default", "black", etc)
 - **dataSources:** refreshable dataSources making REST call and mapping the result to properties
 - **widgets:** your widgets, usually attached to one or many dataSources. See widgets backlog to see available widgets.
 - **avatars:** declare some avatars for your team
 - **thresholds:** define the thresholds values which will impact the CSS rules 
 - **grid:** mainly responsive configuration parameters of the grid

### Server configuration
You define an [server.properties](/config/server.properties) server configuration file:
 - **empty by default:** this file must exist but can stay empty. It allow you override the default Spring boot configuration.

### Workflow
 - DataSources are regularly refreshed. When refreshed, REST responses are mapped to properties depending your configuration
 - Properties are then injected into the application state 
 - Widgets are dumb components with properties defined in the configuration and the mapped properties of the dataSources they listen to 
 - Widgets are re-rendered each time properties change

### Why dataSources ?
 - User have a total control of REST requests and how data are mapped to the application
 - No more REST client dependencies : you build your own
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
- [ ] __Add documentation__ 
- [ ] __Improve Startup__ break the "startup" state tree
- [ ] __DataSource Template__ dataSources should allow variables (not only global)
- [ ] __Improve WidgetFactory__ type declaration should be automatic 
- [ ] __Improve unit tests__
- [ ] __Improve RestClient__ improve error management
- [ ] __Fix React warning__  wrong way for minify/uglify for prod
- [ ] __Improve Sonkins Widget__ sonar metrics should be parameterizable
- [ ] __Dynamic widget__ ideally, make pure json configurable widget 
- [ ] __Use WebSockets__ instead of reloading config periodically
- [ ] __Use Docker compose__ do we really need docker-compose ?

## Build the application

### Requirements
 - Node 7
 - Java 8
 - Maven 3

### Development

Most of the time, you will work with front-end only. So your best option is to start a mocked API and start the dev server.

__Start the dev server (hot reload)__
```sh
npm run serve
```
 - **Hot reload**: works for any kind of front sources change (js, sass, html...) 

__Start the mocked API__ (mock the backend)
```sh
npm run api
```
 - **On mocks change (ez-client/api/mocks)**: you need to restart the mocked API
 - **Verify all the chain without mocks**: turn off the mocked API and start the back-end

__Start the back-end server__ (dev)
```sh
./mvnw spring-boot:run -Dspring.config.location=file:/your/path/to/server.properties -Dspring.profiles.active=dev
```
 - **Profile dev**: logs are in DEBUG.
 - **Profile prod**: logs are in INFO and only in ez-dashing.log (not in console), in the same directory as the configuration.
 - **On dashboard.json change**: you need to restart the server.

## Browser compatibility: 
 - __Chromium__ : good
 - __Firefox__ : average 
   - SVG mask is not implemented yet in FF despite it is W3C compliant
   - Performance problem with React Grid Layout
   - Bug on flex display
 - __Safari__ : not tested
 - __Internet Explorer__ not tested

# License
__ez-Dashing__ is licensed under the [Apache 2 license](/LICENSE).

# Screenshots

![Screenshot](/ez-client/screenshot.png)

![Screenshot](/ez-client/screenshot2.png)

![Screenshot](/ez-client/screenshot3.png)

