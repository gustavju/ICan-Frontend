import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateTrashcans } from '../actions/trashcan';
import { updateGarbagetrucks } from '../actions/garbagetruck';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.interval = setInterval(() => {
            this.props.updateTrashcans();
            this.props.updateGarbagetrucks();
        }, 3000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
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
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateTrashcans: () => dispatch(updateTrashcans()),
    updateGarbagetrucks: () => dispatch(updateGarbagetrucks())
});

export default connect(undefined, mapDispatchToProps, undefined, { pure: false })(Header);
