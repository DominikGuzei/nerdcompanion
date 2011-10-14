
$('.code_container').each(function() {
  
  var mode = $(this).attr('data-meta');
  var value = $(this).find('textarea').val();
  
  CodeMirror.runMode(value, mode, $(this)[0]);
  
});
