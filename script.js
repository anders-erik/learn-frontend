


const htmlInput = document.getElementById('html-input');
const cssInput = document.getElementById('css-input');
const jsInput = document.getElementById('js-input');
const outputIframe = document.getElementById('output-iframe');




function updateOutput() {
  const html = htmlInput.value;
  const css = cssInput.value;
  const js = jsInput.value;

  const doc = outputIframe.contentDocument;

  // Clear existing content
  doc.open();
  doc.write('');
  doc.close();

  // Inject HTML, CSS, and JavaScript
  doc.documentElement.innerHTML = html;  
  doc.documentElement.innerHTML += "<div id='mylog' style='background-color:aqua'>s</div>";


  const styleTag = doc.createElement('style');
  styleTag.textContent = css;
  doc.head.appendChild(styleTag);

  const scriptTag = doc.createElement('script');
  scriptTag.textContent = `
  (function () {
	  "use strict";
  
	  var baseLogFunction = console.log;
	  console.log = function(){
		  baseLogFunction.apply(console, arguments);
  
		  var args = Array.prototype.slice.call(arguments);
		  for(var i=0;i<args.length;i++){
			  var node = createLogNode(args[i]);
			  document.querySelector("#mylog").appendChild(node);
		  }
		  
	  }
  
	  function createLogNode(message){
		  var node = document.createElement("div");
		  var textNode = document.createTextNode(message);
		  node.appendChild(textNode);
		  return node;
	  }
  
	  window.onerror = function(message, url, linenumber) {
		  console.log("JavaScript error: " + message + " on line " +
			  linenumber + " for " + url);
	  };
  
  })();
  
  console.log("test");
  console.log("test");
  console.log("the error below is intentional to test error handling");
  //throw new Error("Test Error");

  `;
  scriptTag.textContent += '\n';
  scriptTag.textContent += js;
  doc.body.appendChild(scriptTag);
}

// Update output on input change
htmlInput.addEventListener('input', updateOutput);
cssInput.addEventListener('input', updateOutput);
jsInput.addEventListener('input', updateOutput);

// Initial update
updateOutput();
