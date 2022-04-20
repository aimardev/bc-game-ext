import React from 'react';
import { ScanInfo } from '../../types';
import { formatTime } from '../../helper/time';
import './history-table.scss';

interface HistoryTableProps {
  data: ScanInfo[];
  onSelect: (idx: number) => void;
}
export const HistoryTable = (props: HistoryTableProps) => {
  const { data, onSelect } = props;
  return (
    <table className='history-table'>
      <thead>
        <tr className='table-header'>
          <th className='header__item'>Name</th>
          <th className='header__item'>Created</th>
          <th className='header__item'>Result</th>
          <th className='header__item'>Status</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((info, idx) => (
          <tr className='history-item' key={idx} onClick={() => onSelect(idx)}>
            <td className='item__name'>
              <span className='name'>{info.name}</span>
              <span className='hash'>{info.hash}</span>
            </td>
            <td className='item__time'>
              {formatTime(info.created)}
            </td>
            <td className='item__result'>
              {info.result}
            </td>
            <td className='item__status'>
              {info.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
