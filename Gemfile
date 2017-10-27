source 'https://rubygems.org'

ruby '2.3.0'

gem 'rails', '~> 5.1.0.beta1'

# friends of Rails
gem 'jquery-rails'
gem 'sprockets-rails'
gem 'sass-rails', '>= 5.0.3'
gem 'uglifier', '>= 2.7.1'

# database
gem 'pg'

# for building JSON
gem 'jbuilder', '>= 2.2.13'

# for authentication
gem 'devise' , '~> 4.2.0'

# for background job processing
gem 'delayed_job_active_record'

# For dependency resolution of 'delayed_job_web' gem
# More info - https://github.com/ejschmitt/delayed_job_web/issues/8
gem 'sinatra', github: 'sinatra/sinatra'
gem 'rack-protection', github: 'sinatra/sinatra'

# web interface for delayed job
gem 'delayed_job_web', '>= 1.2.10'

# For starting Delayed job background process
gem 'daemons'

# collection of handy tools
gem 'handy'

# for error tracking
gem 'rollbar'

# for using bootstrap framework
gem 'bootstrap-sass', '~> 3.3.3'

# for using font-awesome
gem 'font-awesome-sass', '~> 4.3.0'

# forms made easy for rails
gem 'simple_form'

# for webpack
gem 'webpacker', github: 'rails/webpacker'


gem 'activeadmin', git: 'https://github.com/activeadmin/activeadmin.git'
gem 'inherited_resources', github: 'activeadmin/inherited_resources'

# for handling file uploads
gem 'carrierwave'

# for CarrierWave to upload files to cloud storage like Amazon S3
gem 'fog', require: false

# for logging to work in heroku
gem 'rails_12factor', group: [:staging, :production]

# for email validation
gem 'email_validator'

# haml as templating engine
gem 'haml-rails'

# intercepts outgoing emails in non-production environment
gem 'mail_interceptor', group: [:development, :staging]

# Adds prefix to subject in emails
gem 'email_prefixer'

# Attach comments to Active Record queries
gem 'marginalia', github: 'basecamp/marginalia'

gem 'excon'
gem 'sanitize-url', git: 'https://github.com/jarrett/sanitize-url.git', branch: 'master'

group :development do
  gem 'pry-rails'
    # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '~> 3.0'
  gem 'listen', '~> 3.0.5'

  # reports N+1 queries
  gem 'bullet'

  # for better errors
  gem 'better_errors'
end

group :test do
  gem 'mocha'
  # customizable MiniTest output formats
  gem 'minitest-reporters', require: false
  # for test coverage report
  gem 'simplecov', require: false
end

gem 'boxy-cap', github: 'bigbinary/boxy-cap'
gem 'capistrano'
gem 'capistrano-rbenv'
gem 'capistrano-rails', github: 'capistrano/rails'
gem 'capistrano-bundler'
gem 'capistrano-npm'
gem 'sshkit'

# application server
gem 'puma', '~> 3.2'

# To enable CORS requests
gem 'rack-cors', :require => 'rack/cors'
