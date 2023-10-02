class CreateLineStatuses < ActiveRecord::Migration[7.0]
  def change
    create_table :line_statuses do |t|
      t.string :admin
      t.string :color

      t.timestamps
    end
  end
end
