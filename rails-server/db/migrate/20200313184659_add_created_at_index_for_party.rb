class AddCreatedAtIndexForParty < ActiveRecord::Migration[5.2]
  def up
    add_index :parties, :created_at
  end
end
