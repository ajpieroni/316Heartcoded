Rails.application.routes.draw do
  # Define all RESTful resources
  resources :answers
  resources :weights
  resources :passwords
  resources :categories
  resources :questions
  resources :faqs
  resources :matched_withs
  resources :states
  resources :feedbacks do
    collection do
      get 'find_feedback'
    end
  end

  # Define all RESTful routes for test_users and custom member/collection routes
  resources :test_users do
    member do
      get 'messages'
      post 'messages', to: 'test_users#create_message'
    end
    collection do
      get 'find_by_username/:username', to: 'test_users#find_by_username'
      get 'check_username', to: 'test_users#check_username'
    end
  end

  # Define custom routes outside of the resources block
  get 'unmatch/:uid1/:uid2', to: 'matched_withs#unmatch'
  get 'match/:id', to: 'test_users#find_matches'
  get 'matched_withs/users/:id', to: 'matched_withs#by_user_id'
  get 'unanswered_questions/:id', to: 'questions#unanswered_questions'

  # Uncomment the following if you're using these APIs and ensure their correct placement within the namespace
  # namespace :api do
  #   post '/send_timeslot_confirmation_email', to: 'api#send_timeslot_confirmation_email'
  #   get '/timeslots/condensed_timeslots', to: 'timeslots#condensed_timeslots'
  #   resources :admin_messages
  #   resources :line_statuses
  #   resources :user_timeslots, defaults: { format: :json } do
  #     member do
  #       put 'update_status_by_timeslot/:timeslot_id', action: 'update_status_by_timeslot', as: 'update_status_by_timeslot'
  #     end
  #   end
  # end
  
  # For Sidekiq Web UI
  require "sidekiq/web"
  mount Sidekiq::Web => "/sidekiq"

  # If you have other routes, they should be added here...

  # Define the root path route if necessary
  # root "controller#action"
end
