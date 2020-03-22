class FixPkSequence < ActiveRecord::Migration[5.2]
    ActiveRecord::Base.connection.tables.each do |t|
      ActiveRecord::Base.connection.reset_pk_sequence!(t)
  end
end
