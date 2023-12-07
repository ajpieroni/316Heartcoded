Rails.application.routes.draw do
  get 'password_resets/edit'
  get 'password_resets/update'
  # Define all RESTful resources
  resources :answers
  resources :weights
  resources :passwords
  resources :categories
  resources :questions
  # resources :messages
  resources :faqs
  resources :matched_withs
  resources :states
  resources :feedbacks do
    collection do
      get 'find_feedback'
    end
  end

  resources :password_resets, only: [:edit, :update]
  post 'password/forgot', to: 'password_resets#forgot'
  post 'password/reset', to: 'password_resets#reset'
  post 'password/confirm-code', to: 'password_resets#confirm_code'

  # Define all RESTful routes for test_users and custom member/collection routes
  resources :test_users do
    member do
      get 'messages'
      post 'messages', to: 'test_users#create_message'
      patch 'update_password', to: 'test_users#update_password'
    end
    collection do
      get 'find_by_username', to: 'test_users#find_by_username'
      get 'find_by_username/:username', to: 'test_users#find_by_username'
      get 'find_by_email/:email', to: 'test_users#find_by_email', constraints: { email: /[^\/]+/ }
      get 'check_username', to: 'test_users#check_username'
      post 'authenticate', to: 'test_users#authenticate'
    end
  end

  # Define custom routes outside of the resources block
  get 'unmatch/:uid1/:uid2', to: 'matched_withs#unmatch'
  get 'match/:id', to: 'test_users#find_matches'
  get 'matched_withs/users/:id', to: 'matched_withs#by_user_id'
  get 'unanswered_questions/:id', to: 'questions#unanswered_questions'
  get 'messages_between/:user1_id/:user2_id', to: 'messages#messages_between'
  get 'answered_questions_count/:id', to: 'questions#answered_questions_count'
  get 'user_most_valued_category/:id', to: 'weights#user_most_valued_category'
  get 'user_least_valued_category/:id', to: 'weights#user_least_valued_category'
  get 'user_most_valued_feedback/:id', to: 'weights#user_most_valued_feedback'
  get 'user_least_valued_feedback/:id', to: 'weights#user_least_valued_feedback'
  get 'num_matches_historic/:id', to: 'matched_withs#num_matches_historic'
  get 'num_unmatches/:id', to: 'matched_withs#num_unmatches'
  get 'messages/num_messages_sent/:uid_sender_id', to: 'messages#num_messages_sent'
  get 'messages/num_messages_gotten/:uid_receiver_id', to: 'messages#num_messages_gotten'
  get 'messages/top_three_messaged_users/:uid_sender_id', to: 'messages#top_three_messaged_users'
  get 'messages/top_three_mess_users/:uid_receiver_id', to: 'messages#top_three_mess_users'

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
