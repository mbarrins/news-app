class Source < ApplicationRecord

    validates :name, :description, :url, :category, :language, :country, presence: true

    def self.active
        Source.where(active: true)
    end
    
end
