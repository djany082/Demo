require 'sidekiq/web'

Rails.application.routes.draw do
  resources :room_messages
  resources :rooms
  namespace :admin do
    resources :users

  #root to: "users#index"
  end
  get '/privacy', to: 'home#privacy'
  get '/terms', to: 'home#terms'
  get '/admin-dashboard', to: 'rooms#index'
    authenticate :user, lambda { |u| u.admin? } do
      mount Sidekiq::Web => '/sidekiq'
    end


  resources :notifications, only: [:index]
  resources :announcements, only: [:index]
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  root to: 'home#index'
  #root controller: :rooms, action: :index
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
