Rails.application.routes.draw do
  resources :questions
  resources :test_users
  resources :faqs
  # namespace :api do
  #   post '/send_timeslot_confirmation_email', to: 'api#send_timeslot_confirmation_email'
  # end

  namespace :api do
    # get '/timeslots/condensed_timeslots', to: 'timeslots#condensed_timeslots'
    # resources :admin_messages
    # resources :line_statuses
    # resources :user_timeslots, defaults: { format: :json } do
    #     member do
    #       put 'update_status_by_timeslot/:timeslot_id', action: 'update_status_by_timeslot', as: 'update_status_by_timeslot'
    #     end
    # end
  end
  
  require "sidekiq/web"
  mount Sidekiq::Web => "/sidekiq"

  # Add the contact_us route for form mailing
  # post '/contact_us', to: 'contacts#create'

  # Other routes...
  # Load in current user:

  # get /user_timeslots/tocsv/{startdate}/{enddate}
  # Defines the root path route ("/")
  # root "articles#index
end
