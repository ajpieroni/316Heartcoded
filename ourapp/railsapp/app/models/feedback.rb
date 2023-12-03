class Feedback < ApplicationRecord
    # belongs_to :test_user
    # belongs_to :category
    after_create :update_feedback
    after_update :update_feedback
    after_destroy :update_feedback

    def update_feedback
        # puts "Category descriptor: #{self.category}"
        categoryObj = Category.find_by(descriptor: self.category)
        # puts "Category found: #{categoryObj.inspect}"

        weight = Weight.find_or_initialize_by(test_user_id: receives_uid, category_id: categoryObj.id)
        weight.calculate_feedback(self.receives_uid, self.category)
      end
end
