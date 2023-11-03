class Weight < ApplicationRecord
    validates :in_1, :in_2, :in_3, :in_4, :in_5, :in_6, :in_7, :in_8, :in_9, :in_10, :out_1, :out_2, :out_3, :out_4, :out_5, :out_6, :out_7, :out_8, :out_9, :out_10,
              numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }
  end  
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
end
