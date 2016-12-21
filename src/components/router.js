import React from 'react'
import {Router, Route, browserHistory, IndexRedirect} from 'react-router'

import App from './app';
import NotFound from './views/not_found';
import TaskList from './views/task_list';

const router = <Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRedirect to="/task-list"/>
    <Route path="task-list" component={TaskList}/>
    <Route path="*" component={NotFound}/>
  </Route>
</Router>;

export default router;