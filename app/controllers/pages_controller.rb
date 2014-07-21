class PagesController < ApplicationController

  def index
    @pages = Page.all
  end

  def new
    @page = Page.new
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

  def show
    @page = Page.friendly.find(params[:id])
    if Page::NO_SIDE_BAR.include?(@page.title)
      render layout: 'no_side_nav'
    end

    if request.path != page_path(@page)
      redirect_to @page, status: :moved_permanently
    end
  end

  def update
    @page = Page.find(params[:id])
    if @page.update(pages_params)
      redirect_to page_path(@page), notice: 'Page updated successfully'
    else
      render :edit
    end
  end

  def home
    @page = Page.where(title: 'Home').last
  end

  def update_image
    @image = params[:image]
    @type = params[:type]
  end

  def four_oven_cooker_electric
    render layout: 'no_side_nav'
  end

  def four_oven_cooker_gas
    render layout: 'no_side_nav'
  end

  private

  def pages_params
    params.require(:page).permit(:title, :content, :order, :nav_location)
  end
end
