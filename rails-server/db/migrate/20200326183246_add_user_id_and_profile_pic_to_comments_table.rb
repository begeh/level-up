class AddUserIdAndProfilePicToCommentsTable < ActiveRecord::Migration[5.2]
  def change
    change_table :comments do |t|
      t.integer :user_id
      t.string :user_profile_pic
    end
  end
end
