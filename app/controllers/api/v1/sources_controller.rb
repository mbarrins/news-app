class Api::V1::SourcesController < ApplicationController
    skip_before_action :authorize, only: [:index]

    def index
        sources = Source.all
        render json: {sources: sources}
    end

end
