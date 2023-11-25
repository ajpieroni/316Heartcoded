class Image < ApplicationRecord
  belongs_to :test_users
  validates :data, presence: true
end