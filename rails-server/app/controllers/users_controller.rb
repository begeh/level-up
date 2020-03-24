class UsersController < ApplicationController

  require "json"
  include Response
  include ExceptionHandler

  # GET /users
  def index
    @users = User.all
    json_response(@users)
  end

  # POST /users
  def create
    @user = User.create!(user_params)
    json_response(@user, :created)
  end

  # POST /user_party_members
  def return_party_members
    @party_members = User.where(party_id: params[:party_id])
    json_response(@party_members)
  end

  # GET /users/:id
  def show
    set_user()
    json_response(@user)
  end

  # PUT /users/:id
  def update
    set_user()
    @user.update(user_params)
    head :no_content
  end

  # PUT /user_parties
  def update_parties
    set_user()
    temp = @user.party_id
    temp.append(params[:party_id])
    @user.update(
      party_id: temp
    )
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
    head :no_content
  end

  # POST /user/:email
  def return_user
    
    email = params[:email]
    password = params[:password]
    
    @user = User.where(email: params[:email])
    json_response(@user)
  end

  private

  def user_params
    # whitelist params
    params.permit(:email, :name, :party_id, :title, :profile_pic_ref, :password)
  end

  def set_user
    @user = User.find(params[:id])
  end

end
