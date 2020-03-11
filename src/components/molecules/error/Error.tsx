import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Snackbar} from '@material-ui/core';
import {AppState} from '../../../store';
import {setIsOpen} from '../../../store/message/actions';
import {Message, MESSAGE_TYPE_INFO, MessageType} from '../../../store/message/types';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

interface Props {
  message: Message;
  setOpenMessage: (isOpen: boolean) => void;
}

const Error: React.FC<Props> = ({message, setOpenMessage}) => {

  const [severity, setSeverity] = useState<MessageType>(MESSAGE_TYPE_INFO);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenMessage(false);
  };

  useEffect(() => {
    setSeverity(message.type);
  }, [message]);

  return (
    <>
      <Snackbar open={message.isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message.text}
        </Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = ({message}: AppState) => ({
  message
});

const mapDispatchToProps = {
  setOpenMessage: setIsOpen
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
