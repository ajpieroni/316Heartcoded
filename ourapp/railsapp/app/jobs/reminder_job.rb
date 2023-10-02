class ReminderJob
    include Sidekiq::Job

    require 'business_time'

    def perform
        current_time = Time.current

        current_minutes = current_time.min
        remainder = current_minutes % 10
        rounded_time = current_time + (remainder >= 5 ? (10 - remainder).minutes : -remainder.minutes)
    
        if current_time.workday? && current_time.hour >= 8 && current_time.hour <= 16
          one_hour_from_now = rounded_time + 1.hour
          one_hour_from_now = one_hour_from_now.change(sec: 0)
          students_scheduled_in_hour = UserTimeslot.where(selected_date_time: one_hour_from_now).includes(:user, :timeslot)

          students_scheduled_in_hour.each do |current_hour_student|
            user = User.find_by(id: current_hour_student.user_id)
            email = user.email
            name = user.nickname
            box_no = user.box_no
            timeslot = current_hour_student.timeslot.slot_start
            UserMailer.reminder(email, timeslot, name, box_no).deliver_now
          end
        end

        if (current_time.workday? && current_time + 1.hour <= current_time.beginning_of_day + 17.hours)
            ReminderJob.perform_at(current_time + 10.minutes)
        elsif (current_time + 1.day).workday?
            ReminderJob.perform_at(current_time.beginning_of_day + 1.day + 8.hours)
        else
            ReminderJob.perform_at(current_time.beginning_of_day + 3.days + 8.hours)
        end

    end
end