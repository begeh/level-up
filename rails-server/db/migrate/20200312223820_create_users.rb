class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.text :email, limit: 255
      t.string :name, limit: 32
      t.integer :party_id
      t.string :title, limit: 32
      t.text :profile_pic_ref, limit: 90

      t.timestamps
    end
  end
end
