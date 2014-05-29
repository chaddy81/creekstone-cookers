class Admin::PagesController < ApplicationController
  layout 'admin', only: [:index]

  def index
    @pages = Page.roots.order("position")
  end

  def new
    @page = Page.new
    render layout: false
  end

  def edit
    @page = Page.find(params[:id])
    render layout: false
  end

  def create
    @page = Page.new(pages_params)
    if @page.save
      redirect_to page_path(@page), notice: 'Page created successfully'
    else
      render :new
    end
  end

  def destroy
    Page.find(params[:id]).destroy
    redirect_to admin_pages_path, notice: 'Page Successfully destroyed'
  end

  def sort
    params[:page][:position].each_with_index do |id, index|
      Page.find(id).update_attributes(position: index)
    end
    render nothing: true
  end

  def update
    page = Page.find(params[:id])
    page.update!(pages_params)
    redirect_to page_path(page)
  end

  private

  def pages_params
    params.require(:page).permit(:title, :content, :order, :parent_id, :position => [])
  end
end