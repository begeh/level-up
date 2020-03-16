class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :content
      t.string :symbol_ref
      t.string :title
      t.integer :node_id
      t.references :node, foreign_key: true

      t.timestamps
    end
  end
end
