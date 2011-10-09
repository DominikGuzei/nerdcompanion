
def path_to(page_name)
  case page_name
  when /home/
    home_path
  when /create guide/
    new_guide_path
  end
end