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
    json_response(@party, :created)
  end

  # GET /parties/:id
  def show
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
    params.permit(:number_of_members, :mentor_id, :party_name)
  end

  def set_party
    @party = Party.find(params[:id])
  end

  
end
