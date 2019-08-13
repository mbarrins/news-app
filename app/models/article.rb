class Article < ApplicationRecord
  belongs_to :source
  validates :url, :published_at, presence: true
  default_scope{ order(published_at: :desc) }

  PAGE_SIZE = 20

  def self.get_top_headlines(sources: Source.active.map{|source| source.api_id}, page: 1, search: nil)
    
    data = JSON.parse(RestClient.get("https://newsapi.org/v2/top-headlines?sources=#{sources.join(',')}#{search ? "&#{search}" : ''}&page=#{page}&apiKey=#{ENV["API_KEY"]}"))

    articles = data['articles']
    no_results = data['totalResults']
    next_page = (no_results - (PAGE_SIZE * page)) > 0
    
    articles.each do |article|
      article["source"] = Source.find_by(api_id: article.delete("source")['id'])
      article["url_to_image"] = article.delete("urlToImage")
      article["published_at"] = article.delete("publishedAt")
    end
    
    {articles: articles.map{|article| Article.find_or_create_by(article)}, totalResults: no_results, hasNextPage: next_page}
    
  end

end
