
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
	
	setupExistingBlocks();
});

function setupExistingBlocks() {
  var guideList = $("#guide-content-list");
  
  guideList.find('li.tool').each(function() {
    var item = $(this);
    
    if(item.hasClass('h1') || item.hasClass('h2') || item.hasClass('h3')) {
      addHeadingToGuide( item, item.html().trim() );
    }
    else if(item.hasClass('paragraph')) {
      addParagraphToGuide( item, item.html() );
    }
  });
}

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
  else if(block.hasClass('h1') || block.hasClass('h2') || block.hasClass('h3')) {
    addHeadingToGuide( block );
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

function addParagraphToGuide( paragraph, content ) {
  
  content = content || ""
  
  // paragraphs are based on textarea
  paragraph.html("<textarea>" + content + "</textarea>");
  
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
  editor.change( function() { resizeParagraphEditor( $(this)[0] ); } );
  $(editor.doc).scroll( function() { resizeParagraphEditor(editor); });
  
  editor.$frame.attr('scrolling', 'no');
}

function resizeParagraphEditor( editor ) {
  
  var bodyHeight = $(editor.doc).find('body').outerHeight() + 20;
  var toolbarHeight = editor.$toolbar.outerHeight();
  
  var newHeight = bodyHeight + toolbarHeight;
  
  editor.$main.closest('li.paragraph').height( newHeight );
  editor.$frame.height( bodyHeight );
  
}

function addHeadingToGuide( heading, content ) {
  content = content || "";
  var preText = "";
  
  if(heading.hasClass('h1')) {
    preText = "<h3>H1</h3>";
  }
  else if(heading.hasClass('h2')) {
    preText = "<h4>H2</h4>";
  }
  else if(heading.hasClass('h3')) {
    preText = "<h5>H3</h5>";
  }
  
  // headings are based on text fields
  heading.html( preText + '<input type="text" value="' + content + '">');
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
  
  var url = $('#guide-submit').attr('data-url');
  var action = $('#guide-submit').attr('data-action');
  
  $.ajax(url, {
    type: action,
    data: JSON.stringify({
      guide: guide
    }),
    contentType: "application/json",
    success: function(guide) {
      window.location = "/guides/" + guide.permalink;
    }
  });
  
}
