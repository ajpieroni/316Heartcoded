class Message < ApplicationRecord
    
    before_create :set_timestamp
    # before_create :set_chat_order
  
    private
  
    def set_timestamp
      self.timestamp ||= Time.current
    end
end