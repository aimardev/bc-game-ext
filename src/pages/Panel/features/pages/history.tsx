import React from 'react'
import { HistoryTable } from '../../components/table/history-table';
import { SearchBar } from '../../components/base/search-bar';
import { Button } from '../../components/base/button';

const HISTORY_DATA = [
  {
    name: 'code-editors',
    hash: '46BFBE78689AB2A20195E7204140E95EC1E54DDECD4E611AD97D860EEE089F3B',
    created: new Date(2022, 3, 11, 18, 32),
    result: 'No threats found',
    status: 'completed'
  }
]
export const History = () => {
  const onSearch = (value: string) => {

  }

  const onSelect = (idx: number) => {

  }

  const onClear = async () => {

  }

  return (
    <>
      <section className='search-container'>
        <SearchBar onSearch={onSearch} className='search' placeholder='Search history' />
      </section>
      <section className='status-container'>
        <span className='status'>1 file scanned</span>
        <Button onClick={onClear} isOutlined variant='danger'>
          Clear Scan History
        </Button>
      </section>
      <section className='table-container'>
        <HistoryTable data={HISTORY_DATA} onSelect={onSelect} />
      </section>
    </>
  )
}
