class Node < ApplicationRecord

  belongs_to :quest
  has_many :posts, dependent: :destroy
  # Pulls the attributes from the relevant Tabe that we want present
  VALIDATABLE_ATTRS = Node.attribute_names - %w(id created_at updated_at date_finished is_complete?)
  validates_presence_of VALIDATABLE_ATTRS

end
