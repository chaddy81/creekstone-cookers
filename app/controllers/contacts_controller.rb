class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(params[:contact])
    @contact.request = request
    if @contact.deliver
      flash[:success] = 'Thank you for your message!'
      redirect_to new_contact_path
    else
      flash[:error] = 'Cannot send message.'
      render :new
    end
  end
end