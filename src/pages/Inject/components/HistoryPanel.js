import React from 'react';
import { useEffect, useState } from 'react';
import { StorageAPI } from '../helpers/storage';

import { KEY_CRASH_HISTORY } from '../config';

const HistoryPanel = () => {
  const [history, setHistory] = useState([]);

  function handleUpdatedBCDataEvent() {
    const data = StorageAPI.get(KEY_CRASH_HISTORY);
    if (data) {
      setHistory(
        Object.keys(data)
          .sort()
          .reverse()
          .splice(0, 5)
          .map((key) => ({ key, ...data[key] }))
      );
    }
  }

  useEffect(() => {
    // Add a custom event listener when the component mounts
    document.addEventListener('updatedBCDataEvent', handleUpdatedBCDataEvent);

    handleUpdatedBCDataEvent();

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener(
        'updatedBCDataEvent',
        handleUpdatedBCDataEvent
      );
    };
  }, []);
  console.log('[history]', history);

  return (
    <section>
      <h1>HistoryPanel</h1>
      <div>
        <table className="history-table">
          <thead>
            <tr>
              <td></td>
              <td>Red</td>
              <td>Green</td>
              <td>Classic</td>
            </tr>
          </thead>
          <tbody>
            {history.map((row, i) => (
              <React.Fragment key={row.key}>
                <tr>
                  <td rowSpan={2}>{row.key}</td>
                  <td>{row.trenball?.red?.bet?.toFixed(2) || '-'}</td>
                  <td>{row.trenball?.green?.bet?.toFixed(2) || '-'}</td>
                  <td>{row.summary?.totalBet?.toFixed(2) || '-'}</td>
                </tr>
                <tr>
                  <td>{row.trenball?.red?.profit?.toFixed(2) || '-'}</td>
                  <td>{row.trenball?.green?.profit?.toFixed(2) || '-'}</td>
                  <td>{row.summary?.totalProfit?.toFixed(2) || '-'}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HistoryPanel;
