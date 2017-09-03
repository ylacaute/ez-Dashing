# ez-Dashing

__ez-Dashing__ is a customizable free dashboard tool for agile development team. The project is very young but in active development. I contribute to this project during my free time, I am aware that many things could be improved. Feel free to contribute !

**Guidelines**

 - Responsive
 - Configurable
 - Ready to use
 
 **Tech Stack**

<img src="/ez-client/src/main/resources/img/tech/react.png" alt="React" title="React 16" width="50px"/><img src="/ez-client/src/main/resources/img/tech/redux.png" alt="Redux" title="Redux" width="50px"/><img src="/ez-client/src/main/resources/img/tech/sass.png" alt="SASS" title="SASS" width="50px"/><img src="/ez-client/src/main/resources/img/tech/webpack.png" alt="Webpack" title="Webpack 3" width="50px"/><img src="/ez-client/src/main/resources/img/tech/springboot.png" alt="Spring boot" title="Spring boot 1.5" width="50px"/><img src="/ez-client/src/main/resources/img/tech/maven.png" alt="Maven" title="Maven" width="50px"/><img src="/ez-client/src/main/resources/img/tech/docker.png" alt="Docker" title="Docker" width="50px"/>

# Demo

## From Docker Hub
```sh
docker run --rm -it -p 8081:8081 --name ez-demo -t ylacaute/ez-dashing:demo
```
Go on [http://localhost:8081](http://localhost:8081)

## From sources
You need download dependencies first in the client directory
```sh
npm i 
```
And then use the ez script
```sh
./ez.sh start-demo
```
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
 - MUST contains 'server.properties' and 'dashboard.json' (check samples config in project)

## From sources
```sh
./ez.sh start-prod /YOUR/CONFIG/DIR
```

# Documentation

## Overview

### Front configuration
You define a [dashboard.json](/config/dashboard.json) configuration file, composed of the sections below:
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

### The workflow
 - DataSources are regularly refreshed. When refreshed, REST responses are mapped to properties depending your configuration
 - Properties are then injected into the application state 
 - Widgets are dumb components with properties defined in the configuration and the mapped properties of the dataSources they listen to 
 - Widgets are re-rendered each time properties change

### Why dataSources ?
 - User have a total control of REST requests and how data are mapped to the application
 - No more REST client dependencies : you build your own !
 - One dataSource can serve many components (no request duplication) 

## Widgets backlog
- [x] __ClockWidget__
- [x] __BugWidget__
- [x] __SonkinsWidget__ (Jenkins + Sonar metrics)
- [x] __SprintWidget__
- [x] __BurndownChartWidget__
- [ ] __jenkinsMonitoringWidget__ (widget not migrating yet from ez-Dashing 0.1.0)
- [x] __TeamWidget__ (name and logo)
- [ ] __PullRequestWidget__ (Gitlab, Github)
- [ ] __TextWidget__ (scrolling text / carousel)
- [ ] __MediaWidget__ (Insert images, videos, sounds)

## Global backlog
- [ ] __Save widget position__ With the localstorage
- [ ] __Improve the build process__ Especially the sh/docker part
- [ ] __DataSource Template__ DataSources should allow variables (not only global)
- [ ] __Dashing theme__ Add a dashing-like theme (aka Smashing now)
- [ ] __Add documentation__ 
- [ ] __Improve unit tests__
- [ ] __Use Docker compose__
- [ ] __Fix React warning__  wrong way for minify/uglify for prod
- [ ] __Use Travis-CI__
- [ ] __Dynamic widget__ idealy, make pure json configurable widget 

## Build the application

### Requirements
 - Node 7
 - Java 8
 - Maven 3

### Development
__Start the mocked API__ (mock the backend)
```sh
npm run api
```
__Start the dev server (hot reload)__
```sh
npm run dev
```
__Build the back end__
```sh
mvn package
```

### Production
__Build front and back-end from script__
```sh
./ez.sh build-prod
```
__Run the server__ 
```bashsh
./ez.sh start-prod <CONFIG_DIRECTORY>
```
In order to verify that everything is ok, you can use the config directory of this project, linked to public online sonar and jenkins server.

More options in __ez.sh__
```sh
./ez.sh -h
```

## Browser compatibility: 
 - __Chromium__ : good
 - __Firefox__ : average 
 ** SVG mask is not implemented yet in FF despite it is W3C compliant
 ** Performance problem with React Grid Layout
 ** Bug on flex display
 - __Safari__ : not tested
 - __Internet Explorer__ not tested

# License
__ez-Dashing__ is licensed under the [Apache 2 license](/LICENSE).

# Screenshots

![Screenshot](/ez-client/screenshot.png)

![Screenshot](/ez-client/screenshot2.png)

