const jobDescriptionClassName = 'cfe-ui-job-details-content';
const editorBlockId = 'upwork-editor-block';
const editorBlockClass = 'upwork-editor-block';

const checkTheValidAddBlock = () => {
  // const results = document.getElementsByClassName(jobDescriptionClassName)
  // if (results.length < 1) return false
  const editorBlock = document.getElementById(editorBlockId);
  if (editorBlock) return false;

  const curUrl = window.location.href;
  const matchURL = `https://www.upwork.com/jobs/`;

  if (!curUrl.startsWith(matchURL)) {
    return false;
  }

  return true;
};

const addEditorBlock = () => {
  const wrapperBlock = document.createElement('div');
  wrapperBlock.setAttribute('id', editorBlockId);
  wrapperBlock.setAttribute('class', editorBlockClass);

  document.getElementsByTagName('body')[0].appendChild(wrapperBlock);
};

if (checkTheValidAddBlock()) {
  addEditorBlock();
}

console.log('[storage] this is injected');
