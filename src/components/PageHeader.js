import React from 'react';

const PageHeader = ({ title, subTitle, data }) => (
    <div className="page-header">
        <div className="content-container">
            <h2 className="page-header__title">{title}</h2>
            <h3 className="page-header__subtitle"><span>{data}</span> {subTitle}</h3>
        </div>
    </div>
);

export default PageHeader;
