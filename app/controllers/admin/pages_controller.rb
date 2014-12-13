class Admin::PagesController < ApplicationController
  layout 'admin'

  before_filter :authenticate

  def index
  end

  def new
    @page = Page.new
  end

  def edit
    @page = Page.friendly.find(params[:id])
  end

  def create
    @page = Page.new(pages_params)
    if @page.save
      flash[:success] = 'Page created successfully'
      redirect_to edit_admin_page_path(@page)
    else
      render :new
    end
  end

  def destroy
    Page.friendly.find(params[:id]).destroy
    flash[:success] = 'Page Successfully destroyed'
    redirect_to admin_pages_path
  end

  def sort
    params[:page][:position].each_with_index do |id, index|
      Page.friendly.find(id).update_attributes(position: index)
    end
    render nothing: true
  end

  def update
    page = Page.friendly.find(params[:id])
    if page.title != pages_params[:title]
      page.slug = nil
    end
    page.update!(pages_params)
    redirect_to page_path(page)
  end

  private

  def pages_params
    params.require(:page).permit(:title, :content, :order, :parent_id, :nav_location, :position => [])
  end
end