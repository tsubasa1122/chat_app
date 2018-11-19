Rails.application.routes.draw do

  devise_for :users
  root to: 'messages#index'
  get "/users/search" => "users#search"
  # apiのルート
  namespace :api , {format: 'json'} do
  	resources :messages, :users
  end
  namespace :api , {format: 'json'} do
    get "/users/search", :to=> "users#search"
  end

  get "users/:id" => "users#show", as: "user"

end
