import React from 'react';
import * as apiCalls from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';
import { connect } from 'react-redux';

class UserPage extends React.Component {
    state = {
        user: undefined,
        userNotFound: false,
        isLoadingUser: false,
        isEditMode: false,
        originalDisplayName: undefined,
        pendingUpdateCall: false
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
    onClickEdit = () => {
        this.setState({ isEditMode: true });
    }
    onClickCancel = () => {
        const user = { ...this.state.user };
        if (this.state.originalDisplayName !== undefined) {
            user.displayName = this.state.originalDisplayName;
        }
        this.setState({ user, originalDisplayName: undefined, isEditMode: false });
    }
    onClickSave = () => {
        const userId = this.props.loggedInUser.id;
        const userUpdate = {
            displayName: this.state.user.displayName
        }
        this.setState({ pendingUpdateCall: true });
        apiCalls.updateUser(userId, userUpdate)
            .then(response => {
                this.setState({
                    isEditMode: false,
                    originalDisplayName: undefined,
                    pendingUpdateCall: false
                });
            }).catch(error => {
                this.setState({ pendingUpdateCall: false });
            });
    }
    onChangeDisplayName = (event) => {
        const user = { ...this.state.user };
        let originalDisplayName = this.state.originalDisplayName;
        if (originalDisplayName === undefined) {
            originalDisplayName = user.displayName;
        }
        user.displayName = event.target.value;
        this.setState({ user, originalDisplayName });
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
            const isEditable = this.props.loggedInUser.username === this.props.match.params.username;
            pageContent = (<div>
                {this.state.user &&
                    <ProfileCard
                        user={this.state.user}
                        isEditable={isEditable}
                        isEditMode={this.state.isEditMode}
                        onClickEdit={this.onClickEdit}
                        onClickCancel={this.onClickCancel}
                        onClickSave={this.onClickSave}
                        onChangeDisplayName={this.onChangeDisplayName}
                        pendingUpdateCall={this.state.pendingUpdateCall}
                    />}
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

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}

export default connect(mapStateToProps)(UserPage);