import React, { Component } from 'react';
import ButtonWithProgress from './ButtonWithProgress';

export class Modal extends Component {
    render() {
        const {
            title,
            body,
            visible,
            okButton,
            cancelButton,
            onClickOk,
            onClickCancel,
            pendingApiCall
        } = this.props;
        let rootClass = 'modal fade';
        let rootStyle;
        if (visible) {
            rootClass += ' d-block show';
            rootStyle = { backgroundColor: '#000000b0' };
        }

        return (
            <div className={rootClass} style={rootStyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                        </div>
                        <div className="modal-body">
                            {body}
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-secondary"
                                disabled={pendingApiCall}
                                onClick={onClickCancel}>
                                {cancelButton}
                            </button>
                            <ButtonWithProgress type="button"
                                className="btn btn-danger"
                                disabled={pendingApiCall}
                                onClick={onClickOk}
                                pendingApiCall={pendingApiCall}
                                text={okButton}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Modal.defaultProps = {
    okButton: 'OK',
    cancelButton: 'Cancel'
}

export default Modal;
