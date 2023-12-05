class Avatar < ApplicationRecord
    belongs_to :test_user
    has_one_attached :avatar
end