import React from 'react';
import { HistoryTable } from '../../components/table/history-table';
import { getHistory } from 'pages/Background/helper/storage';

export const History = () => {
  return (
    <>
      <section>
        <h3 className="status">BC Game History</h3>
      </section>

      <section className="table-container">
        <HistoryTable data={[]} />
      </section>
    </>
  );
};
