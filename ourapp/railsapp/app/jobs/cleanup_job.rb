class CleanupJob
  include Sidekiq::Job

  def perform
    current_time = DateTime.current
    
    todays_timeslots = Timeslot.where("date = ?", current_time.to_date)
    passed_timeslots = todays_timeslots.where('slot_start < ?', current_time)
    passed_timeslots.update_all(count: nil, has_passed: true)

    schedule_next_execution(current_time)
  end

  private

  def schedule_next_execution(current_time)
    next_execution = current_time
    out_of_hours = next_execution.hour < 8 || next_execution.hour >= 16
    day = current_time.to_date
    if day.saturday?
      next_execution = next_execution.next_week(:monday).change(hour: 8, min: 30)
    elsif out_of_hours
      next_execution = next_execution.tomorrow.change(hour: 8, min: 30)
    else
      next_execution = current_time + 5.minutes
    end
    CleanupJob.perform_at(next_execution)
  end
  
end