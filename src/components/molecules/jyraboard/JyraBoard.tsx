import React, {useEffect, useState} from 'react';
import {
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
  Select,
  TextField,
  Theme,
  Typography, useTheme
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {AppState} from '../../../store';
import {connect} from 'react-redux';
import {Board} from '../../../store/boards/types';
import {
  Issue,
  ISSUE_STATUS_DONE,
  ISSUE_STATUS_IN_PROGRESS,
  ISSUE_STATUS_TO_DO,
  IssueCollection,
  NewIssue
} from '../../../store/issues/types';
import {
  createIssue,
  deleteIssue,
  fetchIssues,
  setNewIssue,
  updateIssue
} from '../../../store/issues/actions';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import DraggableIssue from '../draggableissue/DraggableIssue';
import {User} from '../../../store/users/types';

const useStyles = makeStyles((theme: Theme) => ({
  column: {
    padding: theme.spacing(2, 1),
    margin: theme.spacing(1),
    width: theme.spacing(42),
    backgroundColor: theme.palette.grey['100'],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  columnHeader: {
    marginBottom: theme.spacing(2)
  },
  droppable: {
    padding: theme.spacing(1, 0),
    minHeight: 100
  },
  innerDroppable: {
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 100
  },
  select: {
    margin: theme.spacing(1, 0)
  }
}));

interface Props {
  selectedBoard: Board | null;
  issueCollection: IssueCollection;
  newIssue: NewIssue;
  userCollection: User[];
  fetchIssues: (board: Board) => void;
  setNewIssue: (newIssue: NewIssue) => void;
  createIssue: (board: Board, issue: NewIssue) => void;
  updateIssue: (issue: Issue) => void;
  deleteIssue: (issue: Issue) => void;
}

const JyraBoard: React.FC<Props> = ({selectedBoard, issueCollection, userCollection, newIssue, fetchIssues, setNewIssue, createIssue, updateIssue, deleteIssue}) => {

  const classes = useStyles();
  const theme = useTheme();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedBoard) {
      fetchIssues(selectedBoard);
    }
    // eslint-disable-next-line
  }, [selectedBoard]);

  const onDragEnd = (e: any) => {
    if (e.destination && (e.source.droppableId !== e.destination.droppableId)) {
      const issue = Object.values(issueCollection)
        .flatMap(issues => issues)
        .find(issue => String(issue.id) === e.draggableId);
      if (issue) {
        const editedIssue: Issue = {...issue, status: e.destination.droppableId};
        updateIssue(editedIssue);
      }
    }
  };

  const handleClickDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmitDialog = () => {
    if (selectedBoard) {
      createIssue(selectedBoard, newIssue);
    }
    setDialogOpen(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIssue({...newIssue, title: event.target.value});
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIssue({...newIssue, description: event.target.value});
  };

  const handleUserChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewIssue({
      ...newIssue,
      user: userCollection.find(user => user.id === event.target.value) || null
    });
  };

  if (!selectedBoard) {
    return null;
  }

  return (
    <>
      <CssBaseline/>
      <Box display="flex" flexDirection="column">
        <Box p={1}>
          <Typography variant="h4">{selectedBoard.name}</Typography>
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Box display="flex">
            {[[ISSUE_STATUS_TO_DO, 'To Do'], [ISSUE_STATUS_IN_PROGRESS, 'In Progress'], [ISSUE_STATUS_DONE, 'Done']].map((status: string[]) => (
              <Box className={classes.column} key={status[0]}>
                <Box>
                  <Typography variant="h5" className={classes.columnHeader}>
                    {status[1]}
                  </Typography>
                  <Droppable droppableId={status[0]}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={classes.droppable}
                      >
                        <Box
                          bgcolor={snapshot.isDraggingOver ? theme.palette.primary.light : 'transparent'}
                          className={classes.innerDroppable}>
                          {issueCollection[status[0]].map((issue: Issue, index: number) => (
                            <DraggableIssue key={issue.id} issue={issue} index={index}/>
                          ))}
                          <Box flexGrow={1}/>
                          {provided.placeholder}
                        </Box>
                      </div>
                    )}
                  </Droppable>
                </Box>
                {status[0] === ISSUE_STATUS_TO_DO && (
                  <Button variant="contained" color="primary" onClick={handleClickDialogOpen}>
                    New Issue
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        </DragDropContext>
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle id="form-dialog-title">New Issue</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" minWidth={300}>
            <TextField
              autoFocus
              margin="dense"
              id="displayName"
              label="Title"
              value={newIssue.title}
              onChange={handleTitleChange}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              multiline
              value={newIssue.description}
              onChange={handleDescriptionChange}
            />
            <FormControl className={classes.select}>
              <InputLabel id="select-user-label">Assignee</InputLabel>
              <Select
                labelId="select-user-label"
                id="demo-simple-select"
                value={newIssue.user?.id || ''}
                onChange={handleUserChange}
              >
                {userCollection.map(user => (
                  <MenuItem value={user.id} key={user.id}>{user.username}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleSubmitDialog} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = ({issues, users}: AppState) => ({
  selectedBoard: issues.selectedBoard,
  issueCollection: issues.issueCollection,
  newIssue: issues.newIssue,
  userCollection: users.users
});

const mapDispatchToProps = {
  fetchIssues: fetchIssues,
  setNewIssue: setNewIssue,
  createIssue: createIssue,
  updateIssue: updateIssue,
  deleteIssue: deleteIssue
};

export default connect(mapStateToProps, mapDispatchToProps)(JyraBoard);
