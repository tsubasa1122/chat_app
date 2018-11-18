Rails.application.routes.draw do

  devise_for :users
  # apiのルート
  namespace :api , {format: 'json'} do
  	resources :messages
  end


  resources :messages
  root to: 'messages#index'
  resources :users, only: [:show]
end
