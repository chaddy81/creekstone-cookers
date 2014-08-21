module ApplicationHelper
  def full_title(page_title)                          # Method definition
    base_title = "Creekstone Cookers"                 # Variable assignment
    if page_title.empty?                              # Boolean test
      base_title                                      # Implicit return
    else
      "#{base_title} | #{page_title}"                 # String interpolation
    end
  end

  def twitterized_type(type)
    case type
      when :alert
        puts "alert-block"
      when :error
        puts "alert-error"
      when :notice
        puts "alert-info"
      when :success
        puts "alert-success"
      else
        type.to_s
    end
  end

  def root_navigation
    roots = Page.where.not(nav_location: "Side Bar").roots.order("position")
  end

  def side_bar_navigation
    roots = Page.where(nav_location: "Side Bar").roots.order("position")
  end
end
