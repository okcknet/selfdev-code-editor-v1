console.log('Hello World');

const saveCode = document.getElementById('saveCode');

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

  // save code to local storage with confirmation dialog
  saveCode.addEventListener('click', function() {
    let codeHTML  = document.getElementById('codeHTML').value;
    let codeJS    = document.getElementById('codeJS').value;
    let codeCSS   = document.getElementById('codeCSS').value;
    let codeDate  = new Date();

    let code = {
        html: codeHTML,
        js: codeJS,
        css: codeCSS,
        date: codeDate
    };

    if (confirm('Save code?')) {
        localStorage.setItem('code', JSON.stringify(code));
    }
  });




  // saveCode.addEventListener('click', function() {
  //   let codeHTML  = document.getElementById('codeHTML').value;
  //   let codeJS    = document.getElementById('codeJS').value;
  //   let codeCSS   = document.getElementById('codeCSS').value;
  //   let code      = codeHTML + codeJS + codeCSS;
  //   let blob      = new Blob([code], {type: "text/plain;charset=utf-8"});
  //   saveAs(blob, "code.html");
  // });

  // function saveAs(blob, fileName) {
  //   let url = URL.createObjectURL(blob);
  //   let a = document.createElement('a');
  //   a.href = url;
  //   a.download = fileName;
  //   a.click();
  //   URL.revokeObjectURL(url);
  // }