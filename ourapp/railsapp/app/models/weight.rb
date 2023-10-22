class Weight < ApplicationRecord
  belongs_to :test_user
  belongs_to :category
  
  def calculate_weight(test_user_id, cateogry_id)
    user_answers = Answer.where(test_user_id: test_user_id)
                          .joins(question: :category)
                          .where('categories.id' => category_id)

    return 0 if user_answers.empty?

    sum_of_answers = user_answers.sum(:answer)
    number_of_questions = user_answers.count

    # calculate weight by dividing sum of answers by number of questions * 10
    self.weight = sum_of_answers.to_f / (number_of_questions * 10)
    self.save
  end
end
