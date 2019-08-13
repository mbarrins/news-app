# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

sources = JSON.parse(RestClient.get("https://newsapi.org/v2/sources?language=en&apiKey=#{ENV["API_KEY"]}"))['sources']
sources.each{|source| source["api_id"] = source.delete("id")}
sources.each{|source| source["active"] = true}
sources.each{|source| Source.find_or_create_by(source)}