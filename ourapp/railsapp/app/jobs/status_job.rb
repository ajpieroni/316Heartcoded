class StatusJob
    include Sidekiq::Job
    
    def perform
        today = Date.today.beginning_of_day
        isClosed = !today.workday? || !Holidays.on(today, :duke, :observed).empty?
        if !isClosed && (Time.current >= today + 16.hours + 30.minutes)
            current_day = (today + 8.hours)..(today + 17.hours)
            scheduled_user_timeslots = UserTimeslot.where(status: "scheduled").where(selected_date_time: current_day)
            scheduled_user_timeslots.update_all(status: "unmarked")
            AdminMessage.new(admin: "default",message: "We are now closed. Our hours are M-F 8:30 AM - 5:00 PM.")
            LineStatus.new(admin: "default", color: "grey")
            StatusJob.perform_at(today + 1.day + 8.hours + 30.minutes)
        elsif !isClosed && (Time.current >= 8.hours + 25.minutes)
            AdminMessage.new(admin: "default",message: "We are now open! Our hours are M-F 8:30 AM - 5:00 PM.")
            StatusJob.perform_at(today + 17.hours)
        elsif 
            StatusJob.perform_at(today + 1.day + 8.hours + 30.minutes)
        end
    end
end