Rails.application.routes.draw do


  get 'users/show'

  get 'users/edit'

  devise_for :users
  # apiのルート
  namespace :api , {format: 'json'} do
  	resources :messages
  end


  resources :messages
  root to: 'messages#index'
end
