[![CircleCI](https://circleci.com/gh/bigbinary/apisanity.svg?style=svg&circle-token=6fc6afcefa3fb1ba7241b6095df210fef01205ea)](https://circleci.com/gh/bigbinary/apisanity)

#### Intro video

[https://vimeo.com/212195510](https://vimeo.com/212195510)

#### Setup

```
bundle install
cp config/database.yml.postgresqlapp config/database.yml
rake setup
npm install
bin/webpack-dev-server # only for development
bundle exec rails server
```

After starting the server see wiki to get some apis that you can hit.

#### Configuration for Heroku Review Apps

- For branches auto deployed using `Heroku Review Apps` you need to env mentioned in app.json as `required` on the 
parent app in the `settings` tab. Only exception is `ENV['HEROKU_APP_NAME']`, this is set by heroku.

#### Configuration for Heroku(no review apps)

- Set necessary environment variables.
- Set `ENV['HEROKU']` as true, used to determine that we are deploying to heroku and helps with config rails accordingly. 
- Add `heroku-postgresql` addon to the app.
- Add following buildpacks. First is use to run `npm install` and second for `bundle install`

```
$ heroku buildpacks:add https://github.com/heroku/heroku-buildpack-nodejs.git
$ heroku buildpacks:add https://github.com/heroku/heroku-buildpack-ruby.git
```
 
#### Steps to take care before merging to master.

- Install Heroku Repo Plugin from [here](https://github.com/heroku/heroku-repo#installation)
- Run `heroku repo:purge_cache -a apisanity`
- Merge to master.

This would help in deploying to master when PR is merged without any hassle.


### Deployment to production

The production version is hosted at DigitalOcean. 
When a PR is merged then commit is also pushed to production branch using gitemit.
Shipit is enabled for deployment to production.
