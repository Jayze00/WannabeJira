import React from 'react';
import {CssBaseline, Paper, Theme, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Issue} from '../../../store/issues/types';
import {Draggable} from 'react-beautiful-dnd';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));

interface Props {
  issue: Issue;
  index: number;
}

const DrggableIssue: React.FC<Props> = ({issue, index}) => {

  const classes = useStyles();

  return (
    <>
      <CssBaseline/>
      <Draggable draggableId={String(issue.id)} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => console.log(issue)}
          >
            <Paper className={classes.paper}>
              <Typography variant="h6">{issue.title}</Typography>
              <Typography>Assignee: {issue.user.username}</Typography>
            </Paper>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default DrggableIssue;
