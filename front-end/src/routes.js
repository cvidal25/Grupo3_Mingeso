// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './Componentes/App';
import Home from './Componentes/Home';
import ConsoleF from './Componentes/CodeEditor';
import Page404 from './Componentes/Page404';
import NewExcercise from "./Componentes/NewExcercise";
import Enunciado from './Componentes/Enunciado';

const AppRoutes = () =>
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/NewExcercise" component={NewExcercise}/>
      <Route exact path="/Console/:lenguaje" component={ConsoleF} />
      <Route exact path="/Console/:lenguaje/enun/:key" component={ConsoleF} />
      <Route exact path='/Enunciado' component={Enunciado}/>
      <Route component={Page404} />
    </Switch>
  </App>;

export default AppRoutes;
