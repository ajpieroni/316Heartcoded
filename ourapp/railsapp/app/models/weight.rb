class Weight < ApplicationRecord
    validates :in_1, :in_2, :in_3, :in_4, :in_5, :in_6, :in_7, :in_8, :in_9, :in_10, :out_1, :out_2, :out_3, :out_4, :out_5, :out_6, :out_7, :out_8, :out_9, :out_10,
              numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }
  end  
