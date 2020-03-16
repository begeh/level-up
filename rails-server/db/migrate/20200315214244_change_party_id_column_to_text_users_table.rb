class ChangePartyIdColumnToTextUsersTable < ActiveRecord::Migration[5.2]

  change_column :users, :party_id, :text

end
