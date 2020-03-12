import React, {useState} from 'react';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {AppState} from '../../../store';
import {setMyself} from '../../../store/users/actions';
import {connect} from 'react-redux';
import {User} from '../../../store/users/types';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AdminConsole from '../../molecules/adminconsole/AdminConsole';
import Boards from '../../molecules/boards/Boards';

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
  mainContainer: {
    display: 'flex',
    marginTop: theme.spacing(4)
  }
}));

interface Props {
  myself: User | null;
  setMyself: (myself: User | null) => void;
}

const Home: React.FC<Props> = ({myself, setMyself}) => {

  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleLogOut = () => {
    localStorage.removeItem('authorization');
    localStorage.removeItem('auth-timestamp');
    setMyself(null);
  };

  return (
    <>
      <CssBaseline/>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Jyra
          </Typography>
          <Box>
            {myself?.isAdmin && (
              <IconButton color="inherit" onClick={() => setOpenDialog(true)}>
                <PeopleOutlineIcon/>
              </IconButton>
            )}
            <IconButton color="inherit" onClick={handleLogOut}>
              <ExitToAppIcon/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="xl" className={classes.mainContainer}>
          <Boards/>
          <Grid container>
            <Typography>Issues</Typography>
          </Grid>
        </Container>
      </main>
      <AdminConsole open={openDialog} onClose={() => setOpenDialog(false)}/>
    </>
  );
};

const mapStateToProps = ({users}: AppState) => ({
  myself: users.myself,
});

const mapDispatchToProps = {
  setMyself: setMyself,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
