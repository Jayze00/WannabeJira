import React, {useEffect} from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch
} from '@material-ui/core';
import {AppState} from '../../../store';
import {fetchUsers, setIsAdmin, setMyself} from '../../../store/users/actions';
import {connect} from 'react-redux';
import {User} from '../../../store/users/types';

interface Props {
  open: boolean;
  users: User[];
  onClose: () => void;
  fetchUsers: () => void;
  setIsAdmin: (user: User, isAdmin: boolean) => void;
}

const Home: React.FC<Props> = ({open, users, onClose, fetchUsers, setIsAdmin}) => {

  useEffect(() => {
    fetchUsers();
  }, [open, fetchUsers]);

  return (
    <>
      <CssBaseline/>
      <Dialog open={open} onClose={onClose} scroll="paper" fullWidth={true}>
        <DialogTitle>Admin Console</DialogTitle>
        <DialogContent>
          <List>
            <ListSubheader>
              <Box display="flex" justifyContent="space-between">
                <Box>User</Box>
                <Box>is Admin</Box>
              </Box>
            </ListSubheader>
            {users.map(user => (
              <ListItem key={user.id}>
                <ListItemText>{user.username}</ListItemText>
                <ListItemSecondaryAction>
                  <Switch
                    checked={user.isAdmin}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsAdmin(user, event.target.checked)}
                    value={user}
                    inputProps={{'aria-label': 'secondary checkbox'}}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = ({users}: AppState) => ({
  users: users.users,
});

const mapDispatchToProps = {
  setMyself: setMyself,
  fetchUsers: fetchUsers,
  setIsAdmin: setIsAdmin
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
