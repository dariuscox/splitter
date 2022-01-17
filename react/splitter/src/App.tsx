import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import { StylesProvider } from '@material-ui/core/styles';
import './App.css';

const App = () => (
    <StylesProvider injectFirst>
        {
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path="/" component={Landing} exact />
                </Switch>
            </BrowserRouter>
        }
    </StylesProvider>
);

export default App;
