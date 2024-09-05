import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const MessageBox = ({ data, onClose }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    useEffect(() => {
        if (data && (data.error || data.message)) {
            const msg = data.error || data.message;
            setMessage(msg);
            setSeverity(data.error ? 'error' : 'success');
            setOpen(true);

            const timer = setTimeout(() => {
                setOpen(false);
                if (onClose) onClose(); 
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [data, onClose]);

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={() => setOpen(false)}
            sx={{zIndex: 99999,}}
        >
            <Alert onClose={() => setOpen(false)} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default MessageBox;
