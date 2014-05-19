class Admin::PagesController < ApplicationController
  layout 'admin', only: [:index]

  def index
    @pages = Page.roots
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

  private

  def pages_params
    params.require(:page).permit(:title, :content, :order, :parent_id)
  end
end