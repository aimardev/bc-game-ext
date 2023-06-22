import { KEY_CRASH_HISTORY } from '../config';
import { StorageAPI } from './storage';

function currentTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

const MAX_COUNT = 100;

export const pushToLocalStorage = ({ data, issueText, type }) => {
  let history = StorageAPI.get(KEY_CRASH_HISTORY) || {};
  if (Array.isArray(history)) history = {};
  // const currentTime = currentTimeStamp();
  // const lastItem = keys.length > 0 ? keys[keys.length - 1] : null;
  const keys = Object.keys(history).sort();
  if (issueText) {
    if (!history[issueText]) history[issueText] = {};
    if (type == 'CLASSIC') {
      history[issueText].summary = data;
    } else history[issueText].trenball = data;
  }

  if (keys.length >= MAX_COUNT) {
    const delCount = history.length - MAX_COUNT;
    key.splice(0, delCount).map((key) => delete history[key]);
  }
  console.log('[history]', history);
  StorageAPI.set(KEY_CRASH_HISTORY, history);
};
