import React, {useState} from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {MESSAGE_TYPE_ERROR, MessageType} from '../../../store/message/types';
import {AppState} from '../../../store';
import {connect} from 'react-redux';
import {login, register, setMail, setPassword, setUsername} from '../../../store/users/actions';
import {setMessage} from '../../../store/message/actions';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    textAlign: 'start'
  },
  heading: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    width: 300,
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(2)
  },
  formFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  submitButton: {
    width: 'fit-content'
  },
}));

interface Props {
  username: string;
  password: string;
  mail: string;
  login: () => void;
  register: () => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setMail: (mail: string) => void;
  setMessage: (text: string, type: MessageType) => void;
}

const Login: React.FC<Props> = ({username, password, mail, login, register, setMail, setUsername, setPassword, setMessage}) => {

  const classes = useStyles();

  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [mailError, setMailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [onLoginPage, setOnLoginPage] = useState<boolean>(true);
  const [heading, setHeading] = useState<string>('Login');
  const [buttonText, setButtonText] = useState<string>('Register');

  const handleUsernameInput = (input: string) => {
    setUsername(input);
    setUsernameError(input === '');
  };

  const handleMailInput = (input: string) => {
    setMail(input);
    setMailError(input === '');
  };

  const handlePasswordInput = (input: string) => {
    setPassword(input);
    setPasswordError(input === '');
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setUsernameError(username === '');
    setPasswordError(password === '');
    if (username === '' || password === '') {
      setMessage('Please fill in all the fields.', MESSAGE_TYPE_ERROR);
    } else {
      if (onLoginPage) {
        login();
      } else {
        register();
      }
      setUsername('');
      setPassword('');
      setMail('');
    }
  };

  const handleOnLoginPageChange = (event: any) => {
    event.preventDefault();
    if (onLoginPage) {
      setOnLoginPage(false);
      setHeading('Register');
      setButtonText('Login');
    } else {
      setOnLoginPage(true);
      setHeading('Login');
      setButtonText('Register');
    }
  };

  return (
    <>
      <CssBaseline/>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Jyra
          </Typography>
        </Toolbar>
      </AppBar>
      <Container max-width="sm">
        <Typography variant="h3" className={classes.heading}>{heading}</Typography>
        <Box className={classes.container}>
          <form className={classes.form}>
            <TextField
              label="Username"
              value={username}
              onChange={e => handleUsernameInput(e.target.value)}
              margin="dense"
              className={classes.textField}
              name="username"
              required
              error={usernameError}
            />
            {!onLoginPage && (
              <TextField
                label="Email"
                value={mail}
                onChange={e => handleMailInput(e.target.value)}
                margin="dense"
                className={classes.textField}
                name="email"
                error={mailError}
              />
            )}
            <TextField
              label="Password"
              value={password}
              onChange={e => handlePasswordInput(e.target.value)}
              margin="dense"
              type="password"
              className={classes.textField}
              name="password"
              required
              error={passwordError}
            />
            <Box className={classes.formFooter}>
              <Typography variant="body1">* Mandatory</Typography>
              <Button variant="contained" color="primary" type="submit"
                onClick={(e) => handleSubmit(e)}
                className={classes.submitButton}>{heading}</Button>
            </Box>
            <Box className={classes.formFooter}>
              <Button color="primary" type="submit"
                onClick={(e) => handleOnLoginPageChange(e)}
                className={classes.submitButton}>{buttonText} instead</Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

const mapStateToProps = ({users}: AppState) => ({
  username: users.username,
  password: users.password,
  mail: users.mail
});

const mapDispatchToProps = {
  setUsername: setUsername,
  setPassword: setPassword,
  setMail: setMail,
  login: login,
  register: register,
  setMessage: setMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
