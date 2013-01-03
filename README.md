Genesis Skeleton
================

Modern application skeleton:

* [HTML5 Boilerplate][1]
* [AngularJS][2]
* [Express][3]
* [Grunt][4]
* [LiveReload][5]
* [Bootstrap][6]
* [Bower][8]


Requirements
------------

    $ npm install -g grunt-cli


Installation
------------

    $ git clone git@github.com:ericclemmons/genesis-skeleton.git my-project
    $ cd my-project
    $ npm install


Usage
-----

Start an [Express][3] server with [LiveReload][5]:

    $ grunt server


Customize
---------

- `src/client/crossdomain.xml`
- `src/client/humans.txt`


Deployment (with [Heroku][7])
------------------------

1 - Create the server

    $ heroku create
    $ heroku config:add NODE_ENV=production
    $ heroku keys:add ~/.ssh/id_rsa.pub

2 - Deploy

    $ git push heroku master

3 - Profit!

    $ heroku open


License
-------

MIT


[1]: http://html5boilerplate.com/
[2]: http://angularjs.org/
[3]: http://expressjs.com/
[4]: http://gruntjs.com/
[5]: http://livereload.com/
[6]: http://twitter.github.com/bootstrap/
[7]: https://toolbelt.heroku.com/
[8]: http://twitter.github.com/bower/
