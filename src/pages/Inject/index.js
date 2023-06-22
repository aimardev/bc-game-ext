import React from 'react';
import ReactDOM from 'react-dom';
import HistoryPanel from './components/HistoryPanel';
import { StorageAPI } from './helpers/storage';
import './index.scss';

var globalObj = {
  totAmount: 0,
  players: 0,
  isWin: false,
  isProgress: false,
  scrollWrap: null,
};
const KEY_CRASH_HISTORY = 'crash-history';

function handleTable({
  scrollWrap: table,
  totAmount: totalBet,
  players: players,
}) {
  // Get all the tr elements within the table
  const rows = Array.from(table.querySelectorAll('tr'));
  // Loop through each row
  const result = {
    summary: {
      totalBet: +parseCash(totalBet),
      players,
    },
  };
  const details = [];
  for (const row of rows) {
    const tds = Array.from(row.querySelectorAll('td'));
    const rowDetail = [];
    for (const td of tds) {
      const content = td.textContent;
      rowDetail.push(content);
    }
    details.push(rowDetail);
  }
  result.details = details;
  result.summary.totalProfit = details.reduce(
    (s, r) => +s + +parseCash(r[3]),
    0
  );
  return result;
}
function currentTimeStamp() {
  return Math.floor(Date.now() / 1000);
}
function pollingEvent() {
  const uiSwitch = document.querySelector('.all-bet .ui-switch');
  if (uiSwitch) {
    const type = uiSwitch.classList.contains('open');

    const updatedBCDataEvent = new CustomEvent('updatedBCDataEvent', {
      detail: {
        time: new Date(),
      },
    });
    const state = document.querySelector('.all-bet .state');

    if (type) {
      // trenball
    } else {
      // classic

      if (state) {
        const classList = state.classList;

        if (classList.contains('is-progress')) {
          globalObj.totAmount = document.querySelector(
            '.all-bet .state .amount'
          ).outerText;
          globalObj.players = document.querySelector(
            '.all-bet .state .players'
          ).outerText;
          globalObj.scrollWrap = document.querySelector(
            '.all-bet .scroll-wrap table'
          );
          globalObj.isWin = false;
        } else {
          if (!globalObj.isWin) {
            if (globalObj.scrollWrap) {
              const res = handleTable(globalObj);
              const history = StorageAPI.get(KEY_CRASH_HISTORY) || [];
              const data = {
                time: currentTimeStamp(),
                summary: res.summary,
              };
              history.push(data);
              StorageAPI.set(KEY_CRASH_HISTORY, history);
              updatedBCDataEvent.detail.type = 'CLASSIC';
              updatedBCDataEvent.detail.data = data;
              document.dispatchEvent(updatedBCDataEvent);
            }
          }
          globalObj.isWin = true;
          globalObj.isProgress = false;
        }
      }
    }
  }
}
function parseCash(v) {
  return v.replace(/[^0-9.-]+/g, '');
}

const editorBlockId = 'crash_history';
const editorBlockClass = 'crash_history';

const checkTheValidAddBlock = () => {
  const editorBlock = document.querySelector(`div[data-id="${editorBlockId}"]`);
  if (editorBlock) return false;

  return true;
};

const addEditorBlock = () => {
  const wrapperBlock = document.createElement('div');
  wrapperBlock.setAttribute('data-id', editorBlockId);
  wrapperBlock.setAttribute('class', editorBlockClass);
  document.getElementsByTagName('body')[0].appendChild(wrapperBlock);
  console.log('[wrapperBlock]', wrapperBlock);
};

function manipulateDOM() {
  if (checkTheValidAddBlock()) {
    addEditorBlock();
    console.log('[manipulateDOM]');
    const selector = document.querySelector(`div[data-id="${editorBlockId}"`);
    setInterval(pollingEvent, 70, selector);

    ReactDOM.render(<HistoryPanel />, selector);
  }

  // Add your own DOM manipulation code here
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'manipulateDOM') {
    manipulateDOM();
    sendResponse({ status: 'success' });
  }
});
