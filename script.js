console.log('Hello World');

const saveCode  = document.getElementById('saveCode');
const codeName  = document.getElementById('codeName');
const saveModal = document.getElementById('saveModal');
const templateName = document.getElementById('templateName');
const saveCodeForm = document.getElementById('saveCodeForm');

let templates = [];

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

  // save code with modal form
  function saveCodeTemplate(e) {
    e.preventDefault();
    const templateName = document.getElementById('templateName').value;
    const codeHTML = document.getElementById('codeHTML').value;
    const codeCSS = document.getElementById('codeCSS').value;
    const codeJS = document.getElementById('codeJS').value;
    const code = {
      templateName: templateName,
      codeHTML: codeHTML,
      codeCSS: codeCSS,
      codeJS: codeJS
    };
    templates.push(code);

    // save to local storage
    localStorage.setItem('templates', JSON.stringify(templates));

    // clear modal form
    saveCodeForm.reset();
  }
  saveCodeForm.addEventListener('submit', saveCodeTemplate);



  // saveCodeForm.addEventListener('submit', saveCodeTemplate() {
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