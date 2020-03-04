import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

function Searchbar() {

    return (
        <div>
            <Search
                placeholder="Search for someone..."
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
            />
        </div>
    );
}

export default Searchbar
