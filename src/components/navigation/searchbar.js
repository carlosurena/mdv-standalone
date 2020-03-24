import React, { useState, useEffect } from 'react';
import { Input, AutoComplete } from 'antd';
import { useHistory } from 'react-router-dom';
const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat)
});

function Searchbar() {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [reshapedOptions, setReshapedOptions] = useState(null);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const history = useHistory();
  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    setLoading(true);
    const res = await fetch('/api/people');
    res
      .json()
      .then(res => {
        setLoading(false);
        setResponse(res);
        let reshape = [];
        res.map(person => {
          reshape.push({
            ...person,
            value: person.person_id,
            label: person.first_name + ' ' + person.last_name
          });
        });
        setReshapedOptions(reshape);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const filterOptions = query => {
    if (query) {
      const re = new RegExp(query.toUpperCase());
      setFilteredOptions(
        reshapedOptions.filter(item => {
          return re.test(item.label.toUpperCase());
        })
      );
    } else {
      setFilteredOptions([]);
    }
  };

  const onSearch = searchText => {
    filterOptions(searchText);
    setValue(searchText);
  };

  const onSelect = data => {
    history.push('/people/' + data);
    setValue('');
  };

  return (
    <div>
      <AutoComplete
        value={value}
        options={filteredOptions}
        onSelect={onSelect}
        onSearch={onSearch}
        style={{ minWidth: 100, maxWidth: 400 }}
        placeholder={'Search for people...'}
        onFocus={fetchPeople}
      />
    </div>
  );
}

export default Searchbar;
