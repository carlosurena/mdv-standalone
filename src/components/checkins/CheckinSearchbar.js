import React, { useState, useEffect } from 'react';
import { Input, AutoComplete } from 'antd';
import { useHistory } from 'react-router-dom';
const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat)
});

function CheckinSearchbar(props) {
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
      props.updateSearchResults(
        reshapedOptions.filter(item => {
          return re.test(item.label.toUpperCase());
        })
      );
    } else {
      props.updateSearchResults(filteredOptions)
    }
  };

  const onSearch = searchText => {
    filterOptions(searchText);
    setValue(searchText);
  };

  const onSelect = data => {
    if (props.mode === 'checkin') {
      console.log('checkin');
    } else {
      history.push('/people/' + data);
    }
    setValue('');
  };

  return (
    <div>
      <AutoComplete
        value={value}
        onSelect={onSelect}
        onSearch={onSearch}
        className="searchbar roundify"
        placeholder={'Search for people...'}
        onFocus={fetchPeople}
      />
    </div>
  );
}

export default CheckinSearchbar;
