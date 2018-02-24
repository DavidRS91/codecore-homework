# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.destroy_all
Comment.destroy_all

100.times.each do
  po = Post.create(
    title: Faker::Dog.breed,
    body: Faker::Hipster.paragraph
  )
  if po.valid?
    rand(0..10).times.each do
      Comment.create(
        body: Faker::Seinfeld.quote,
        post: po
      )
    end
  end
end
#
# posts = Post.all
# comments = Comment.all
#
# puts "You created #{posts.count} posts"
# puts "You created #{comments.count} comments"
