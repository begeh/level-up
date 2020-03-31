# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "securerandom"
require "faker"
require "date"

quest_status = ["SUCCESS", "FAILED", "IN PROGRESS"]


# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

# FIX DATABASE

puts "Reseting the primary key count"

ActiveRecord::Base.connection.tables.each do |table|
  if table != "parties"
    result = ActiveRecord::Base.connection.execute("SELECT id FROM #{table} ORDER BY id DESC LIMIT 1") rescue ( puts "Warning: not procesing table #{table}. Id is missing?" ; next )
    ai_val = result.any? ? result.first['id'].to_i + 1 : 1
    puts "Resetting auto increment ID for #{table} to #{ai_val}"
    ActiveRecord::Base.connection.execute("ALTER SEQUENCE #{table}_id_seq RESTART WITH #{ai_val}")
  else
    "Parties uses UUIDs for it's index, skipping"
  end
end

puts "Seeding Data ..."


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

puts "Generating Post Symbol_Refs ..."

symbol_refs = []

symbol_refs = [
  "sword",
  "question",
  "book"
]

puts "Creating Users ..."

User.destroy_all

user1 = User.find_or_create_by!({
  name: user_names[0],
  email: Faker::Internet.email(name: user_names[0].strip),
  title: Faker::Job.title,
  profile_pic_ref: Faker::Avatar.image,
  party_id: party_uuids[0],
  password: 123
})

user2 = User.find_or_create_by!({
  name: user_names[1],
  email: Faker::Internet.email(name: user_names[1].strip),
  title: Faker::Job.title,
  profile_pic_ref: Faker::Avatar.image,
  party_id: party_uuids[1],
  password: 123
})

user3 = User.find_or_create_by!({
  name: user_names[2],
  email: Faker::Internet.email(name: user_names[2].strip),
  title: Faker::Job.title,
  profile_pic_ref: Faker::Avatar.image,
  party_id: party_uuids[0],
  password: 123
})

user4 = User.find_or_create_by!({
  name: user_names[3],
  email: Faker::Internet.email(name: user_names[3].strip),
  title: Faker::Job.title,
  profile_pic_ref: Faker::Avatar.image,
  party_id: party_uuids[1],
  password: 123
})

user5 = User.find_or_create_by!({
  name: user_names[4],
  email: Faker::Internet.email(name: user_names[4].strip),
  title: Faker::Job.title,
  profile_pic_ref: Faker::Avatar.image,
  party_id: party_uuids[0],
  password: 123
})

user6 = User.find_or_create_by!({
  name: user_names[5],
  email: Faker::Internet.email(name: user_names[5].strip),
  title: Faker::Job.title,
  profile_pic_ref: Faker::Avatar.image,
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
  party_name: "The Band of the Axe"
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
  title: "Learn C scales",
  description: "Will learn and practice various C scales on guitar",
  status: "IN PROGRESS",
  date_finished: Faker::Time.between(from: DateTime.now, to: DateTime.now + 5)
})

quest2 = Quest.find_or_create_by!({
  party_id: party2.id,
  user_id: user2.id,
  mentor_id: user2.id,
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  status: "IN PROGRESS",
  date_finished: Faker::Time.between(from: DateTime.now, to: DateTime.now + 5)
})

quest3 = Quest.find_or_create_by!({
  party_id: party1.id,
  user_id: user1.id,
  mentor_id: user3.id,
  title: "Learn Quantum Mechanics",
  description: "Fully understand the modern theory of Quantum Mechanics",
  status: "IN PROGRESS",
  date_finished: Faker::Time.between(from: DateTime.now, to: DateTime.now + 5)
})

## NODES

puts "Creating Nodes ..."

Node.destroy_all

def finished_decider(quest)
  date_finished = Faker::Time.between(from: DateTime.now, to: quest.date_finished)
  complete_by = Faker::Time.between(from: DateTime.now, to: quest.date_finished)
  if date_finished - complete_by <= 0
    {
      :is_complete? => true,
      :date_finished => date_finished,
      :complete_by => complete_by
    } 
  else
    {
      :is_complete? => false,
      :date_finished => nil,
      :complete_by => complete_by
    } 
  end
end

isFinished = finished_decider(quest1)

node1 = Node.find_or_create_by!({
  title: "Learn C Major",
  description: "I'll research and practice the C Major scale",
  is_complete?: false,
  quest_id: quest1.id,
  date_finished: nil
})

isFinished = finished_decider(quest1)

node2 = Node.find_or_create_by!({
  title: "Learn C Minor",
  description: "I'll research and practice the C Minor scale",
  is_complete?: false,
  quest_id: quest1.id,
  date_finished: nil
})

isFinished = finished_decider(quest1)

node3 = Node.find_or_create_by!({
  title: "Learn C Diminished",
  description: "I'll research and practice the C Diminished scale",
  is_complete?: false,
  quest_id: quest1.id,
  date_finished: nil
})

isFinished = finished_decider(quest1)

node4 = Node.find_or_create_by!({
  title: "Learn C Major Pentatonic",
  description: "I'll research and practice the C Major Pentatonic scale",
  is_complete?: false,
  quest_id: quest1.id,
  date_finished: nil
})

isFinished = finished_decider(quest1)

node5 = Node.find_or_create_by!({
  title: "Learn C Minor Pentatonic",
  description: "I'll research and practice the C Minor Pentatonic scale",
  is_complete?: false,
  quest_id: quest1.id,
  date_finished: nil
})

isFinished = finished_decider(quest2)

node6 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: false,
  quest_id: quest2.id,
  date_finished: nil
})

isFinished = finished_decider(quest2)

node7 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: false,
  quest_id: quest2.id,
  date_finished: nil
})

isFinished = finished_decider(quest2)

node8 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: false,
  quest_id: quest2.id,
  date_finished: nil
})

isFinished = finished_decider(quest2)

node9 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: false,
  quest_id: quest2.id,
  date_finished: nil
})

isFinished = finished_decider(quest2)

node10 = Node.find_or_create_by!({
  title: Faker::Lorem.word,
  description: Faker::Lorem.sentence,
  is_complete?: false,
  quest_id: quest2.id,
  date_finished: nil
})

node11 = Node.find_or_create_by!({
  title: "Learn the 6 simple machines",
  description: "Research and learn the application of the 6 simple machines",
  is_complete?: false,
  quest_id: quest3.id,
  date_finished: nil
})
node12 = Node.find_or_create_by!({
  title: "Learn the basic types of energy",
  description: "Research and define the basic types of energy",
  is_complete?: false,
  quest_id: quest3.id,
  date_finished: nil
})
node13 = Node.find_or_create_by!({
  title: "Learn the rest of Quantum Mechanics",
  description: "Research and learn the modern theory of Quantum Mechanics",
  is_complete?: false,
  quest_id: quest3.id,
  date_finished: nil
})

Post.destroy_all

puts "Generating Posts ..."

# The below code generates seed data for posts
post_list_quest_1 = [
  node1.id,
  node2.id,
  node3.id,
  node4.id,
  node5.id
]

post_list_quest_2 = [
  node6.id,
  node7.id,
  node8.id,
  node9.id,
  node10.id
]

count = 1

posts = []

posts.append(Post.find_or_create_by!(
  title: "I found the C Major scale!",
  content: "I found this picture of the C Major scale, should be go to go!",
  image_url: "https://www.guitarcommand.com/wp-content/uploads/2019/08/C-Major-Scale-For-Guitar-TAB.png",
  node_id: 1,
  symbol_ref: "book" 
  ))
posts.append(Post.find_or_create_by!(
  title: "Practicing the C Major Scale",
  content: "In the linked video you can see me practicing the C Major Scale, let me know how I do!",
  node_id: 1,
  video_url: "https://www.youtube.com/watch?v=SJW18e04zJ8&feature=youtu.be",
  symbol_ref: "sword"
  ))
# posts.append(Post.find_or_create_by!(
#   title: "I found the C Minor scale!",
#   content: "I found this picture of the C Minor scale, should be go to go!",
#   image_url: "https://www.guitarcommand.com/wp-content/uploads/2019/08/C-Natural-Minor-Scale-Guitar-TAB-Pattern-3.png",
#   node_id: 2,
#   symbol_ref: "book" 
#   ))
# posts.append(Post.find_or_create_by!(
#   title: "Practicing the C Minor Scale",
#   content: "In the linked video you can see me practicing the C Minor Scale, let me know how I do!",
#   node_id: 2,
#   symbol_ref: "sword"
#   ))
# posts.append(Post.find_or_create_by!(
#   title: "I found the C Diminished scale!",
#   content: "I found this picture of the C Diminished scale, should be go to go!",
#   image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPCkrjyEvLEWVRFwipAwECeqBYqBCPskSFUf07zyQeXV9Cijvu6w&s",
#   node_id: 3,
#   symbol_ref: "book" 
#   ))
# posts.append(Post.find_or_create_by!(
#   title: "Practicing the C Diminished Scale",
#   content: "In the linked video you can see me practicing the C Diminished Scale, let me know how I do!",
#   node_id: 3,
#   symbol_ref: "sword"
#   ))
# posts.append(Post.find_or_create_by!(
#   title: "I found the C Major Pentatonic scale!",
#   content: "I found this picture of the C Major Pentatonic scale, should be go to go!",
#   image_url: "https://www.guitarcommand.com/wp-content/uploads/2019/11/C-Major-Pentatonic-Scale-Open-Position.png",
#   node_id: 4,
#   symbol_ref: "book" 
#   ))
# posts.append(Post.find_or_create_by!(
#   title: "Practicing the C Major Pentatonic Scale",
#   content: "In the linked video you can see me practicing the C Major Pentatonic Scale, let me know how I do!",
#   node_id: 4,
#   symbol_ref: "sword"
#   ))
# posts.append(Post.find_or_create_by!(
#   title: "I found the C Minor scale!",
#   content: "I found this picture of the C Minor scale, should be go to go!",
#   image_url: "https://mk0onlineguitarx1huf.kinstacdn.com/wp-content/uploads/2012/01/MinorPentatonicScaleNotes_C_OpenPosition.jpg",
#   node_id: 5,
#   symbol_ref: "book" 
#   ))
# posts.append(Post.find_or_create_by!(
#   title: "Practicing the C Minor Pentatonic Scale",
#   content: "In the linked video you can see me practicing the C Minor Pentatonic Scale, let me know how I do!",
#   node_id: 5,
#   symbol_ref: "sword"
#   ))




    
post_list_quest_2.each do |node_id|
  posts.append(Post.find_or_create_by!(
    title: Faker::Lorem.word,
    content: Faker::Lorem.sentence,
    node_id: node_id,
    symbol_ref: symbol_refs.sample
    ))
  posts.append(Post.find_or_create_by!(
    title: Faker::Lorem.word,
    content: Faker::Lorem.sentence,
    node_id: node_id,
    symbol_ref: symbol_refs.sample
    ))
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
  # posts[12].id,
  # posts[13].id,
  # posts[14].id,
  # posts[15].id,
  # posts[16].id,
  # posts[17].id,
  # posts[18].id,
  # posts[19].id
]

comments = []

comment_list.each_with_index do |post_id|
  if post_id <= 2
    user = [user3, user5].sample
    if post_id == 1
      comments.append(Comment.find_or_create_by!(text: "That's a good reference pic", username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
    elsif post_id == 2
      comments.append(Comment.find_or_create_by!(text: "Not too shabby! Looks and sounds good", username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
    # elsif post_id == 3
    #   comments.append(Comment.find_or_create_by!(text: "Good find", username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
    # elsif post_id == 4
    #   comments.append(Comment.find_or_create_by!(text: "Looks like you're making good progress", username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
    # elsif post_id == 5
    #   comments.append(Comment.find_or_create_by!(text: "Another great find", username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
    # elsif post_id == 6
    #   comments.append(Comment.find_or_create_by!(text: "Try going a bit slower if you're having trouble", username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
    # elsif post_id == 7
    #   comments.append(Comment.find_or_create_by!(text: "Looks good, should be easy to learn after C Major", username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
    # elsif post_id == 8
    #   comments.append(Comment.find_or_create_by!(text: "Very nice!", username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
    # elsif post_id == 9
    #   comments.append(Comment.find_or_create_by!(text: "Perfect, you're close to completing this quest", username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
    # elsif post_id == 10
    #   comments.append(Comment.find_or_create_by!(text: "Excellent work!", username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
    end
  else
    user = [user4, user6].sample
    comments.append(Comment.find_or_create_by!(text: Faker::Lorem.sentence, username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
    comments.append(Comment.find_or_create_by!(text: Faker::Lorem.sentence, username: user.name, user_id: user.id, user_profile_pic: user.profile_pic_ref, post_id: post_id))
  end
end
