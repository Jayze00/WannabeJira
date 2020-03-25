import React, {useState} from 'react';
import {
  Backdrop,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Issue} from '../../../store/issues/types';
import {Draggable} from 'react-beautiful-dnd';
import {deleteIssue, updateIssue} from '../../../store/issues/actions';
import {connect} from 'react-redux';
import {AppState} from '../../../store';
import {User} from '../../../store/users/types';
import {Board} from '../../../store/boards/types';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  select: {
    margin: theme.spacing(1, 0)
  }
}));

interface Props {
  issue: Issue;
  index: number;
  userCollection: User[];
  myself: User | null;
  updateIssue: (issue: Issue) => void;
  deleteIssue: (issue: Issue) => void;
  selectedBoard: Board | null;
}

const DraggableIssue: React.FC<Props> = ({issue, index, userCollection, myself, updateIssue, deleteIssue, selectedBoard}) => {

  const classes = useStyles();

  const [editIssue, setEditIssue] = useState<Issue | null>(null);

  const handleUpdateIssue = () => {
    if (editIssue) {
      updateIssue(editIssue);
    }
    setEditIssue(null);
  };

  const handleDeleteIssue = () => {
    if (editIssue) {
      deleteIssue(editIssue);
    }
    setEditIssue(null);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editIssue) {
      setEditIssue({...editIssue, title: event.target.value});
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editIssue) {
      setEditIssue({...editIssue, description: event.target.value});
    }
  };

  const handleUserChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (editIssue && myself) {
      setEditIssue({
        ...editIssue,
        user: userCollection.find(user => String(user.id) === event.target.value as string) || myself
      });
    }
  };

  return (
    <>
      <CssBaseline/>
      <Draggable draggableId={String(issue.id)} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setEditIssue(issue)}
          >
            <Paper className={classes.paper}>
              <Typography variant="h6">{issue.title}</Typography>
              <Typography>Assignee: {issue.user.username}</Typography>
            </Paper>
          </div>
        )}
      </Draggable>
      <Backdrop className={classes.backdrop} open={!!editIssue}>
        <Box>
          <Dialog open={!!editIssue} onClose={() => setEditIssue(null)}>
            <DialogTitle id="form-dialog-title">Edit Issue</DialogTitle>
            <DialogContent>
              <Box display="flex" flexDirection="column" minWidth={300}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="displayName"
                  label="Title"
                  value={editIssue?.title || ''}
                  onChange={handleTitleChange}
                  disabled={!selectedBoard?.open}
                />
                <TextField
                  margin="dense"
                  id="description"
                  label="Description"
                  multiline
                  value={editIssue?.description || ''}
                  onChange={handleDescriptionChange}
                  disabled={!selectedBoard?.open}
                />
                <FormControl className={classes.select}>
                  <InputLabel id="select-user-label">Assignee</InputLabel>
                  <Select
                    labelId="select-user-label"
                    id="demo-simple-select"
                    value={editIssue?.user.id || ''}
                    onChange={handleUserChange}
                    disabled={!selectedBoard?.open}
                  >
                    {userCollection.map(user => (
                      <MenuItem value={user.id} key={user.id}>{user.username}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            {selectedBoard?.open && (
              <DialogActions>
                <Button onClick={() => setEditIssue(null)}>
                  Cancel
                </Button>
                <Button onClick={handleDeleteIssue} variant="outlined">
                  Delete
                </Button>
                <Button onClick={handleUpdateIssue} color="primary" variant="contained">
                  Submit
                </Button>
              </DialogActions>
            )}
          </Dialog>
        </Box>
      </Backdrop>
    </>
  );
};

const mapStateToProps = ({users, issues}: AppState) => ({
  userCollection: users.users,
  myself: users.myself,
  selectedBoard: issues.selectedBoard
});

const mapDispatchToProps = {
  updateIssue: updateIssue,
  deleteIssue: deleteIssue
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableIssue);
