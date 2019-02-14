import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Detail from './components/DetailMovie'

export default () => (
    <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route path="/:movieurl" component={Detail}/>
    </Switch>
)