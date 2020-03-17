# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "securerandom"
require "faker"

quest_status = ["completed", "failed", "abandoned", "underway"]

puts "Seeding Data ..."

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

## USERS

puts "Generating User Names ..."

user_names = []

user_names = [
  Faker::Name.name,
  Faker::Name.name,
  Faker::Name.name,
  Faker::Name.name,
  Faker::Name.name,
  Faker::Name.name
]

puts "Generating Party UUIDs ..."

party_uuids = []

party_uuids = [
  SecureRandom.uuid,
  SecureRandom.uuid
]

puts "Creating Users ..."

User.destroy_all

user1 = User.find_or_create_by!({
  name: user_names[0],
  email: Faker::Internet.email(name: user_names[0].strip),
  title: Faker::Job.title,
  party_id: party_uuids[0],
  password: 123
})

user2 = User.find_or_create_by!({
  name: user_names[1],
  email: Faker::Internet.email(name: user_names[1].strip),
  title: Faker::Job.title,
  party_id: party_uuids[1],
  password: 123
})

user3 = User.find_or_create_by!({
  name: user_names[2],
  email: Faker::Internet.email(name: user_names[1].strip),
  title: Faker::Job.title,
  party_id: party_uuids[0],
  password: 123
})

user4 = User.find_or_create_by!({
  name: user_names[3],
  email: Faker::Internet.email(name: user_names[1].strip),
  title: Faker::Job.title,
  party_id: party_uuids[1],
  password: 123
})

user5 = User.find_or_create_by!({
  name: user_names[4],
  email: Faker::Internet.email(name: user_names[1].strip),
  title: Faker::Job.title,
  party_id: party_uuids[0],
  password: 123
})

user6 = User.find_or_create_by!({
  name: user_names[5],
  email: Faker::Internet.email(name: user_names[1].strip),
  title: Faker::Job.title,
  party_id: party_uuids[1],
  password: 123
})

## PARTIES

puts "Generating Parties ..."

Party.destroy_all

party1 = Party.find_or_create_by!({
  id: party_uuids[0],
  number_of_members: 3,
  mentor_id: user1.id,
  party_name: Faker::Cannabis.strain
})

party2 = Party.find_or_create_by!({
  id: party_uuids[1],
  number_of_members: 3,
  mentor_id: user2.id,
  party_name: Faker::Cannabis.strain
})

## QUESTS

puts "Creating Quests ..."

Quest.destroy_all

quest1 = Quest.find_or_create_by!({
  party_id: party1.id,
  user_id: user1.id,
  mentor_id: user1.id,
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  status: quest_status.sample,
  date_finished: Faker::Time.between(from: DateTime.now, to: DateTime.now + 5)
})

quest2 = Quest.find_or_create_by!({
  party_id: party2.id,
  user_id: user2.id,
  mentor_id: user2.id,
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  status: quest_status.sample,
  date_finished: Faker::Time.between(from: DateTime.now, to: DateTime.now + 5)
})

## NODES

puts "Creating Nodes ..."

Node.destroy_all

node1 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: Faker::Boolean.boolean,
  quest_id: quest1.id,
  date_finished: Faker::Time.between(from: DateTime.now, to: quest1.date_finished)
})

node2 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: Faker::Boolean.boolean,
  quest_id: quest1.id,
  date_finished: Faker::Time.between(from: DateTime.now, to: quest1.date_finished)
})

node3 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: Faker::Boolean.boolean,
  quest_id: quest1.id,
  date_finished: Faker::Time.between(from: DateTime.now, to: quest1.date_finished)
})

node4 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: Faker::Boolean.boolean,
  quest_id: quest1.id,
  date_finished: Faker::Time.between(from: DateTime.now, to: quest1.date_finished)
})

node5 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: Faker::Boolean.boolean,
  quest_id: quest1.id,
  date_finished: Faker::Time.between(from: DateTime.now, to: quest1.date_finished)
})

node6 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: Faker::Boolean.boolean,
  quest_id: quest2.id,
  date_finished: Faker::Time.between(from: DateTime.now, to: quest2.date_finished)
})

node7 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: Faker::Boolean.boolean,
  quest_id: quest2.id,
  date_finished: Faker::Time.between(from: DateTime.now, to: quest2.date_finished)
})

node8 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: Faker::Boolean.boolean,
  quest_id: quest2.id,
  date_finished: Faker::Time.between(from: DateTime.now, to: quest2.date_finished)
})

node9 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: Faker::Boolean.boolean,
  quest_id: quest2.id,
  date_finished: Faker::Time.between(from: DateTime.now, to: quest2.date_finished)
})

node10 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: Faker::Boolean.boolean,
  quest_id: quest2.id,
  date_finished: Faker::Time.between(from: DateTime.now, to: quest2.date_finished)
})

Post.destroy_all

puts "Generating Posts ..."

# The below code generates seed data for posts
post_list = [
  node1.id,
  node2.id,
  node3.id,
  node4.id,
  node5.id,
  node6.id,
  node7.id,
  node8.id,
  node9.id,
  node10.id
]

count = 1

posts = []

post_list.each do |node_id|
  posts.append(Post.find_or_create_by!(id: count, title: Faker::Lorem.word, content: Faker::Lorem.sentence, node_id: node_id))
  count += 1
  posts.append(Post.find_or_create_by!(id: count, title: Faker::Lorem.word, content: Faker::Lorem.sentence, node_id: node_id))
  count += 1
end


Comment.destroy_all

puts "Generating Comments ..."

comment_list = [
  posts[0].id,
  posts[1].id,
  posts[2].id,
  posts[3].id,
  posts[4].id,
  posts[5].id,
  posts[6].id,
  posts[7].id,
  posts[8].id,
  posts[9].id,
  posts[10].id,
  posts[11].id,
  posts[12].id,
  posts[13].id,
  posts[14].id,
  posts[15].id,
  posts[16].id,
  posts[17].id,
  posts[18].id,
  posts[19].id
]

comments = []

comment_list.each_with_index do |post_id, index|
  if index >= 9
  comments.append(Comment.find_or_create_by!(text: Faker::Lorem.sentence, username: [user3.name, user5.name].sample, post_id: post_id))
  comments.append(Comment.find_or_create_by!(text: Faker::Lorem.sentence, username: [user3.name, user5.name].sample, post_id: post_id))
  else
  comments.append(Comment.find_or_create_by!(text: Faker::Lorem.sentence, username: [user4.name, user6.name].sample, post_id: post_id))
  comments.append(Comment.find_or_create_by!(text: Faker::Lorem.sentence, username: [user4.name, user6.name].sample, post_id: post_id))
  end
end
