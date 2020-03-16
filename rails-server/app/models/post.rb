class Post < ApplicationRecord

  # :node must be singlular, since :nodes would refer to a belongs to many relationship
  belongs_to :node
  has_many :comments
  VALIDATABLE_ATTRS = Post.attribute_names - %w(id created_at updated_at symbol_ref)
  validates_presence_of VALIDATABLE_ATTRS

end
