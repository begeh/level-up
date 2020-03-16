class ChangePartyIdColumnToText < ActiveRecord::Migration[5.2]

  change_column :quests, :party_id, :text

end
