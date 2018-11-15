Rails.application.routes.draw do

  # apiのルート
  namespace :api , {format: 'json'} do
  	resources :messages
  end


  resources :messages
  root to: 'messages#index'
end
