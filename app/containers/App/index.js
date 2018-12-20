/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AllRecordPage from 'containers/AllRecordPage/Loadable';
import RecordPage from 'containers/RecordPage/Loadable';
import GlobalStyle from '../../global-styles';
import MyNavbar from 'components/Navbar';

export default function App() {
  return (
    <div >
      <MyNavbar />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/recordings" component={AllRecordPage} />
        <Route path="/recording" component = {RecordPage}/>
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
