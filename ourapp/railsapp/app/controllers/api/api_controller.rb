module Api
  class ApiController < ApplicationController
    def send_timeslot_confirmation_email
      user_email = params[:user_email]
      selected_date_time = params[:selected_date_time]

      ApplicationMailer.timeslot_confirmation_email(selected_date_time).deliver_now

      render json: { message: 'Email sent successfully' }
    end
  end
end

