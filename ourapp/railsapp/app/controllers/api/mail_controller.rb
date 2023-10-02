class Api::MailController < ApplicationController
  protect_from_forgery with: :null_session
  def confirmation_email
    user = User.find_by(unique_id: params[:unique_id])
    user_email = user.email
    user_name = user.nickname
    user_box_no = user.box_no
    timeslot = Timeslot.find_by(id: params[:timeslot_id]).slot_start

    if user_email
        UserMailer.confirmation(user_email, timeslot, user_name, user_box_no).deliver_now
        render json: { message: "Email sent successfully" }
    else
      render json: { error: 'No user email found' }, status: :not_found
    end
  end

  def cancellation_email
    user = User.find_by(unique_id: params[:unique_id])
    user_email = user.email
    user_name = user.nickname
    user_box_no = user.box_no
    timeslot = Timeslot.find_by(id: params[:timeslot_id]).slot_start

    if user_email
      UserMailer.cancellation(user_email, timeslot, user_name, user_box_no).deliver_now
      render json: { message: "Email sent successfully" }
    else
      render json: { error: 'No user email found' }, status: :not_found
    end
  end

  def contact_us_email
    user = User.find_by(unique_id: params[:unique_id])
    user_email = user.email
    user_name = user.nickname
    message = params[:message]

    # Call the UserMailer to send the email
    if message
      UserMailer.contact(user_email, message).deliver_now
      render json: { message: "#{message}"}
    else
      render json: { error: "Incomplete data" }, status: :bad_request
    end

  end
end
