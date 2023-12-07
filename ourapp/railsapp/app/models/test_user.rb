require 'argon2'
class TestUser < ApplicationRecord
    has_many :sent_messages, class_name: 'Message', foreign_key: 'uid_sender_id'
    has_many :received_messages, class_name: 'Message', foreign_key: 'uid_receiver_id'
    # has_many :matched_withs, foreign_key: 'uid1', dependent: :destroy
    # has_many :matched_withs, foreign_key: 'uid2', dependent: :destroy
    has_many :matched_withs_as_uid1, class_name: 'MatchedWith', foreign_key: 'uid1', dependent: :destroy
    has_many :matched_withs_as_uid2, class_name: 'MatchedWith', foreign_key: 'uid2', dependent: :destroy
    validates :username, presence: true, uniqueness: { case_sensitive: false }
    validates :password_digest, length: { minimum: 6, message: 'must be at least 6 characters long and include at least one letter and one number' }
    validates :email, uniqueness: true, allow_nil: true
    has_one_attached :avatar

    def password=(new_password)
      @password = new_password
      unless password_reqs?(@password)
        errors.add(:password, 'must be at least 6 characters and include at least one letter and one number')
        return nil
      end
      self.password_digest = Argon2::Password.create(new_password)
    end

    def password_reqs?(password)
      return false unless password.length >= 6 && password.match?(/\A(?=.*[a-zA-Z])(?=.*[0-9])/)
      true
    end

    def authenticate(password)
      Argon2::Password.verify_password(password, self.password_digest)
    end

    def update_password(new_password)
      @password = new_password
      unless password_reqs?(@password)
        errors.add(:password, 'must be at least 6 characters and include at least one letter and one number')
        return nil
      end
      self.password_digest = Argon2::Password.create(new_password)
      save
    end
    
    def generate_password_token!
      self.reset_password_token = rand(100_000..999_999).to_s
      self.reset_password_sent_at = Time.current
      save!
    end
     
     def password_token_valid?
      (self.reset_password_sent_at + 4.hours) > Time.now.utc
     end
     
     def reset_password!(password)
      self.reset_password_token = nil
      self.password = password
      save!
     end
          
     
    
    def messages
        Message.where("uid_sender_id = :id OR uid_receiver_id = :id", id: id)
    end

    private

    def generate_token
      SecureRandom.hex(10)
     end

    attribute :red_flags, :string, array: true

end
