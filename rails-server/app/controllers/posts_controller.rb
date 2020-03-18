class PostsController < ApplicationController

  include Response
  include ExceptionHandler

      # GET /posts
      def index
        @posts = Post.all
        json_response(@posts)
      end
  
      # POST /posts
      def create
        @post = Post.create!(post_params)
        json_response(@post, :created)
      end
    
      # GET /posts/:id
      def show
        json_response(@post)
      end

      # GET /node/:node_id/posts
      def node_posts
        @posts = Post.where(node_id: params[:node_id])
        json_response(@posts)
      end
    
      # PUT /posts/:id
      def update
        @post.update(post_params)
        head :no_content
      end
    
      # DELETE /posts/:id
      def destroy
        @post.destroy
        head :no_content
      end
    
      private
    
      def post_params
        # whitelist params
        params.permit(:content, :symbol_ref, :node_id, :title)
      end
    
      def set_post
        @post = Post.find(params[:id])
      end

end
