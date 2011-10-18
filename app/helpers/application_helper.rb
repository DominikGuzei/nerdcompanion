module ApplicationHelper

  def title(page_title)
    content_for(:page_title) { page_title }
  end
  
  def cdn_jquery_tag
    javascript_include_tag 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'
  end
  
  def cdn_jquery_ui_tag
    javascript_include_tag 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js'
  end

end