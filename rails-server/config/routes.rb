Rails.application.routes.draw do
  resources :todos do
    resources :items
  end

  resources :users

  post "/user", to: "users#return_user"

  resources :parties
  
  # Old way of routing, lots of nested routes
  # resources :quests do
  #   resources :nodes do
  #     resources :posts do
  #       resources :comments
  #     end
  #   end
  # end

# New way of routing, routes are only nested 1 level
# Should make each table more accesscible without changing functionality
resources :quests do
  resources :nodes
end

resources :nodes do
  resources :posts
end

resources :posts do
  resources :comments
end

  get "/quest/:quest_id/nodes", to: "nodes#quest_nodes"
  get "/node/:node_id/posts", to: "posts#node_posts"
  get "/post/:post_id/comments", to: "comments#post_comments"

  post "/user_quests", to: "quests#user_quests"
  post "/party_quests", to: "quests#party_quests"

  resources :quest_object, controller: "quests", only: [:object]

  get "/quest_object/:id", to: "quests#object"

end