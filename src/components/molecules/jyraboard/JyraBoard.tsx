import React, {useEffect} from 'react';
import {CssBaseline, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {AppState} from '../../../store';
import {connect} from 'react-redux';
import {Board} from '../../../store/boards/types';
import {Issue, IssueCollection, NewIssue} from '../../../store/issues/types';
import {
  createIssue,
  deleteIssue,
  fetchIssues,
  setNewIssue,
  updateIssue
} from '../../../store/issues/actions';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    margin: theme.spacing(2, 0),
    width: '100%'
  },
  button: {
    maxWidth: 'min-content',
    minWidth: 'max-content',
    marginBottom: theme.spacing(2)
  }
}));

interface Props {
  selectedBoard: Board | null;
  issueCollection: IssueCollection;
  newIssue: NewIssue;
  fetchIssues: (board: Board) => void;
  setNewIssue: (newIssue: NewIssue) => void;
  createIssue: (board: Board, issue: NewIssue) => void;
  updateIssue: (issue: Issue) => void;
  deleteIssue: (issue: Issue) => void;
}

const JyraBoard: React.FC<Props> = ({selectedBoard, issueCollection, newIssue, fetchIssues, setNewIssue, createIssue, updateIssue, deleteIssue}) => {

  const classes = useStyles();

  useEffect(() => {
    if (selectedBoard) {
      fetchIssues(selectedBoard);
    }
    // eslint-disable-next-line
  }, [selectedBoard]);

  return (
    <>
      <CssBaseline/>
      {selectedBoard?.name}
    </>
  );
};

const mapStateToProps = ({issues}: AppState) => ({
  selectedBoard: issues.selectedBoard,
  issueCollection: issues.issueCollection,
  newIssue: issues.newIssue
});

const mapDispatchToProps = {
  fetchIssues: fetchIssues,
  setNewIssue: setNewIssue,
  createIssue: createIssue,
  updateIssue: updateIssue,
  deleteIssue: deleteIssue
};

export default connect(mapStateToProps, mapDispatchToProps)(JyraBoard);
