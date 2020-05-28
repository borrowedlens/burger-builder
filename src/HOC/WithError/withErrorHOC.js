import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios';

const withErrorHOC = (WrappedComponent) => {
    return (props) => {
        const [error, setError] = useState(null);
        const reqInterceptor = axios.interceptors.request.use((req) => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(
            (res) => res,
            (err) => {
                setError(err);
            }
        );
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);
        const errorClearHandler = () => {
            setError(null);
        };
        return (
            <>
                <Modal show={error} toggle={errorClearHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        );
    };
};

export default withErrorHOC;
