# ez-Dashing

__ez-Dashing__ is a customizable free dashboard tool for agile development team. The project is very young but in active development.

I contribute to this project during my free time, I am aware that many things could be improved. Feel free to add your contribution !

 - __Responsive__
 - __Configurable__
 - __Ready to use__
 
# Tech stack

 - React 16
 - Redux 3
 - Webpack 3
 - Spring Boot 1.5
 - Maven
 - Docker 


# Demo

- __From sources__
```
./ez.sh start-demo
```
- __From Docker Hub__
```
docker run --rm -it -p 2222:2222 --name ez-demo -t ylacaute/ez-dashing:demo
```
Go on [http://localhost:8080](http://localhost:8080)

# Production

- __From sources__
```
./ez.sh start-prod /YOUR/CONFIG/DIR
```
- __From Docker Hub__
```
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
- [ ] __DataSource Template__ DataSources should allow variables (not only global)
- [ ] __Theme system__ Need to configure Webpack correctly to generate many css output
- [ ] __Add documentation__ 
- [ ] __Improve unit tests__


## Build the application

### Requirements
 - Node 7
 - Java 8
 - Maven 3

__Build front and back-end from source__ (with production profile)
```
./ez.sh build-prod
```
__Run the server__ 
```
./ez.sh start-prod <CONFIG_DIRECTORY>
```

More options in ez.sh.

# General Todos
 - Fix React warning in front build (wrong way for minify/uglify for prod)
 - Add a Dashing color theme (black theme not always good)
 - Use Travis-CI for this project
 - Add documentation on widgets configuration
 - Plugin system
 - Improve error management
 
# Widget system not fixed
 - Could Widget dependency management be interesting ?
   - Client API could be invisible Widget and make event listened by any other widget
   - But configuration must stay as simple as possible
 - How generic a widget should be ? 
 
# Browser compatibility: 
 - __Chromium 57__ : good
 - __Firefox 52__ : bad
 - __Safari__ : not tested
 - __Internet Explorer__ not tested

# License
 - ez-Dashing is licensed under the [Apache 2 license](/LICENSE).

# Screenshots

![Screenshot](/ez-client/screenshot.png)

