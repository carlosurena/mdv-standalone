import React, { useState } from 'react';
import { Col, PageHeader, Descriptions } from 'antd';
import { Link } from 'react-router-dom'
import {colors} from './theme'

function ContainerPanel(props) {

    
    const rootStyle = {
        backgroundColor: props.background ? (props.background) : (colors.white),
        borderRadius: "5px",
        height: '100%',
        minWidth: "100px",
        "& div" : {
            padding: "16px 24px"
        }
    };

    const descStyle = {
        padding : props.noPadding ? ("0") : ("16px 24px"),
        display: 'block',
        height: '100%'
    };

    return (
        <Col xs={24} md={props.size * 8}>
            <div style={rootStyle}>
                {
                    (
                        props.title ? (
                            <PageHeader title={props.title} />
                        ) :
                            null
                    )
                }

                <div style={descStyle}>
                    {props.children}

                </div>

            </div>

        </Col>

    );
}

export default ContainerPanel
