import React from 'react';
import ReactDOM from 'react-dom';

import { ProposalPanel } from './Panel';
import './index.scss';

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
  ReactDOM.render(
    <ProposalPanel />,
    window.document.querySelector(`#${editorBlockId}`)
  );
}
