import React from 'react';
import { Link } from 'react-router-dom';


export const Header = () => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/">
                    <h1>ICan</h1>
                </Link>
                <Link to="/">
                    <h3>Trashcans</h3>
                </Link>
                <Link to="/garbagetruck">
                    <h3>Garbagetrucks</h3>
                </Link>

            </div>
        </div>
    </header>
);