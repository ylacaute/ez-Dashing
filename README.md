# ez-Dashing

__ez-Dashing__ is a customizable free dashboard tool for agile development team. The project is very young but in active development.

I contribute to this project during my free time, I am aware that many things could be improved. Feel free to contribute !

**Guidelines**

 - Responsive
 - Configurable
 - Ready to use
 
**Tech Stack**

 - React 16
 - Redux 3
 - Webpack 3
 - Spring Boot 1.5
 - Maven
 - Docker 

# Demo

Downloads dependencies as usual with npm or yarn if you want to run from sources.

- __From sources__
```bash
./ez.sh start-demo
```
- __From Docker Hub__
```bash
docker run --rm -it -p 8081:8081 --name ez-demo -t ylacaute/ez-dashing:demo
```
Go on [http://localhost:8081](http://localhost:8081)

# Production

- __From sources__
```bash
./ez.sh start-prod /YOUR/CONFIG/DIR
```
- __From Docker Hub__
```bash
docker run --rm -itp 8080:8080 --name ez-dashing -v /ABSOLUTE/PATH/TO/CONFIG/DIR:/ez-config  ylacaute/ez-dashing:latest
```

Go on [http://localhost:8080](http://localhost:8080)

__Please note that your config directory:__
 - MUST be in absolute path for Docker
 - MUST contains 'server.properties' and 'dashboard.json' (sample in project)


# Documentation

## Overview

### Front configuration
You define a _dashboard.json_ configuration file, composed of the sections below:
 - **env:** global variables which can be used anywhere in the configuration
 - **server:** server config, you currently can't touch this part
 - **dataSources:** refreshable dataSources making REST call and mapping the result to properties
 - **widgets:** your widgets, usually attached to one or many dataSources. See widgets backlog to see available widgets.
 - **avatars:** declare some avatars for your team
 - **thresholds:** define the thresholds values which will impact the CSS rules 
 - **grid:** mainly responsive configuration parameters of the grid

### Server configuration
You define an _server.properties_ server configuration file:
 - **empty by default:** this file must exit but can stay empty. It allow you override the default Spring boot configuration.

### The workflow
 - DataSources are regularly refreshed. When refreshed, REST responses are mapped to properties depending your configuration
 - Properties are then injected into the application state 
 - Widget are dumb components with properties defined in the configuration and the mapped properties of the dataSources they listen to 
 - Widgets are re-rendered each time properties change

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
- [ ] __Improve the build process__ Especially the sh/docker part
- [ ] __DataSource Template__ DataSources should allow variables (not only global)
- [ ] __Theme system__ Need to configure Webpack correctly to generate many css output
- [ ] __Add documentation__ 
- [ ] __Improve unit tests__
- [ ] __Fix React warning__  wrong way for minify/uglify for prod
- [ ] __Use Travis-CI__
- [ ] __Dynamic widget__ make pure json configurable widget 

## Build the application

### Requirements
 - Node 7
 - Java 8
 - Maven 3

__Build front and back-end from source__ (with production profile)
```bash
./ez.sh build-prod
```
__Run the server__ 
```bash
./ez.sh start-prod <CONFIG_DIRECTORY>
```
In order to verify that everything is ok, you can use the config directory of this project, linked to public online sonar and jenkins server.

More options in ez.sh:
```bash
/ez.sh -h
```

## Browser compatibility: 
 - __Chromium__ : good
 - __Firefox__ : average
 - __Safari__ : not tested
 - __Internet Explorer__ not tested

# License
 - ez-Dashing is licensed under the [Apache 2 license](/LICENSE).

# Screenshots

![Screenshot](/ez-client/screenshot.png)

![Screenshot](/ez-client/screenshot2.png)

