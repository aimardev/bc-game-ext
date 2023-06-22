import React from 'react';
import ReactDOM from 'react-dom';
import HistoryPanel from './components/HistoryPanel';
import { StorageAPI } from './helpers/storage';
import { KEY_CRASH_HISTORY } from './config';

import './index.scss';
import { pushToLocalStorage } from './helpers/itemService';

var globalObj = {
  totAmount: 0,
  players: 0,
  isWin: false,
  isProgress: false,
  scrollWrap: null,
  lastIssueText: '',
};

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

function pollingEvent() {
  const uiSwitch = document.querySelector('.all-bet .ui-switch');
  if (uiSwitch) {
    const type = uiSwitch.classList.contains('open');

    const updatedBCDataEvent = new CustomEvent('updatedBCDataEvent', {
      detail: {
        time: new Date(),
      },
    });
    const issueSelector = document.querySelector(
      '.recent-list .game-item:last-child .issus'
    );
    if (!issueSelector) return;
    const issueText = issueSelector.innerText;

    if (type) {
      // trenball
      if (issueText) {
        if (!globalObj.lastIssueText || globalObj.lastIssueText == issueText) {
          globalObj.lastIssueText = issueText;
          globalObj.rgNums = Array.from(
            document.querySelectorAll('.info-wrap .info .his .nums')
          ).map((e) => +parseCash(e.innerText));
          globalObj.isWin = false;
        } else {
          if (!globalObj.isWin) {
            const valueText = document.querySelector(
              '.recent-list .game-item:last-child div:last-child'
            ).innerText;
            const bangValue = +parseCash(valueText);
            try {
              const [redBet, greenBet] = globalObj.rgNums;
              const data = {
                red: {
                  bet: redBet,
                  profit: bangValue < 2.0 ? redBet * 0.99 : 0,
                },
                green: {
                  bet: greenBet,
                  profit: bangValue >= 2.0 ? greenBet : 0,
                },
              };
              pushToLocalStorage({ data, issueText, type: 'TRENBALL' });
              document.dispatchEvent(updatedBCDataEvent);
            } catch (error) {
              console.log(error);
            }

            globalObj.isWin = true;
          }
        }
      }
    } else {
      // classic
      const state = document.querySelector('.all-bet .state');

      if (state) {
        const classList = state.classList;

        if (classList.contains('is-progress')) {
          const totAmountSelector = document.querySelector(
            '.all-bet .state .amount'
          );
          if (totAmountSelector) {
            globalObj.totAmount = totAmountSelector.outerText;
          }
          const playersSelector = document.querySelector(
            '.all-bet .state .players'
          );
          if (playersSelector) {
            globalObj.players = playersSelector.outerText;
          }
          globalObj.scrollWrap = document.querySelector(
            '.all-bet .scroll-wrap table'
          );
          globalObj.isWin = false;
        } else {
          if (!globalObj.isWin) {
            if (globalObj.scrollWrap) {
              const res = handleTable(globalObj);
              pushToLocalStorage({
                data: res.summary,
                type: 'CLASSIC',
                issueText,
              });
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
