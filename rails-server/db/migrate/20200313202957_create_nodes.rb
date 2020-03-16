class CreateNodes < ActiveRecord::Migration[5.2]
  def change
    create_table :nodes do |t|
      t.text :title
      t.text :description
      t.boolean :is_complete?
      t.timestamp :date_finished
      t.references :quest, foreign_key: true

      t.timestamps
    end
  end
end
