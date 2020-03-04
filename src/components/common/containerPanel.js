import React, { useState } from 'react';
import { Col, PageHeader, Descriptions } from 'antd';
import { Link } from 'react-router-dom'

const style = {
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    minHeight: "100px",
    minWidth: "100px"
}

function ContainerPanel(props) {


    return (
        <Col xs={24} md={props.size * 8}>
            <div style={style}>
                <PageHeader
                    title={props.title} />
                <div style={ {padding: "16px 24px"}}>
                    {props.children}

                </div>

            </div>

        </Col>

    );
}

export default ContainerPanel
