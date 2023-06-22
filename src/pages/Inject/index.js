import HistoryPanel from './components/HistoryPanel';
import { StorageAPI } from './helpers/storage';
import './index.scss';

var totAmount = 0;
var isWin = false;
var isProgress = false;
var scrollWrap = null;
const KEY_CRASH_HISTORY = 'crash-history';

function handleTable(table, totalBet, players) {
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
function myCallback() {
  const uiSwitch = document.querySelector('.all-bet .ui-switch');
  if (uiSwitch) {
    const type = uiSwitch.classList.contains('open');
    const state = document.querySelector('.all-bet .state');

    if (type) {
      // trenball
    } else {
      // classic

      if (state) {
        const classList = state.classList;

        if (classList.contains('is-progress')) {
          totAmount = document.querySelector(
            '.all-bet .state .amount'
          ).outerText;
          players = document.querySelector(
            '.all-bet .state .players'
          ).outerText;
          scrollWrap = document.querySelector('.all-bet .scroll-wrap table');
          isWin = false;
        } else {
          if (!isWin) {
            if (scrollWrap) {
              const res = handleTable(scrollWrap, totAmount, players);
              console.log(res);
              const history = StorageAPI.get(KEY_CRASH_HISTORY) || [];
              history.push({
                time: currentTimeStamp(),
                summary: res.summary,
              });
              StorageAPI.set(KEY_CRASH_HISTORY, history);
            }
          }
          isWin = true;
          isProgress = false;
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
    setInterval(myCallback, 70);
    ReactDOM.render(
      <HistoryPanel />,
      window.document.querySelector(`div[data-id="${editorBlockId}"`)
    );
  }

  // Add your own DOM manipulation code here
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'manipulateDOM') {
    manipulateDOM();
    sendResponse({ status: 'success' });
  }
});
