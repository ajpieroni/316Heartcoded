Rails.application.routes.draw do
  resources :answers
  resources :weights
  resources :passwords
  resources :categories
  # resources :messages
  resources :questions
  resources :faqs
  resources :matched_withs
  
  # Consolidate test_users resource
  resources :test_users do
    member do
      get 'messages'
      post 'messages', to: 'test_users#create_message'
    end
    # Custom collection route
    collection do
      get 'find_by_username/:name', to: 'test_users#find_by_username'
      get 'find_matches/:id', to: 'test_users#find_matches'
    end
  end
  
  resources :states
  resources :feedbacks do
    collection do
      get 'find_feedback'
    end
  end
  
  # Define custom routes for matched_withs
  get 'unmatch/:uid1/:uid2', to: 'matched_withs#unmatch'
  get 'matched_withs/users/:id', to: 'matched_withs#by_user_id'
  
  # Custom routes for passwords
  get 'passwords/:id', to: 'passwords#show'
  post '/passwords', to: 'passwords#create'
  
  # Custom routes for questions
  get 'questions/unanswered_questions/:id', to: 'questions#unanswered_questions'

  # Route for Sidekiq Web UI
  require "sidekiq/web"
  mount Sidekiq::Web => "/sidekiq"

  # Uncomment or add other routes as needed...

  # Define the root path route ("/")
  # root "articles#index"
end
