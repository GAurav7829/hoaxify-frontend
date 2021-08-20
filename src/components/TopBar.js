import React from 'react';
import logo from '../assets/hoaxify-logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';

class TopBar extends React.Component {

    state = {
        dropdownVisible: false
    }

    componentDidMount() {
        document.addEventListener('click', this.onClickTracker);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClickTracker);
    }

    onClickTracker = (event) => {
        if (this.actionArea && !this.actionArea.contains(event.target)) {
            this.setState({ dropdownVisible: false });
        }
    }

    onClickDisplayName = () => {
        this.setState({ dropdownVisible: true });
    }

    onClickLogout = () => {
        this.setState({ dropdownVisible: false });
        const action = {
            type: 'logout-success'
        }
        this.props.dispatch(action);
    }

    onClickMyProfile = () => {
        this.setState({ dropdownVisible: false });
    }

    assignActionArea = (area) => {
        this.actionArea = area;
    }

    render() {
        let links = (
            <ul className='nav navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link to='/signup' className='nav-link'>Sign Up</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/login' className='nav-link'>Login</Link>
                </li>
            </ul>
        );
        if (this.props.user.isLoggedIn) {
            let dropDownClass = 'p-0 shadow dropdown-menu';
            if (this.state.dropdownVisible) {
                dropDownClass += ' show';
            }
            links = (
                <ul className='nav navbar-nav ml-auto' ref={this.assignActionArea}>
                    <li className='nav-item dropdown'>
                        <div className='d-flex' style={{ cursor: 'pointer' }} onClick={this.onClickDisplayName}>
                            <ProfileImageWithDefault
                                image={this.props.user.image}
                                className='rounded-circle m-auto'
                                width='32'
                                height='32'
                            />
                            <span className='nav-link dropdown-toggle'>{this.props.user.displayName}</span>
                        </div>
                        <div className={dropDownClass}>
                            <Link to={`/${this.props.user.username}`} className='dropdown-item' onClick={this.onClickMyProfile}>
                                <i className='fas fa-user text-info mr-2'></i>My Profile
                            </Link>
                            <span className='dropdown-item' onClick={this.onClickLogout} style={{ cursor: 'pointer' }}>
                                <i className='fas fa-sign-out-alt text-danger mr-2'></i>Logout
                            </span>
                        </div>
                    </li>
                </ul >
            );
        }
        return (
            <div className='bg-white shadow-sm mb-2'>
                <div className='container'>
                    <nav className='navbar navbar-light navbar-expand'>
                        <Link to='/' className='navbar-brand'>
                            <img src={logo} width='60' alt='hoaxify' />
                            Hoaxify
                        </Link>
                        {
                            links
                        }
                    </nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(TopBar);