import React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../../store';
import {decrement, decrementAsync, increment, incrementAsync} from '../../../store/counter/actions';
import {AppBar, Button, Container, Grid, Theme, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
   title: {
      flexGrow: 1,
      textAlign: 'start'
   },
   container: {
      padding: theme.spacing(6, 4),
      textAlign: 'center',
   }
}));

interface Props {
   increment: () => void;
   decrement: () => void;
   incrementAsync: () => void;
   decrementAsync: () => void;
   counter: number;
}

const Counter: React.FC<Props> = ({increment, decrement, incrementAsync, decrementAsync, counter}) => {

   const classes = useStyles();

   return (
      <>
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" className={classes.title}>
                  Counter
               </Typography>
            </Toolbar>
         </AppBar>
         <Container className={classes.container}>
            <Grid container spacing={2} alignItems={'center'} justify={'center'}>
               <Grid item>
                  <Button onClick={decrementAsync}>Decrement Async</Button>
               </Grid>
               <Grid item>
                  <Button onClick={decrement}>Decrement</Button>
               </Grid>
               <Grid item xs={2}>
                  <Typography variant={'h4'}>{counter}</Typography>
               </Grid>
               <Grid item>
                  <Button onClick={increment}>Increment</Button>
               </Grid>
               <Grid item>
                  <Button onClick={incrementAsync}>Increment Async</Button>
               </Grid>
            </Grid>
         </Container>
      </>
   );
};

const mapStateToProps = ({counter}: AppState) => ({
   counter
});

const mapDispatchToProps = {
   increment: increment,
   decrement: decrement,
   incrementAsync: incrementAsync,
   decrementAsync: decrementAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
