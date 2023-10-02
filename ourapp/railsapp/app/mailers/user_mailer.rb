class UserMailer < ApplicationMailer
  default from: 'dukepostoffice@duke.edu' #From header that person sees

  def confirmation(user_email, timeslot, name, box_no)
    @formatted_time = timeslot.strftime("%a %b %d at %l:%M %p")
    @name = name;
    @box_no = box_no
    mail(to: user_email, subject: "Confirmation: New Package Pickup on #{@formatted_time}")
  end

  def cancellation(user_email, timeslot, name, box_no)
    @formatted_time = timeslot.strftime("%a %b %d at %l:%M %p")
    @name = name;
    @box_no = box_no
    mail(to: user_email, subject: "Cancellation: Cancelled Package Pickup on #{@formatted_time}")
  end

  def reminder(user_email, timeslot, name, box_no)
    @formatted_time = timeslot.strftime("at %l:%M %p")
    @name = name;
    @box_no = box_no
    mail(to: user_email, subject: "Reminder: Scheduled Package Pickup TODAY #{@formatted_time}")
  end

  def contact(user_email, message)
    @message = message
    @formatted_time = DateTime.now.strftime("%b %d at %I:%M %p")
    mail(to: 'akp42@duke.edu', from: user_email, subject: "Contact Form Submission at #{@formatted_time}")
  end
end

