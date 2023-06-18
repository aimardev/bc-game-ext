import React from 'react';
import { GameInfo } from '../../types';
import { formatTime } from '../../helper/time';
import './history-table.scss';

interface HistoryTableProps {
  data: GameInfo[];
}
export const HistoryTable = (props: HistoryTableProps) => {
  const { data } = props;
  return (
    <table className="history-table">
      <thead>
        <tr className="table-header">
          <th className="header__item">Time</th>
          <th className="header__item">Classic</th>
          <th className="header__item">Red Ball</th>
          <th className="header__item">Green Ball</th>
        </tr>
      </thead>
      <tbody>
        {/* {data?.map((info, idx) => (
          <tr className="history-item" key={idx}>
            <td className="item__name">
              <span className="name">{info.name}</span>
              <span className="hash">{info.hash}</span>
            </td>
            <td className="item__time">{formatTime(info.created)}</td>
            <td className="item__result">{info.result}</td>
            <td className="item__status">{info.status}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};
