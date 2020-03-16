class CreateQuests < ActiveRecord::Migration[5.2]
  def change
    create_table :quests do |t|
      t.integer :party_id
      t.integer :user_id
      t.text :title, limit: 64
      t.text :description
      t.text :status
      t.integer :mentor_id
      t.timestamp :date_finished

      t.timestamps
    end
  end
end
