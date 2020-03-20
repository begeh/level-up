class AddVideoAndImageUrlColumnsToPost < ActiveRecord::Migration[5.2]
  def change
    change_table :posts do |t|
      t.string :video_url
      t.rename :url, :image_url
    end
  end
end
