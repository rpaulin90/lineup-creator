
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Link from "next/link";


const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
};

const Layout = props => (
    <div style={layoutStyle}>
        <Head>
            <link
                rel="stylesheet"
                href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
            />
        </Head>
        <h1>Hi</h1>
        {props.children}
    </div>
);

export default Layout;