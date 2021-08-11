import React from 'react';
import * as apiCalls from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';

class UserPage extends React.Component {
    state = {
        user: undefined,
        userNotFound: false,
        isLoadingUser: false
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.username !== this.props.match.params.username) {
            this.loadUser();
        }
    }
    componentDidMount() {
        this.loadUser();
    }
    loadUser = () => {
        const username = this.props.match.params.username;
        if (!username) {
            return;
        }
        this.setState({ isLoadingUser: true })
        apiCalls.getUser(username).then(response => {
            this.setState({ user: response.data, userNotFound: false, isLoadingUser: false });
        }).catch(error => {
            this.setState({ userNotFound: true });
        });
    }
    render() {
        let pageContent;

        if (this.state.isLoadingUser) {
            pageContent = <div className="d-flex">
                <div className="spinner-border text-black-50 m-auto">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        } else if (this.state.userNotFound) {
            pageContent = <div className="alert alert-danger text-center">
                <div className="alert-heading"><i className="fas fa-exclamation-triangle fa-3x"></i></div>
                <h5>User Not Found</h5>
            </div>
        } else {
            pageContent = (<div>
                {this.state.user && <ProfileCard user={this.state.user} />}
            </div>);
        }
        return pageContent;
    }
}

UserPage.defaultProps = {
    match: {
        params: {}
    }
}

export default UserPage;