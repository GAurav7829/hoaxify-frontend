import React from 'react';
import * as apiCalls from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';
import { connect } from 'react-redux';
import HoaxFeed from '../components/HoaxFeed';
import Spinner from '../components/Spinner';

class UserPage extends React.Component {
    state = {
        user: undefined,
        userNotFound: false,
        isLoadingUser: false,
        isEditMode: false,
        originalDisplayName: undefined,
        pendingUpdateCall: false,
        image: undefined,
        errors: {}
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
        this.setState({
            user,
            originalDisplayName: undefined,
            isEditMode: false,
            image: undefined,
            errors: {}
        });
    }
    onClickSave = () => {
        const userId = this.props.loggedInUser.id;
        const userUpdate = {
            displayName: this.state.user.displayName,
            image: this.state.image && this.state.image.split(',')[1]
        }
        this.setState({ pendingUpdateCall: true });
        apiCalls.updateUser(userId, userUpdate)
            .then(response => {
                const user = { ...this.state.user };
                user.image = response.data.image;
                this.setState({
                    isEditMode: false,
                    originalDisplayName: undefined,
                    pendingUpdateCall: false,
                    user,
                    image: undefined
                }, () => {
                    const action = {
                        type: 'update-success',
                        payload: user
                    }
                    this.props.dispatch(action);
                });
            }).catch(error => {
                let errors = {}
                if (error.response.data.validationErrors) {
                    errors = error.response.data.validationErrors;
                }
                this.setState({ pendingUpdateCall: false, errors });
            });
    }
    onChangeDisplayName = (event) => {
        const user = { ...this.state.user };
        let originalDisplayName = this.state.originalDisplayName;
        if (originalDisplayName === undefined) {
            originalDisplayName = user.displayName;
        }
        user.displayName = event.target.value;
        const errors = { ...this.state.errors };
        errors.displayName = undefined;
        this.setState({ user, originalDisplayName, errors });
    }
    onFileSelect = (event) => {
        if (event.target.files.length === 0) {
            return;
        }
        const errors = { ...this.state.errors };
        errors.image = undefined;
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                image: reader.result,
                errors
            });
        }
        reader.readAsDataURL(file);
    }
    render() {
        let pageContent;

        if (this.state.isLoadingUser) {
            pageContent = <Spinner />
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
                        loadedImage={this.state.image}
                        onFileSelect={this.onFileSelect}
                        errors={this.state.errors}
                    />}
            </div>);
        }
        return <div>
            <div className='row'>
                <div className='col'>
                    {pageContent}
                </div>
                <div className='col'>
                    <HoaxFeed user={this.props.match.params.username} />
                </div>
            </div>
        </div>;
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