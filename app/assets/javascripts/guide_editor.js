
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
    updateBlockBeforeSort( ui.item );
  }
   
});

$("#guide-content-list").bind("sortstop", function(event, ui) {
  
  // only create content if this is a tool
  // that was dragged from the toolbox
  // everything else is just sorting
  
  if(!ui.item.hasClass('in-guide')) {
    addBlockToGuide(ui.item);
  } else {
    updateBlockAfterSort( ui.item );
  }
});

function addBlockToGuide( block ) {
  
  if(block.hasClass('paragraph')) {
    addParagraphToGuide( block );
  }
  else if(block.hasClass('h1')) {
    addHeading1ToGuide( block );
  }
  else if(block.hasClass('h2')) {
    addHeading2ToGuide( block );
  }
  else if(block.hasClass('h3')) {
    addHeading3ToGuide( block );
  }
  
  // add class to mark this tool as inserted
  block.addClass('in-guide');
  
  // draggables within guide content should
  // be sorted without helper, otherwise the
  // content gets destroyed
  block.draggable("option", "helper", "original");
}

function updateBlockBeforeSort( block ) {
  
  if( block.hasClass('paragraph') ) {
    var editor = block.find('textarea').cleditor()[0];
    editor.updateTextArea();
  }
  
}

function updateBlockAfterSort( block ) {
  
  if( block.hasClass('paragraph') ) {
    var editor = block.find('textarea').cleditor()[0];
    editor.refresh();
    editor.focus();
    editor.updateTextArea();
  }
  
}

function addParagraphToGuide( paragraph ) {
  // paragraphs are based on textarea
  paragraph.html("<textarea>");
  
  // initialize CLEditor instance with created textarea
  var editor = paragraph.find('textarea').cleditor({
    width: "100%",
    height: "100%",
    controls: "bold italic | bullets numbering",
    useCSS: true,
    docCSSFile: "/assets/guide_editor_doc.css",
    bodyStyle: ""
  })[0];
  
  editor.focus();
  
}

function addHeading1ToGuide( heading ) {
  // headings are based on text fields
  heading.html('<h3>H1</h3><input type="text">');
}

function addHeading2ToGuide( heading ) {
  // headings are based on text fields
  heading.html('<h4>H2</h4><input type="text">');
}

function addHeading3ToGuide( heading ) {
  // headings are based on text fields
  heading.html('<h5>H3</h5><input type="text">');
}

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
      
      //textarea.cleditor()[0].updateTextArea();
      block.content = textarea.val();
    }
    else if($(this).hasClass('h1')) {
      block.type = "h1";
      block.content = $(this).find('input').val();
    }
    else if($(this).hasClass('h2')) {
      block.type = "h2";
      block.content = $(this).find('input').val();
    }
    else if($(this).hasClass('h3')) {
      block.type = "h3";
      block.content = $(this).find('input').val();
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
      window.location = "/guides/" + guide.permalink;
    }
  });
  
}
