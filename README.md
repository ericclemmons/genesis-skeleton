# Genesis Skeleton

> Modern, opinionated, full-stack starter kit for rapid, streamlined application development.


- API-ready server powered by Express
- Streamlined workflow using GruntJS
- Instant preview with LiveReload
- Rapid prototyping using Twitter Bootstrap
- Client-side dependency management from Bower
- First-class support for AngularJS & ReactJS
- Simplified testing utlizing Karma
- Resource optimization for production
- Deployment-ready for Heroku & Nodejitsu


## Dependencies

1. NodeJS *~v0.10x*
2. Yeoman
3. Bower
4. Grunt

*The NPM dependencies can easily be installed at once via:*

- `npm install -g yo bower grunt-cli`

## Installation

From within any new or existing project directory:

- `yo genesis`

*You may be prompted to create a `package.json` first.*

Yeoman should do this for you, but be sure are project
dependencies have been installed:

- `npm install`

This will create the example Genesis Skeleton project
powered by AngularJS.


## Variants

Genesis supports several variants of the same workflow,
such as AngularJS, CoffeeScript, SEO, & ReactJS.

To install one of these variants, simply specify the `--variant`
when starting your project.

*You can find a complete list of variants in the Github repository
with the `variant/` branch prefix*


### AngularJS (Default)

AngularJS is the primary frontend framework for Genesis Skeleton and
is installed by default:

- `yo genesis`

### AngularJS SEO

The SEO variant adds PhantomJS on the server for `escape_fragment`
support, which allows your front-end app to be indexed by search engines.

- `yo genesis --variant=seo`


### ReactJS

The React variant utlizes Browserify to manage application structure
& dependencies, since it lacks a module system like AngularJS.

This works in testing, as well!

- `yo genesis --variant=react`


### CoffeeScript

The CoffeeScript variant allows the front-end portion of your app to be
written in CoffeeScript rather than Javascript.

- `yo genesis --variant=coffeescript`

*Server-side support is in the works.*


## Local Development

Most of the power comes from LiveReload support for *both* client-side &
server-side resources, including ExpressJS!

The following will compile your assets, setup your build environment,
start your server, and livereload any changes you make:

- `grunt server`

Now visit [http://localhost:3000/](http://localhost:3000/) to see everything
in motion!


## Testing

Testing is powered by Karma Test Runner, which originated for testing
AngularJS across multiple browsers, **including Internet Explorer**:

- PhantomJS
- Chrome
- ChromeCanary
- Firefox
- Safari
- Internet Explorer

### Continuous-Integration

For TravisCI & other continuous-integration tools:

- `grunt test:unit`


### Test-Driven Development

To re-run tests with each change:

- `grunt server:unit`

### End-to-End

For end-to-end, integration tests (i.e. real-world application tests) to find cross-browser
compatibility issues (e.g. using `Array.forEach`):

- `grunt server:e2e`


## Production Deployment

Deploying your project is really as simple as running on your local machine
or on a PaaS:

1. `npm install`
2. `npm start`

All dependencies (server-side & client-side) are installed in these two steps,
as well as compilation (`grunt build`) and optimization (`grunt optimize`)
of all production resources.


### Heroku

Genesis Skeleton already includes the necessary `Procfile` for you.  Setup
your new site with Heroku, and deployment is as simple as:

- `git push heroku master`

### Nodejitsu

Because Nodejitsu uses `npm pack` for deployment, the `build` folder is
ignored and not included.

Luckily, this is easy to remedy:

1. Remove `/build` from `.gitignore`
2. `git add build`
3. `git commit -m "Deploy"`
2. `jitsu deploy`


## Application Structure

This & and the Gruntfile are the two most opinionated parts of Genesis Skeleton.
It took lots of trial & error amongst dozens of projects to land on something
this versatile.

Despite that, the following structure allows enough flexibility to support
entirely different front-end frameworks, back-end servers (e.g. PHP, Python),
and compiled assets such as LESS, SASS, JSX, & CoffeeScript.


### bin/

Any scripts that may be used for provisioning or testing are placed here.

Currently, this folder only contains `browser.sh`, which is a commented
Bash script that sets up & tears down Internet Explorer VMs in VirtualBox.


### build/

This folder **is not versioned** (*unless you're deploying to Nodejitsu*),
but is simply the "public" folder in which all compiled front-end assets
are served from.

This is primarily to allow separation of orignal resources (e.g. `.less`, `.coffee` files)
from their compiled counterparts (e.g. `.css` & `.js`, respectively).

This folder is monitored by the `watch:build` task in your Gruntfile for
changes, rather than the original.

### client/

Front-end application resources and static resources reside here, including the following:

- `crossdomain.xml`: support client-side requests from other domains.
- `humans.txt`: list of authors & technologies used in creating the site.
- `index.html`: **static** home page that manages client-side dependencies.


#### app/

The primary entry-point from `index.html` is:

- `app.js`

Originally, all application-specific resources existed in the `client/` root,
but it turns out that during the development process, you usually abstract away
common components.

So, this extra folder allows you to move commonalities to other folders
(e.g. `common/`, `github-api/`, etc.) for eventual creation of, say, a new
Bower component.

It's recommended to use *one file, one namespace, per responsibility* from
this point forward:

```
app/
    scripts/
        controllers/
            home.js
        services/
            api.js
    styles/
        app.less
    templates/
        home.html
    test/
        unit/
            controllers/
                home.spec.js
```


##### scripts/

All dependencies of `app.js` above will reside in this folder structure.

##### styles/

The primary entry-point is:

- `app.less`

It is recommended that this file not contain hardly any styling definitions
at all, but instead uses `@import "..."` to bring in other stylesheets based
on their responsibility (e.g. `print.less`, `grids.less`, `widget.less`)


##### templates/

All of your application templates will reside here, as AngularJS **templates
are automatically compiled & concatenated into a single file** to reduce
HTTP requests!

For example, the file at `app/templates/home.html` will automatically be
available in `$templateCache` under the key `app/templates/home.html`.

(*If you use ReactJS, then this may be called `components/`, to keep with
naming conventions.*)


##### tests/

Both unit (`unit`) and integration/end-to-end (`e2e`) tests will reside here.

It's preferential for the sub-paths to match the path of the original, except
with `.spec` appended to the basename.

For example, the file at `app/scripts/controllers/home.js` should have a test
located at `app/tests/unit/controllers/home.spec.js`.

This helps when navigating by directory and when searching in tools like
SublimeText.


### server/

The folder structure here follows the normal NodeJS-style naming conventions:
use `lib` for internal libraries/tools, namespace logical portions of the app
separately, etc.

However, it is important to note that the application & server aspects have
been decoupled to work effectively with Grunt & LiveReload!

### app.js

This is where the instantiation & exporting of your ExpressJS application occurs.

### server.js

This should do nothing more than start the server using `app.js`.


### Gruntfile.coffee

The Gruntfile is the powerhouse of Genesis Skeleton, mixing strong conventions,
organization, and a curated set of plugins to manage your workflow.

Remember, the primary function of the Gruntfile is to **compile all resources into the `build/` and efftively
serve/reload them**.

Each task tends to build upon one or more other tasks, creating a "waterfall" of
actions being ran.  Because of this, each task is highly-compartmentalized
and decoupled from other, similar tasks, for maximum flexibility amongst
variants.

(*Note that the tasks are arranged alphabetically for easier navigation.*)


#### Tasks

The first part of the Gruntfile lists out several `grunt.registerTask` commands
with comments for you to see exactly how they operate & fit into your workflow.

A single task on its own will probably not be very descriptive how it fits
into the workflow, but if you start with `grunt server`, for example, you will
see the following chain occur:

- `build`, which triggers:
    - `clean`, which removes `build/`
    - `jshint`, which validates all `.js` files
    - `copy`, which moves static files to `build/`
    - `ngtemplates`, which concatentates client-side templates into `build/
    - `less`, which compiles `app.less` into `app.css` in `build/`
- `express`, which starts the ExpressJS server
- `watch`, which re-runs specific `build` targets when a file changes, followed by a LiveReload

Each task serves a specific purpose with as little overlap as possible.
The end result should be a itemized changes in `build/` that are LiveReloaded
during development, or re-tested during testing.


#### Constants

The Gruntfile utilizes both directory (e.g. `BUILD_DIR`, `CLIENT_DIR`) and
file (e.g. `CSS_FILES`, `JSX_FILES`) constants so you can freely change
your application structure without having to redo the entire Gruntfile.

Plus, this significantly increases readability.


### karma.conf.js

This houses the generic configuration for Karma, such as the CLI output,
default browsers, ports, and settings not available via Grunt.

You can test out this configuration alone by running:

- `karma start`


## License

MIT

