import { GameInfo } from 'pages/Panel/types';
import { storage } from './base';

const KEY_CRASH_HISTORY = 'crash-history';

export async function addHistory(item: GameInfo) {
  try {
    const history = await getHistory();

    if (history.length >= 1000) {
      history.shift();
    }
    const history1 = history as GameInfo[];
    history1.push(item);
    await saveHistory(history1);
  } catch (error) {
    console.log(error);
  }
  return true;
}

export async function saveHistory(items: GameInfo[]) {
  return storage.set(KEY_CRASH_HISTORY, items);
}

export async function getHistory() {
  const data = await storage.get(KEY_CRASH_HISTORY);
  if (!data) {
    return [];
  }

  return data;
}
