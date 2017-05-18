TodoApp demo with React
=========================

This is a demo application based on React, without Redux, build with Webpack.

![Screenshot](http://thorpora.fr/wp-content/uploads/2017/01/screenshot.png)

# Stack

 * **React:** No Redux
 * **Babel:** JavaScript compiler setting up to transform ES2015 and React
 * **SASS:** Preprocessor CSS
 * **webpack:** Module bundler
   * Local server
   * Hot reloading (for all resources)
   * Compiled CSS extracted from JS
   * Relative path for include
 * **Json-server:** light API server to mock backend
 * **NPM:** Task builder
 
# Featured
 * **React**
   * No redux here, use vanilla event
 * **Archtecture** 
   * Use same Maven project structure
   * Component-oriented (but clear separation JSX/SCSS)
   * Simple REST calls (using fetch and json-server)
   * NPM as task builder
   * API REST server with json-server
   * Webpack dev server set as proxy for API calls
 * **Responsive**
   * Use SASS and some part of KNACSS
   * Use @extend, @mixin, @media
 * **Test**
   * todo !
 * **Clock widget** 
   * Just because it looks greats 🤘🤘:metal:
   
# Getting started
**Download dependencies**
```
npm i
```
**Build for dev** (build directory is 'assets')
```
npm run build
```
**Start the local dev server** (port 8080, hot reloading)
```
npm run start
```
**Start the local dev API server** (port 8081)
```
npm run start-api
```

# More options
**Build with a custom build directory**
```
npm run build -- --build-dir ../app/src/main/resources/static 
```
**Start the local dev server on custom ports**
```
npm run start-custom -- --port 5000 --api-port 5001
```
Be aware that both --port and --api-port must be set with start-custom. You need to configure the API server port because the webpack dev server acts as a proxy for API request.

**Start the local API server on custom port**
```
npm run start-api-custom -- --port 5001
```
**Build and run test**
```
npm run test
```

# Configuration
The package.json file allow you to easily change default ports with the config part.
```
  "config": {
    "dev": {
      "FRONT_PORT": "8080",
      "API_PORT": "8081"
    }
  },
```
The Webpack server is configured for acting as proxy for the API server (route /api). The proxy use the config the custom configuration set in CLI or the default one defined in package.json.

# Using existing backend server
**Development:** you can easily work on both front and back side at the same time. For example you could :
 * Checkout the front project in an **ignored directory** (.gitignore) inside your Spring Boot application
 * Start the Spring Boot app on 8081
 * Start the dev server with 8081 as API server port

**Production/integration:** the build of the front app must be customized
 * Specify the build directory of the front app in resources/static of the Spring Boot project 
 * Start your Spring Boot app as usual

[The Spring boot backend server for this TodoApp is available here.](https://github.com/ylacaute/spring-boot-todo-app)

# Todo
 * **Better build task**
   * Find a way to manage front build with maven
 * **Unit and Integration tests**
   * Jasmine ? Mocha ? Karma ? Protractor ? :feelsgood:
 * **Task edition**
   * Allow user to edit an existing task
 * **Router**
   * Back/prev from broswer should works for task filter
 * **I18N**
   * Externalize all texts
 * **Continuous Integration**
   * Build a config file for jenkins

# References (USEFULL links)
 * Webpack: [https://github.com/webpack/docs/wiki/configuration](https://github.com/webpack/docs/wiki/configuration)
 * Webpack server: [https://webpack.github.io/docs/webpack-dev-server.html](https://webpack.github.io/docs/webpack-dev-server.html)
 * Webpack copy plugin: [https://www.npmjs.com/package/copy-webpack-plugin-hash](https://www.npmjs.com/package/copy-webpack-plugin-hash)
 * Knacss css framework: [https://github.com/alsacreations/KNACSS/tree/master/doc](https://github.com/alsacreations/KNACSS/tree/master/doc)
 * React Hot loader: [https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader](https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96)

# License
MIT

<p align="center">
  <a href="http://thorpora.fr">
    <img src="http://thorpora.fr/wp-content/uploads/2015/03/thorpora4.4.png" width="300" alt="Thorpora - TodoApp with React">
  </a>
</p>
