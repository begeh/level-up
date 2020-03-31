class PartiesController < ApplicationController

  include Response
  include ExceptionHandler

  # GET /parties
  def index
    @parties = Party.all
    json_response(@parties)
  end

  # POST /parties
  def create
    # if Party.new(party_params).valid? === true
      @party = Party.create!(party_params)
      @user = User.where(id: params[:user_id])
      @user[0].update(party_id: @party.id)
      json_response(@party, :created)
    # else
    #   @response = "That party name is already taken"
    #   json_response(@response)
    # end
  end

  # GET /parties/:id
  def show
    set_party()
    json_response(@party)
  end

  # PUT /parties/:id
  def update
    p |
    p |
    p |
    p |
    p |
    p |
    p |
    p |
    set_party()
    new_params = party_params
    puts party_params
    new_params.number_of_members += 1
    @party.update(new_params)
    set_party()
    puts @party
    p |
    p |
    p |
    p |
    p |
    p |
    p |
    p |
      json_response(@party)

  end

  # DELETE /parties/:id
  def destroy
    @party.destroy
    head :no_content
  end

  private

  def party_params
    # whitelist params
    params.permit(:number_of_members, :mentor_id, :party_name, :party)
  end

  def user_params
    #whitelist params
    params.permit(:user_id)
  end

  def set_party
    @party = Party.find(params[:id])
  end

  
end
