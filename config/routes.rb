Rails.application.routes.draw do

  devise_for :users
  root to: 'messages#index'
  get "/users/search" => "users#search"
  post "/friendships" => "friendships#create"
  delete "/friendships/:id" => "friendships#destroy"
  # apiのルート
  namespace :api , {format: 'json'} do
    get "/users/search", :to=> "users#search"
    post "/messages/upload_image", :to=> "messages#upload_image"
    resources :messages, :users, :friendships
  end

  get "users/:id" => "users#show", as: "user"

end
