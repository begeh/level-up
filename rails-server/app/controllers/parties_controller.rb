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
    @party = Party.create!(party_params)
    if Party.new(party_params).valid? === true
      @user = User.where(id: params[:user_id])
      p "User is #{@user}"
      temp = [@party.id]
      p "Temp is now #{temp}"
      temp.append(@user.party_id)
      p "Temp is now #{temp}"
      @user[0].update(party_id: @party.id)
    end
    json_response(@party, :created)

  end

  # GET /parties/:id
  def show
    set_party()
    json_response(@party)
  end

  # PUT /parties/:id
  def update
    @party.update(party_params)
    head :no_content
  end

  # DELETE /parties/:id
  def destroy
    @party.destroy
    head :no_content
  end

  private

  def party_params
    # whitelist params
    params.permit(:number_of_members, :mentor_id, :party_name, :party_id)
  end

  def user_params
    #whitelist params
    params.permit(:user_id)
  end

  def set_party
    @party = Party.find(params[:id])
  end

  
end
