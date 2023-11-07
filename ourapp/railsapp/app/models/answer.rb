class Answer < ApplicationRecord
  belongs_to :test_user
  belongs_to :question
  after_create :update_weight
  after_destroy :update_weight
  after_update :update_weight

  def update_weight
    weight = Weight.find_or_initialize_by(test_user_id: test_user_id, category_id: question.category_id)
    weight.calculate_weight(test_user_id, question.category_id)
  end
end
# TODO: don't allow same user id and question id to have more than one answer
# dont ask question thats already been answered