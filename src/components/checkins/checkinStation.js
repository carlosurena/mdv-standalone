import React from 'react';
import CheckinHeader from './checkinHeader';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

function CheckinStation() {
  const history = useHistory();

  return (
    <div className="station">
      <CheckinHeader />
      <Button onClick={() => history.goBack()}>back</Button>
      checkin station
    </div>
  );
}

export default CheckinStation;
