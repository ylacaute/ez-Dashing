# ez-Dashing

__ez-Dashing__ is customizable free dashboard tool, build with React and Spring Boot, for agile development team.

The project is very young but in active development. All contributions are welcome.

# Features
 - __Responsive__ (all supports, also on huge screens with scaling SVG)
 - __Configurable__ (grid, widgets, avatars, metric thresholds...)
 - __Ready to use__ (no plugin system, Docker ready)

# Demo

- __From sources__
```
./ez.sh start-demo
```
- __From Dock Hub__
```
docker run --rm -it -p 2222:2222 --name ez-demo -t ylacaute/ez-dashing:demo
```
Go on [http://localhost:2222](http://localhost:2222)

# Production

- __From sources__
```
./ez.sh start-prod /YOUR/CONFIG/DIR
```
- __From Dock Hub__
```
docker run --rm -itp 8080:8080 --name ez-dashing -v /ABSOLUTE/PATH/TO/CONFIG/DIR:/ez-config  ylacaute/ez-dashing:latest
```

Go on [http://localhost:8080](http://localhost:8080)

__Please note that your config directory:__
 - MUST be in absolute path for Docker
 - MUST contains 'server.properties' and 'dashboard.json' (sample in project)

# Build the application

## Requirements
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
 
# Widgets
- [x] __IssuesWidget__ (jira)
- [x] __ClockWidget__ (current date)
- [x] __jenkinsMonitoringWidget__ (jenkins health)
- [x] __SonkinsWidget__ (jenkins + sonar metrics)
- [x] __SprintWidget__ (Scrum sprint progression)
- [x] __TeamWidget__ (team name and logo)
- [ ] __GraphWidget__ [DEV] (Animated graph keeping small value history)
- [ ] __PullRequestWidget__ (Gitlab, Github)
- [ ] __TextWidget__ (scrolling text)
- [ ] __MediaWidget__ (Insert images, videos, sounds)
- [ ] __Sonkinswidget__ (weather icon ?)
 
# General Todos
 - Add documentation on widgets configuration
 - Add a Dashing color theme
 - Plugin system
 - Improve error management
 
# Browser compatibility: 
 - __Chromium 57__ : good
 - __Firefox 52__ : bad
 - __Safari__ : not tested
 - __Internet Explorer__ not tested

# License
 - ez-Dashing is licensed under the [Apache 2 license](/LICENSE).

# Screenshots

![Screenshot](/ez-client/screenshot.png)

