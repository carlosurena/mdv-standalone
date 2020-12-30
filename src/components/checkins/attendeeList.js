import React, { useState, useEffect } from 'react';
import {List, Avatar, Spin, Button} from 'antd';
import { CheckOutlined } from '@ant-design/icons';

function AttendeeList(props) {
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [active, setActive] = useState(false);
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
            console.log(response)
          })
          .catch(err => {
            setLoading(false);
          });
      };


return(
    <div>
        {
            response && 
            (
                <List
                    dataSource={response}
                    className="whiteText"
                    renderItem={item => (
                    <List.Item key={item.person_id}>
                        
                        <List.Item.Meta
                        avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                    title={<a href="https://ant.design">{item.first_name} {item.last_name}</a>}
                        description={item.email}
                        />
                        <Button type={active ? "primary" : "default"} icon={<CheckOutlined/>} onClick={() => setActive(!active)} shape="circle"></Button>
                    </List.Item>
                    )}
            >
                {/* {loading && (
                <div className="demo-loading-container">
                    <Spin />
                </div>
                )} */}
            </List>
            )
        }
        
    </div>

);
}
export default AttendeeList