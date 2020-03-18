class AddCompleteByColumnToNodes < ActiveRecord::Migration[5.2]
  def change
    change_table :nodes do |t|
      t.datetime :complete_by
    end
  end
end
