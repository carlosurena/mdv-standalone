import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

function Searchbar() {
  return (
    <div>
      <Search placeholder="Search for someone..." onSearch={value => console.log(value)} style={{ maxWidth: 300 }} />
    </div>
  );
}

export default Searchbar;
