class UserTimeslot < ApplicationRecord
  belongs_to :user
  belongs_to :timeslot

  after_create :decrement_timeslot_count
  after_destroy :increment_timeslot_count

  private

  def decrement_timeslot_count
    timeslot.decrement!(:count) if timeslot && timeslot.count && timeslot.count.positive?
  end

  def increment_timeslot_count
    timeslot.increment!(:count) if timeslot &&  timeslot.count
  end
end
