class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.text :email, limit: 255
      t.string :name, limit: 128
      t.integer :party_id, array: true, default: []
      t.string :title, limit: 128
      t.text :profile_pic_ref, limit: 90
      t.string :password

      t.timestamps
    end
  end
end
