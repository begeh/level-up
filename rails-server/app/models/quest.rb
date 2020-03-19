class Quest < ApplicationRecord

  has_many :nodes, dependent: :destroy

  VALIDATABLE_ATTRS = Quest.attribute_names - %w(id created_at updated_at date_finished status)
  validates_presence_of VALIDATABLE_ATTRS


end
