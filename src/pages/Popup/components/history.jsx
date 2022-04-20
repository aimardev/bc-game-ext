import React, { useEffect, useState } from 'react';
import './styles.scss';

export const History = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([
      { name: 'item 1', link: '' },
      { name: 'item 2', link: '' },
      { name: 'item 3', link: '' },
    ])
  }, [])

  return (
    <main>
      {!items.length && (
        <section className='history-item empty'>
          <p>No scanned files so far.</p>
          <p>Scan files using the context menu.</p>
        </section>
      )}
      {!items.length || items.map((item, idx) => (
        <section className='history-item' key={idx}>
          <a href={item.link} target='_blank' rel='noreferrer'>
            {item.name}
          </a>
        </section>
      ))}
    </main>
  )
}
