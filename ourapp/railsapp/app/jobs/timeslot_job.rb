class TimeslotJob

    #This class is a sidekiq job
    include Sidekiq::Job

    #Imports the gems business_time and holidays (business_times checks if a specific day is a workday and holiday imports all observed US holidays)
    require 'business_time'
    require 'holidays'
  
    def perform(start_time)
      # Sets the start and end times for creating the slots (8:30 AM EST to 5:00 PM EST)
      start_time = DateTime.parse(start_time) if start_time.is_a?(String)
      start_time = start_time.beginning_of_day + 8.hours + 30.minutes
      end_time = start_time.beginning_of_day + 16.hours
      count = 3

      # Iterate over each 10-minute interval and create the timeslots
      current_time = start_time

      #isClosed is a boolean variable designed to determine if the mail center is closed on a specific day. 

      #If the start_date (one week from tomorrow) is on a Saturday or Sunday or if start_date is a holiday, then the mail center is closed. If not the mail center is open.
      isClosed = !start_time.workday? || !Holidays.on(start_time, :duke, :observed).empty?

      #Creates the 10 minute interval timeslots, calls the private method create timeslot
      while current_time < end_time && !isClosed
        create_timeslot(current_time, count)
        current_time += 10.minutes
      end

      #Running this job midnight the next day
      job_run_time = DateTime.tomorrow.beginning_of_day

      #Run the scheduled job tomorrow and input timeslots for the following week (ADD +1.week HERE WHEN WE ACTUALLY RUN IT)
      TimeslotJob.perform_at(job_run_time, job_run_time + 1.week)
    end

    private

    def create_timeslot(start_time, count)
      return if start_time.min == 50
      end_time = start_time + 10.minutes
      timeslot = Timeslot.new(slot_start: start_time, slot_end: end_time, date: start_time.to_date, count: count, has_passed: false)
      timeslot.save
    end
  end