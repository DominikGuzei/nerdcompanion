
//= require lib/jqueryui
//= require lib/cleditor/jquery_cleditor
//= require lib/cleditor/jquery_cleditor_xhtml

$(function() {
	$("#guide-toolbox-list .tool").draggable({
		connectToSortable: "#guide-content-list",
		helper: "clone",
		revert: "invalid"
	});

	$("#guide-content-list").sortable({
	  revert: true
	});

	$("#guide-toolbox-list, #guide-content-list").disableSelection();
});

$("#guide-content-list").bind("sortstart", function(event, ui) {
  
  if(ui.item.hasClass('in-guide')) {
    var editor = ui.item.find('textarea').cleditor()[0];
    editor.updateTextArea();
  }
   
});

$("#guide-content-list").bind("sortstop", function(event, ui) {
  
  // only create content if this is a tool
  // that was dragged from the toolbox
  // everything else is just sorting
  
  if(!ui.item.hasClass('in-guide')) {
    
    // all content blocks are based on textarea
    ui.item.html("<textarea>");
    
    // initialize CLEditor instance with created textarea
    var editor = ui.item.find('textarea').cleditor({
      width: "100%",
      height: "100%",
      controls: "bold italic | bullets numbering",
      useCSS: true,
      docCSSFile: "/assets/guide_editor_doc.css",
      bodyStyle: ""
    })[0];
    
    editor.focus();
    
    // draggables within guide content should
    // be sorted without helper, otherwise the
    // content gets destroyed
    ui.item.draggable("option", "helper", "original");
    
    // add class to mark this tool as inserted
    ui.item.addClass('in-guide');
  } else {
    var editor = ui.item.find('textarea').cleditor()[0];
    editor.refresh();
    editor.focus();
    editor.updateTextArea();
  }
});

$('#guide-submit').click(function(event) {
  event.preventDefault();
  
  // save title and description
  var guide = {
    title: $('#guide-title').val(),
    description: $('#guide-description').val(),
    blocks: []
  };
  
  // gather all content blocks of the guide
  $('#guide-content-list li').each(function() {
    
    var block = {};
    
    if($(this).hasClass('paragraph')) {
      block.type = "paragraph";
      var textarea = $(this).find('textarea');
      
      textarea.cleditor()[0].updateTextArea();
      block.content = textarea.val();
    }
   
    guide.blocks.push( block );
    
  });
  
  sendGuideDataToServer( guide );
  
});

function sendGuideDataToServer( guide ) {
  
  $.ajax('/guides', {
    type: 'POST',
    data: JSON.stringify({
      guide: guide
    }),
    contentType: "application/json",
    success: function(guide) {
      window.location = "/guides/" + guide.slug;
    }
  });
  
}
