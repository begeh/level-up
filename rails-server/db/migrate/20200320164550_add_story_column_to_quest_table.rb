class AddStoryColumnToQuestTable < ActiveRecord::Migration[5.2]
  def change
    change_table :quests do |t|
    t.string :story
    end
  end
end
