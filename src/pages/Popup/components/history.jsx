import React, { useEffect, useState } from 'react';
// import { getHistory } from '../../helper/storage';

import './styles.scss';

export const History = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // const intervalId = setInterval(async () => {
    //   getHistory().then((history) => setItems(history));
    // }, 99);
    // return () => clearInterval(intervalId);
  }, []);
  console.log(items);

  return (
    <main>
      {!items.length && (
        <section className="history-item empty">
          <p>No scanned files so far.</p>
          <p>Scan files using the context menu.</p>
        </section>
      )}
    </main>
  );
};
