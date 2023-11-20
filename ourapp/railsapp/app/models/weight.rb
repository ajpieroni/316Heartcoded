class Weight < ApplicationRecord
  belongs_to :test_user
  belongs_to :category
  
  def calculate_weight(test_user_id, cateogry_id)
    user_answers = Answer.where(test_user_id: test_user_id)
                          .joins(question: :category) #returns all answers that have questions that have categories (inner join)
                          .where('categories.id' => category_id)

    return 0 if user_answers.empty?

    sum_of_answers = user_answers.sum(:answer)
    number_of_questions = user_answers.count

    # calculate weight by dividing sum of answers by number of questions * 10
    self.weight = sum_of_answers.to_f / (number_of_questions * 10)
    self.save
  end

  def calculate_feedback(test_user_id, category_name)
    feedback_entries = Feedback.where(receives_uid: test_user_id, category: category_name)

    average_feedback = feedback_entries.average(:feedback) / 10

    if average_feedback.nil?
      self.feedback = nil
    else
      self.feedback = average_feedback.to_f
    end

    self.save
  end
end
