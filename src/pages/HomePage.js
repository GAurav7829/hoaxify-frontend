import React from 'react';
import HoaxSubmit from '../components/HoaxSubmit';
import UserList from '../components/UserList';
import { connect } from 'react-redux';
import HoaxFeed from '../components/HoaxFeed';

class HomePage extends React.Component {
    render() {
        return (<div>
            <div className='row'>
                <div className='col-8'>
                    {this.props.loggedInUser.isLoggedIn && <HoaxSubmit />}
                    <HoaxFeed />
                </div>
                <div className='col-4'>
                    <UserList />
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(HomePage);