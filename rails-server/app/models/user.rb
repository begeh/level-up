class User < ApplicationRecord

validates :email, :name, :title, presence: true
validates :email, uniqueness: true

end
