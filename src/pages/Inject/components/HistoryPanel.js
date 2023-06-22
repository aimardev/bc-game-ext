import React from 'react';
import { useEffect } from 'react';

const HistoryPanel = () => {
  function handleUpdatedBCDataEvent(event) {
    console.log('Received myEvent:', event.detail);
  }

  useEffect(() => {
    // Add a custom event listener when the component mounts
    document.addEventListener('updatedBCDataEvent', handleUpdatedBCDataEvent);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener(
        'updatedBCDataEvent',
        handleUpdatedBCDataEvent
      );
    };
  }, []);

  return (
    <section>
      <h1>HistoryPanel</h1>
      <div>
        <table>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </table>
      </div>
    </section>
  );
};

export default HistoryPanel;
