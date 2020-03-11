import React, {useEffect} from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {orange, teal} from '@material-ui/core/colors';
import Login from '../pages/login/Login';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import {User} from '../../store/users/types';
import {fetchMyself} from '../../store/users/actions';
import Home from '../pages/home/Home';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange,
  }
});

interface Props {
  myself: User | null;
  fetchMyself: () => void;
}

const App: React.FC<Props> = ({myself, fetchMyself}) => {

  useEffect(() => {
    const timestamp = Number(localStorage.getItem('auth-timestamp'));
    if (timestamp) {
      const valid = (timestamp - new Date().getTime()) < 800_000_000;
      if (!valid) {
        localStorage.removeItem('authorization');
        localStorage.removeItem('auth-timestamp');
      } else {
        if (myself === null) {
          fetchMyself();
        }
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {myself === null
        ? <Login/>
        : <Home/>
      }
    </ThemeProvider>
  );
};

const mapStateToProps = ({users}: AppState) => ({
  myself: users.myself
});

const mapDispatchToProps = {
  fetchMyself: fetchMyself,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
