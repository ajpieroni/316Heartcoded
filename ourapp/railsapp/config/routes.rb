Rails.application.routes.draw do
  resources :faqs
  # namespace :api do
  #   post '/send_timeslot_confirmation_email', to: 'api#send_timeslot_confirmation_email'
  # end

  namespace :api do
    get '/timeslots/condensed_timeslots', to: 'timeslots#condensed_timeslots'
    resources :admin_messages
    resources :line_statuses
    resources :user_timeslots, defaults: { format: :json } do
        member do
          put 'update_status_by_timeslot/:timeslot_id', action: 'update_status_by_timeslot', as: 'update_status_by_timeslot'
        end
    end
    resources :timeslots, defaults: { format: :json }
    resources :users, defaults: { format: :json }
    resources :confirmation_mail
    get '/current_user', to: 'users#current_user'
    get '/users', to: 'users#index'
    get '/users/find_by_unique_id/:unique_id', to: 'users#find_by_unique_id'
    get '/user_timeslots/find_by_user_id/:user_id', to: 'user_timeslots#find_by_user_id'
    put '/timeslots/:id', to: 'timeslots#update_count'
    post '/fetch_asset_ids', to: 'sclogic_package_infos#fetch_asset_ids'
    put '/user_timeslots/find_by_user_id/:user_id/update_status', to: 'user_timeslots#update_status'
    get '/confirmation_email/:unique_id/:timeslot_id', to: 'mail#confirmation_email'
    get '/cancellation_email/:unique_id/:timeslot_id', to: 'mail#cancellation_email'
    post '/contact_us_email/:unique_id', to: 'mail#contact_us_email'
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
