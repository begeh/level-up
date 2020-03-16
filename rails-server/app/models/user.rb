class User < ApplicationRecord

validates :email, :name, :title, presence: true

end
