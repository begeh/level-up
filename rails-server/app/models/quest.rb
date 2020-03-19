class Quest < ApplicationRecord

  has_many :nodes, dependent: :destroy

  # validates :party_id, :user_id, :title, :description, :status, :mentor_id, presence: true


end
