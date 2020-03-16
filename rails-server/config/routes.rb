Rails.application.routes.draw do
  resources :todos do
    resources :items
  end

  resources :users

  resources :user, controller: "users", only: [:return_user]

  post "/user/:email", to: "users#return_user"

  resources :parties
  
  
  resources :quests do
    resources :nodes do
      resources :posts do
        resources :comments
      end
    end
  end

  resources :quest_object, controller: "quests", only: [:object]

  get "/quest_object/:id", to: "quests#object"

end