import React from 'react';
import Counter from '../pages/counter/Counter';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {pink, teal} from '@material-ui/core/colors';

const theme = createMuiTheme({
   palette: {
      primary: pink,
      secondary: teal,
   }
});

function App() {

   return (
      <ThemeProvider theme={theme}>
         <Counter/>
      </ThemeProvider>
   );
}

export default App;
