// variables
var HTML_CODE = `
<h1>Lorem Ipsum</h1>
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
`;
var CSS_CODE = `
body { font-family: sans-serif; }
h1 { font-weight: bold; }
`;
var JS_CODE = `
console.log('Lorem Ipsum');
`;


const saveCode  = document.getElementById('saveCode');
const codeName  = document.getElementById('codeName');
const saveModal = document.getElementById('saveModal');
const templateName = document.getElementById('templateName');
const saveCodeForm = document.getElementById('saveCodeForm');

const saveCodeModal = new bootstrap.Modal(document.getElementById('saveCodeModal'));
const deletedTemplateToast = new bootstrap.Toast(document.getElementById('deletedTemplateToast'));

// const body = document.getElementsByTagName('body')[0];

const minimizeButton = document.getElementById('minimizeButton');

let templates = [];

function run() {
    // console.log('Running');

    let codeHTML  = document.getElementById('codeHTML').value;
    let codeJS    = document.getElementById('codeJS').value;
    let codeCSS   = '<style>' + document.getElementById('codeCSS').value + '</style>';
    let runCode   = document.getElementById('runCode');

    runCode.contentDocument.body.innerHTML = codeHTML + codeCSS;   

    // check syntax error of code
    let validCode = 1;
    try {
      eval(codeJS); // test js code
    } catch (error) {
      if (error instanceof SyntaxError) {
        validCode = 0;
        alert('Syntax Error: ' + error);
      }
    } finally {
      // console.log('validCode: ' + validCode);
      if (validCode) {
        // runCode.contentWindow.eval(codeJS);
      }
    }
    

    // add event listener to runCode
    runCode.addEventListener('load', function() {
        console.log('Loaded');
    });

    // add event listener to runCode
    runCode.addEventListener('error', function() {
        console.log('Error');
    });

  }
  // realtime run code
  // document.querySelector('#codeHTML').addEventListener('keyup', run);
  // document.querySelector('#codeCSS').addEventListener('keyup', run);
  // document.querySelector('#codeJS').addEventListener('keyup', run);

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

    // if template name not exist, add template
    if (templates.find((template) => template.templateName === templateName) === undefined) {
      templates.push(code);
    } else {
      // if template name exist, replace template
      const index = templates.findIndex((template) => template.templateName === templateName);
      templates[index] = code;
    }

    // save to local storage
    localStorage.setItem('templates', JSON.stringify(templates));

    // clear modal form
    saveCodeForm.reset();

    // close modal
    saveCodeModal.toggle();

    // regenerate template list
    buildTemplateList();
  }
  saveCodeForm.addEventListener('submit', saveCodeTemplate);


  // fetch templates from local storage
  function fetchTemplates() {
    const templateList = document.getElementById('templateList');
    // get templates from local storage if available
    if (localStorage.getItem('templates') !== null) {
      // console.log('templates found');
      templates = JSON.parse(localStorage.getItem('templates'));
    } else {
      // create empty array if no templates in local storage
      templates = [{
        templateName: 'Sample Template',
        codeHTML: HTML_CODE,
        codeCSS: CSS_CODE,
        codeJS: JS_CODE
      }, ];
      localStorage.setItem('templates', JSON.stringify(templates));    
    }
    // loop through templates and add to list
    buildTemplateList();
  }

  function buildTemplateList() {
    // build template list
    templates.forEach((template) => {
      const { templateName, codeHTML, codeCSS, codeJS } = template;
      // item
      const item = document.createElement('option');
      item.textContent = templateName;
      item.value = templateName;
      // console.log(item);
      templateList.appendChild(item);
    });

  }

  // onload fetch templates
  fetchTemplates();


  // load template with selected template name
  function loadTemplate(e) {
    e.preventDefault();
    const templateName = document.getElementById('templateList').value;
    const template = templates.find((template) => template.templateName === templateName);
    const { codeHTML, codeCSS, codeJS } = template;
    document.getElementById('codeHTML').value = codeHTML;
    document.getElementById('codeCSS').value = codeCSS;
    document.getElementById('codeJS').value = codeJS;

    // run code
    // run();
  }
  document.querySelector('#templateList').addEventListener('change', loadTemplate);

  // delete template
  function deleteTemplate(e) {
    e.preventDefault();
    const templateName = document.getElementById('templateList').value;
    const index = templates.findIndex((template) => template.templateName === templateName);
    templates.splice(index, 1);
    localStorage.setItem('templates', JSON.stringify(templates));

    // show toast message
    deletedTemplateToast.show();



    // regenerate template list
    buildTemplateList();
  }
  document.querySelector('#deleteTemplate').addEventListener('click', deleteTemplate);


  // save session to local storage
  function saveSession() {
    const codeHTML = document.getElementById('codeHTML').value;
    const codeCSS = document.getElementById('codeCSS').value;
    const codeJS = document.getElementById('codeJS').value;
    const code = {
      codeHTML: codeHTML,
      codeCSS: codeCSS,
      codeJS: codeJS
    };

    // save to local storage
    localStorage.setItem('session', JSON.stringify(code));
  }
  window.onbeforeunload = saveSession;

  // load session from local storage
  function loadSession() {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session !== null) {
      const { codeHTML, codeCSS, codeJS } = session;
      document.getElementById('codeHTML').value = codeHTML;
      document.getElementById('codeCSS').value = codeCSS;
      document.getElementById('codeJS').value = codeJS;

      // run code
      // run();
    }
  }
  window.onload = loadSession;

  // minimize code editor with minimize button
  function minimizeCodeEditor() {

    const codeViewer = document.getElementById('codeViewer');
    const codeEditor = document.getElementById('codeEditor');

    if (codeEditor.classList.contains('with-minimize')) {
      codeViewer.classList.remove('with-minimize');
      codeEditor.classList.remove('with-minimize');
    } else {
      codeViewer.classList.add('with-minimize');
      codeEditor.classList.add('with-minimize');
    }

  }
  // add event listener to minimize button
  minimizeButton.addEventListener('click', minimizeCodeEditor);

  // run code with run button
  runButton.addEventListener('click', run);


  // get keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // console.log(e.keyCode);
    if (e.keyCode === 83 && e.ctrlKey) {
      e.preventDefault();
      run();
    }
  });


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


  // self notes
  // - template liste duplicate imiş gibi gosteriyor