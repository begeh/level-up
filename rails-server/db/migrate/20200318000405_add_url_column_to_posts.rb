class AddUrlColumnToPosts < ActiveRecord::Migration[5.2]
  def change

    change_table :posts do |t|
      t.string :url
    end

  end
end
