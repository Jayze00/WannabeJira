import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  OutlinedInput,
  Theme
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {AppState} from '../../../store';
import {connect} from 'react-redux';
import {createBoard, fetchBoards, setBoardName} from '../../../store/boards/actions';
import {Board} from '../../../store/boards/types';
import AddIcon from '@material-ui/icons/Add';
import {setMessage} from '../../../store/message/actions';
import {MESSAGE_TYPE_ERROR, MessageType} from '../../../store/message/types';
import {setSelectedBoard} from '../../../store/issues/actions';

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
  boardCollection: Board[];
  boardName: string;
  fetchBoards: () => void;
  createBoard: (name: string) => void;
  setBoardName: (boardName: string) => void;
  setMessage: (text: string, type: MessageType) => void;
  setSelectedBoard: (selectedBoard: Board) => void;
}

const Boards: React.FC<Props> = ({boardCollection, boardName, fetchBoards, createBoard, setBoardName, setMessage, setSelectedBoard}) => {

  const classes = useStyles();

  const [showClosedBoards, setShowClosedBoards] = useState<boolean>(false);

  const handleCreateBoard = () => {
    if (boardName !== '') {
      createBoard(boardName);
    } else {
      setMessage('Please provide a board name', MESSAGE_TYPE_ERROR);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return (
    <>
      <CssBaseline/>
      <Box maxWidth={300} marginRight={2}>
        <List>
          <ListSubheader>
            Open Boards
          </ListSubheader>
          {boardCollection.filter(board => board.isOpen).map(board =>
            <ListItem button key={board.id} onClick={() => setSelectedBoard(board)}>
              <ListItemText>{board.name}</ListItemText>
            </ListItem>
          )}
        </List>
        <FormControl variant="outlined" className={classes.textField}>
          <InputLabel htmlFor="board-name">
            new Board
          </InputLabel>
          <OutlinedInput
            onChange={e => setBoardName(e.target.value)}
            value={boardName}
            id="board-name"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleCreateBoard}
                  onMouseDown={e => e.preventDefault()}
                  edge="end"
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={77}
          />
        </FormControl>
        <Button onClick={() => setShowClosedBoards(!showClosedBoards)} color="primary"
          variant="outlined" className={classes.button}>
          {showClosedBoards ? 'Hide' : 'Show'} closed Boards
        </Button>
        {showClosedBoards && (
          <List>
            <ListSubheader>
              Closed Boards
            </ListSubheader>
            {boardCollection.filter(board => !board.isOpen).map(board =>
              <ListItem button key={board.id} onClick={() => setSelectedBoard(board)}>
                <ListItemText>{board.name}</ListItemText>
              </ListItem>
            )}
          </List>
        )}
      </Box>
    </>
  );
};

const mapStateToProps = ({boards}: AppState) => ({
  boardCollection: boards.boardCollection,
  boardName: boards.boardName
});

const mapDispatchToProps = {
  fetchBoards: fetchBoards,
  createBoard: createBoard,
  setBoardName: setBoardName,
  setMessage: setMessage,
  setSelectedBoard: setSelectedBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
