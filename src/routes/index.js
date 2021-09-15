import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login/index';
import Page404 from '../pages/Page404/index';
import Register from '../pages/Register/index';
import Aluno from '../pages/Aluno/index';
import Alunos from '../pages/Alunos/index';
import Fotos from '../pages/Fotos/index';
import MyRoute from './MyRoute';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path='/login/' component={Login} isClosed={false} />
      <MyRoute exact path='/register/' component={Register} isClosed={false} />
      <MyRoute exact path='/alunos/' component={Alunos} isClosed={false} />
      <MyRoute exact path='/aluno/:id/edit' component={Aluno} isClosed />
      <MyRoute exact path='/aluno/' component={Aluno} isClosed />
      <MyRoute exact path='/images/:id' component={Fotos} isClosed={false} />
      <MyRoute path='*' component={Page404} />
    </Switch>
  );
}
