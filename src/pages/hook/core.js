var totAmount = 0;
var isWin = false;
var isProgress = false;
var scrollWrap = null;

const storage = {
  set: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: function (key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  remove: function (key) {
    localStorage.removeItem(key);
  },
};

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
              const history = storage.get('classic-data') || [];
              history.push({
                time: currentTimeStamp(),
                summary: res.summary,
              });
              storage.set('classic-data', history);
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

setInterval(myCallback, 70);
