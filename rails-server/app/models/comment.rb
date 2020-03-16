class Comment < ApplicationRecord

  belongs_to :post

  # Pulls the attributes from the relevant Tabe that we want present
  VALIDATABLE_ATTRS = Comment.attribute_names - %w(id created_at updated_at)
  validates_presence_of VALIDATABLE_ATTRS

end
