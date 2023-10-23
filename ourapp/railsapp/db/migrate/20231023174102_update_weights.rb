class UpdateWeights < ActiveRecord::Migration[7.0]
  def change
    remove_column :weights, :one
    remove_column :weights, :two
    remove_column :weights, :three
    remove_column :weights, :four
    remove_column :weights, :five
    remove_column :weights, :six
    remove_column :weights, :seven
    remove_column :weights, :eight
    remove_column :weights, :nine
    remove_column :weights, :ten

    # Add new columns
    update_column :weights, :uid, :integer
    update_column :weights, :in_1, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :in_2, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :in_3, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :in_4, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :in_5, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :in_6, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :in_7, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :in_8, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :in_9, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :in_10, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :out_1, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :out_2, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :out_3, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :out_4, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :out_5, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :out_6, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :out_7, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :out_8, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :out_9, :decimal, precision: 4, scale: 2, default: 5.0
    update_column :weights, :out_10, :decimal, precision: 4, scale: 2, default: 5.0
    # ... continue this pattern for all other new columns you've listed
    
    # ... Remember to add the :outX columns too
  end
end

