class UsersController < ApplicationController

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

  # GET /users/:id
  def show
    json_response(@user)
  end

  # PUT /users/:id
  def update
    @user.update(user_params)
    head :no_content
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
    head :no_content
  end

  # GET /user/:email
  def return_user
    @user = User.where(email: user_params.email)
    json_response(@user)
    # json_response("test")
  end

  private

  def user_params
    # whitelist params
    params.permit(:email, :name, :party_id, :title, :profile_pic_ref)
  end

  def set_user
    @user = User.find(params[:id])
  end

end
