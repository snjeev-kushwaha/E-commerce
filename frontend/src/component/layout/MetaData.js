import React from 'react';
import { Helmet } from "react-helmet";

const MetaData = ({title}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    )
}

export default MetaData