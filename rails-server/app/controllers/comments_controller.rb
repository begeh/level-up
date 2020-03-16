class CommentsController < ApplicationController

  include Response
  include ExceptionHandler
        # GET /comments
        def index
          @comments = Comment.all
          json_response(@comments)
        end
    
        # POST /comments
        def create
          @comment = Comment.create!(comment_params)
          json_response(@comment, :created)
        end
      
        # GET /comments/:id
        def show
          json_response(@comment)
        end
      
        # PUT /comments/:id
        def update
          @comment.update(comment_params)
          head :no_content
        end
      
        # DELETE /comments/:id
        def destroy
          @comment.destroy
          head :no_content
        end
      
        private
      
        def comment_params
          # whitelist params
          params.permit(:text, :username, :post_id)
        end
      
        def set_comment
          @comment = Comment.find(params[:id])
        end
  

end
