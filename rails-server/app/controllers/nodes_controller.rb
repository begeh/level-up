class NodesController < ApplicationController

      # GET /nodes
      def index
        @nodes = Node.all
        json_response(@nodes)
      end
  
      # POST /nodes
      def create
        @node = Node.create!(node_params)
        json_response(@node, :created)
      end
    
      # GET /nodes/:id
      def show
        json_response(@node)
      end
    
      # PUT /nodes/:id
      def update
        @node.update(node_params)
        head :no_content
      end
    
      # DELETE /nodes/:id
      def destroy
        @node.destroy
        head :no_content
      end
    
      private
    
      def node_params
        # whitelist params
        params.permit(:title, :description, :quest_id, :is_complete?, :date_finished)
      end
    
      def set_node
        @node = Node.find(params[:id])
      end

end
