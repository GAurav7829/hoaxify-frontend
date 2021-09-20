import React, { useState, useEffect, useCallback } from 'react';
import * as apiCalls from '../api/apiCalls';
import UserListItem from './UserListItem';

const UserList = () => {
    const [page, setPage] = useState({
        content: [],
        number: 0,
        size: 3
    });

    const [loadError, setLoadError] = useState();

    const loadData = useCallback(
        (requestPage = 0) => {
            apiCalls.listUsers({ page: requestPage, size: page.size })
                .then((response) => {
                    setPage(response.data);
                    setLoadError();
                })
                .catch(error => {
                    setLoadError('User load failed');
                });
        }, [page.size]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const onClickNext = () => {
        loadData(page.number + 1)
    }

    const onClickPrevious = () => {
        loadData(page.number - 1)
    }

    const { content, first, last } = page;

    return (
        <div className='card'>
            <h3 className='card-title m-auto'>Users</h3>
            <div className='list-group list-group-flush'>
                {
                    content.map(user => {
                        return <UserListItem key={user.username} user={user} />
                    })
                }
            </div>
            <div className='clearfix'>
                {!first && <span className='badge badge-light float-left' style={{ cursor: 'pointer' }} onClick={onClickPrevious}>{'< previous'}</span>}
                {!last && <span className='badge badge-light float-right' style={{ cursor: 'pointer' }} onClick={onClickNext}>{'next >'}</span>}
            </div>
            {loadError && <span className='text-center text-danger'>{loadError}</span>}
        </div>
    );
}

export default UserList;