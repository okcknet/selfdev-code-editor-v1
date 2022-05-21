console.log('Hello World');

function run() {
    console.log('Running');

    let codeHTML  = document.getElementById('codeHTML').value;
    let codeJS    = document.getElementById('codeJS').value;
    let codeCSS   = '<style>' + document.getElementById('codeCSS').value + '</style>';
    let runCode   = document.getElementById('runCode');

    runCode.contentDocument.body.innerHTML = codeHTML + codeJS + codeCSS;
    runCode.contentWindow.eval(codeJS);

    // add event listener to runCode
    runCode.addEventListener('load', function() {
        console.log('Loaded');
    });

    // add event listener to runCode
    runCode.addEventListener('error', function() {
        console.log('Error');
    });

  }
  document.querySelector('#codeHTML').addEventListener('keyup', run);
  document.querySelector('#codeCSS').addEventListener('keyup', run);
  document.querySelector('#codeJS').addEventListener('keyup', run);