import React, { useState } from 'react'
import SearchIcon from '../../../../assets/icons/search.svg';
import './search-bar.scss';

interface SearchBarProps {
  placeholder?: string
  className?: string;
  onSearch: (value: string) => void | Promise<void>;
}
export const SearchBar = (props: SearchBarProps) => {
  const { className, onSearch, placeholder } = props;
  const [value, setValue] = useState('')
  return (
    <div className={`search-bar ${className ?? ''}`}>
      <input value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} />
      <img src={SearchIcon} className='search-icon' alt='search' onClick={() => onSearch(value)} />
    </div>
  )
}
