class Party < ApplicationRecord

  default_scope -> { order("created_at ASC") }
  
  validates :number_of_members, numericality: {less_than_or_equal_to: 6}
  validates :party_name, :mentor_id, presence: true


end
