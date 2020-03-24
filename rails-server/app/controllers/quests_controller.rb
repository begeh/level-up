class QuestsController < ApplicationController

  include Response
  include ExceptionHandler

    # GET /quests
    def index
      @quests = Quest.all
      json_response(@quests)
    end

    # GET /quest_object/:id
    # Will return a Response JSON object containing the quest,
    # and all relevant nodes, posts and comments
    def object
    @quest = Quest.find(params[:id])
    @nodes = Node.where(quest_id: @quest.id)
    @posts = []
    @nodes.each do |node| 
      @posts.append(Post.where(node_id: node.id))
    end
    @comments = []
    @posts.each do |post|
      post.each do |post2|
      @comments.append(Comment.where(post_id: post2.id))
    end
  end
  @response = {
    :quest => @quest,
    :nodes => @nodes,
    :posts => @posts,
    :comments => @comments
  }
    json_response(@response)
    end
  
  
    # POST /user_quests
    # will return all quests with the given users ID
    def user_quests
      @quests = Quest.where(user_id: params[:user_id])
      json_response(@quests)
    end

    # POST /party_quests
    # will return all quests with the given users ID
    def party_quests
      @quests = Quest.where(party_id: params[:party_id])
      json_response(@quests)
    end

    # POST /quests
    def create
      @quest = Quest.create!(quest_params)
      json_response(@quest, :created)
    end

    # POST /create_quest/:package
    def create_quest
      quest = params[:quest]
      nodes = params[:nodes]
      puts quest
      puts "Space"
      puts nodes
      @quest = Quest.create!(
        party_id: quest[:party_id],
        user_id: quest[:user_id],
        mentor_id: quest[:mentor_id],
        status: quest[:status],
        description: quest[:description],
        title: quest[:title]
      )
      nodes.each do |n|
        puts "n = #{n}"
      Node.create!(
        title: n[:title],
        description: n[:description],
        is_complete?: false,
        quest_id: @quest.id,
        complete_by: n[:complete_by]
      )
      end

      json_response(@quest, :created)
    end
  
    # GET /quests/:id
    def show
      set_quest()
      json_response(@quest)
    end
  
    # PUT /quests/:id
    def update
      set_quest()
      @quest.update(quest_params)
      head :no_content
    end
  
    # DELETE /quests/:id
    def destroy
      @quest.destroy
      head :no_content
    end
  
    private
  
    def quest_params
      # whitelist params
      params.permit(:party_id, :user_id, :title, :quest_description, :status, :mentor_id, :node, :story, :date_finished)
    end

    def node_params
      # whitelist params
      params.permit(
  :node1Title, :node1Desc, :node1CompletionDate,
  :node2Title, :node2Desc, :node2CompletionDate,
  :node3Title, :node3Desc, :node3CompletionDate,
  :node4Title, :node4Desc, :node4CompletionDate,
  :node5Title, :node5Desc, :node5CompletionDate
      )
    end
  
    def set_quest
      @quest = Quest.find(params[:id])
    end
  end
  
