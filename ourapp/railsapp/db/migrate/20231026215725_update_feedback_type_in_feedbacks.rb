class UpdateFeedbackTypeInFeedbacks < ActiveRecord::Migration[7.0]
  def up
    change_column :feedbacks, :feedback, 'integer USING CAST(feedback AS integer)'
  end

  def down
    change_column :feedbacks, :feedback, :string
  end
end
  
