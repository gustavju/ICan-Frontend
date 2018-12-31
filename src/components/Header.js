import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTrashcans } from '../actions/trashcan';
import { setGarbagetrucks } from '../actions/garbagetruck';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.interval = setInterval(() => {
            this.updateTrash();
            this.updateGarbagetrucks();
        }, 3000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    updateTrash() {
        fetch('http://localhost:8500/getTrashcans').then(response => {
            response.json().then((data) => {
                console.log(data);
                this.props.setTrashcans(data);
            });
        });
    }
    updateGarbagetrucks() {
        fetch('http://localhost:8500/getGarbagetruck').then(response => {
            response.json().then((data) => {
                console.log(data);
                this.props.setGarbagetrucks(data);
            });
        });
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

const mapStateToProps = (state) => {
    return {
        trashcans: state.trashcans,
        garbagetrucks: state.garbagetrucks,
    }
};
const mapDispatchToProps = (dispatch) => ({
    setTrashcans: (trashcans) => dispatch(setTrashcans(trashcans)),
    setGarbagetrucks: (garbagetrucks) => dispatch(setGarbagetrucks(garbagetrucks))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
