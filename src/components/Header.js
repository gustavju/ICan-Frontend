import React from 'react';
import { Link, NavLink } from 'react-router-dom';


export const Header = () => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/">
                    <h1>ICan</h1>
                </Link>
                <NavLink activeClassName="is-active" exact={true} className="header__link" to="/">
                    <h4>Trashcans</h4>
                </NavLink>
                <NavLink activeClassName="is-active" className="header__link" to="/garbagetruck">
                    <h4>Garbagetrucks</h4>
                </NavLink>

            </div>
        </div>
    </header>
);
