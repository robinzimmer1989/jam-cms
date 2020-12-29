import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { Modal } from 'antd';

// import components
import Home from './appPages/Home';
import Profile from './appPages/Profile';
import SignIn from './appPages/SignIn';
import CmsRouter from './Router';
import PrivateRoute from './PrivateRoute';

import { ROUTE_APP, ROUTE_PROFILE, ROUTE_SITE, ROUTE_SIGN_IN } from '../routes';
import { useStore } from '../store';
import { userActions } from '../actions';
import { isLoggedIn } from '../utils/auth';

const Master = (props) => {
  const { theme, templates } = props;

  const [
    {
      config,
      appState: { dialog },
    },
    dispatch,
  ] = useStore();

  const loggedIn = isLoggedIn(config);

  useEffect(() => {
    const loadUser = async () => {
      await userActions.getAuthUser({}, dispatch, config);
    };

    loggedIn && loadUser();
  }, [loggedIn]);

  return (
    <>
      <Router>
        <PrivateRoute path={`${ROUTE_APP}`} component={Home} />
        <PrivateRoute path={`${ROUTE_APP}${ROUTE_PROFILE}`} component={Profile} />
        <PrivateRoute
          path={`${ROUTE_APP}${ROUTE_SITE}/:siteID/*`}
          component={CmsRouter}
          theme={theme}
          templates={templates}
        />

        <SignIn path={`${ROUTE_APP}${ROUTE_SIGN_IN}`} />
      </Router>

      {dialog.open && (
        <Modal
          transitionName="none"
          maskTransitionName="none"
          title={dialog.title}
          visible={true}
          onCancel={() => dispatch({ type: 'CLOSE_DIALOG' })}
          children={dialog.component}
          width={dialog.width}
          footer={null}
        />
      )}
    </>
  );
};

export default Master;
