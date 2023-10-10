class MatchedWith < ApplicationRecord
    belongs_to :user1, class_name: 'TestUser', foreign_key: 'uid1'
    belongs_to :user2, class_name: 'TestUser', foreign_key: 'uid2'
  
    validate :user1_and_user2_are_different
  
    validates :status, inclusion: { in: [true, false] }
    validates :date, presence: true
  
    def user1_and_user2_are_different
      if uid1 == uid2
        errors.add(:base, "uid1 and uid2 can't be the same")
      end
    end
  end  
