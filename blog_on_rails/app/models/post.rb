class Post < ApplicationRecord
  has_many :comments, dependent: :nullify
  validates :body, presence: true
  validates_length_of :body, minimum: 50, message: "Your blog post must be at least 50 characters long."
  validates :title, presence: true, uniqueness: true
end
