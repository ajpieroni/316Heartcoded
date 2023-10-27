class Password < ApplicationRecord
  belongs_to :test_user

  def self.create_password(user, plain_text_password)
    password = BCrypt::Password.create(plain_text_password)
    #test_user.passwords.create(hashed_password: password)
  end

end
