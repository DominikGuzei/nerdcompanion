
//= require lib/cleditor/jquery_cleditor
//= require lib/cleditor/jquery_cleditor_xhtml
//= require_tree ./lib/codemirror

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
    
    switch( item.attr('data-block') ) {
    
      case "paragraph":
        addParagraphToGuide( item, item.html() );
        break;
      
      case "h1":
      case "h2":
      case "h3":
        addHeadingToGuide( item, item.html().trim() );
        break;
      
      case "code":
        addCodeToGuide( item, item.html() );
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
  
  switch( block.attr('data-block') ) {
    
    case "paragraph":
      addParagraphToGuide( block );
      break;
    
    case "h1":
    case "h2":
    case "h3":
      addHeadingToGuide( block );
      break;
    
    case "code":
      addCodeToGuide( block );
    
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

function addCodeToGuide( codeBlock, content ) {
  
  content = content || ""
  
  var modeFromDom = codeBlock.attr('data-mode');
  
  // create select for CodeMirror modes
  var html = '<div class="language-select">Language:';
  html += '<select class="editor-mode">';
  html += '<option value="javascript">JavaScript</option>';
  html += '<option value="ruby">Ruby</option>';
  html += '<option value="text/html">HTML</option>';
  html += '<option value="text/css">CSS</option>';
  html += '<option value="text/x-clojure">Clojure</option>';
  html += '<option value="text/x-coffeescript">CoffeeScript</option>';
  html += '<option value="text/x-haskell">Haskell</option>';
  html += '<option value="text/x-lua">Lua</option>';
  html += '<option value="text/x-markdown">Markdown</option>';
  html += '<option value="text/x-perl">Perl</option>';
  html += '<option value="text/x-php">PHP</option>';
  html += '<option value="application/x-httpd-php">PHP in HTML</option>';
  html += '<option value="text/x-python">Python</option>';
  html += '<option value="text/x-scheme">Scheme</option>';
  html += '<option value="application/xml">XML</option>';
  html += '<option value="text/x-yaml">YAML</option>';
  html += '<option value="text/x-csrc">C</option>';
  html += '<option value="text/x-c++src">C++</option>';
  html += '<option value="text/x-java">Java</option>';
  html += '<option value="text/x-groovy">Groovy</option>';
  html += '</select></div>';
  
  // add the content of editor as textarea
  html += '<textarea>' + content + '</textarea>';
  
  // paragraphs are based on textarea
  codeBlock.html(html);
  
  var editor = CodeMirror.fromTextArea(codeBlock.find('textarea')[0], {
    mode: modeFromDom,
    theme: 'elegant',
    lineNumbers: true,
    matchBrackets: true,
    tabMode: 'indent',
    onBlur: function() { editor.save(); } // push contents to textarea 
  });
  
  editor.focus();
  
  // change CodeMirror mode on selection change
  codeBlock.find('select.editor-mode').change(function(event) {
    editor.setOption( "mode", $(this).val() );
    editor.focus();
  });
  
  // stop mouse down events from bubbling up to sortable
  // so the user can select the source code within the editor
  codeBlock.find('.CodeMirror-scroll').mousedown(function(event) {
    event.stopPropagation();
  });
  
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
    
    switch( $(this).attr('data-block') ) {
      
      case "paragraph":
        block.type = "paragraph";
        var textarea = $(this).find('textarea');
        
        //textarea.cleditor()[0].updateTextArea();
        block.content = textarea.val();
        break;
      
      case "h1":
        block.type = "h1";
        block.content = $(this).find('input').val();
        break;
      
      case "h2":
        block.type = "h2";
        block.content = $(this).find('input').val();
        break;
      
      case "h3":
        block.type = "h3";
        block.content = $(this).find('input').val();
        break;
        
      case "code":
        block.type = "code";
        block.content = $(this).find('textarea').val();
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
