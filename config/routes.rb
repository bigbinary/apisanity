Apisanity::Application.routes.draw do

  devise_for :users, path_prefix: 'devise', controllers: { registrations: 'registrations' }

  # Authentication
  devise_scope :user do
    get '/login' => 'devise/sessions#new', as: :login
    get '/logout' => 'sessions#destroy', :as => :logout
    get '/signup' => 'registrations#new', :as => :signup
    scope 'my' do
      get 'profile', to: 'registrations#edit'
      put 'profile/update', to: 'registrations#update'
      get 'password/edit', to: 'registrations#edit_password'
      put 'password/update', to: 'registrations#update_password'
    end
  end

  unauthenticated do
    get '/logout' => redirect('/')
  end

  authenticate :user, ->(u) { u.super_admin? } do
    get '/delayed_job' => DelayedJobWeb, :anchor => false
    put '/delayed_job' => DelayedJobWeb, :anchor => false
    post '/delayed_job' => DelayedJobWeb, :anchor => false

    ActiveAdmin.routes(self)
    namespace :superadmin do
      root to: 'users#index'
      resources :users
    end
  end

  get 'pages/about'
  get 'pages/contact_us'
  resources :contacts, only: [:create]

  authenticated :user do
    resources :api_requests do
      collection do
        post :build
      end
    end
  end

  unauthenticated do
    as :user do
      root :to => 'devise/sessions#new', as: :unauthenticated_root
    end
  end

  resources :api_responses, only: [:show, :create, :index, :update]


  root 'api_requests#index'
end
