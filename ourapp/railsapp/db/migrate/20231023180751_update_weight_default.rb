class UpdateWeightDefault < ActiveRecord::Migration[7.0]
  def change
    change_column :weights, :in_1, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :in_2, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :in_3, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :in_4, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :in_5, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :in_6, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :in_7, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :in_8, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :in_9, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :in_10, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :out_1, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :out_2, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :out_3, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :out_4, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :out_5, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :out_6, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :out_7, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :out_8, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :out_9, :decimal, precision: 4, scale: 2, default: 5.0
    change_column :weights, :out_10, :decimal, precision: 4, scale: 2, default: 5.0
  end
end
