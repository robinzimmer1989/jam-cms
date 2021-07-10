import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { PageHeader, Space, Button } from 'antd';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/BaseLayout' was resolved to ... Remove this comment to see the full error message
import BaseLayout from '../components/BaseLayout';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/Edges' was resolved to '/Use... Remove this comment to see the full error message
import Edges from '../components/Edges';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/SiteForm' was resolved to '/... Remove this comment to see the full error message
import SiteForm from '../components/SiteForm';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/ListItem' was resolved to '/... Remove this comment to see the full error message
import ListItem from '../components/ListItem';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/Loader' was resolved to '/Us... Remove this comment to see the full error message
import Loader from '../components/Loader';

import { siteActions } from '../actions';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';
import getRoute from '../routes';

const Home = () => {
  const [
    {
      config,
      cmsState: { sites },
    },
    dispatch,
  ] = useStore();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadSites = async () => {
      if (!!config.multisite) {
        await siteActions.getSites({}, dispatch, config);
        setLoaded(true);
      } else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        navigate(getRoute(`dashboard`));
      }
    };
    loadSites();
  }, []);

  if (!loaded) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <Loader />;
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <BaseLayout>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Edges size="md">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <PageHeader
          title="My Websites"
          extra={[
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Button
              key="1"
              onClick={() =>
                dispatch({
                  type: 'SET_DIALOG',
                  payload: {
                    open: true,
                    title: 'Add Website',
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    component: <SiteForm />,
                  },
                })
              }
              type="primary"
              children={`Add Site`}
            />,
          ]}
        />

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Space direction="vertical">
          {Object.keys(sites).map((key) => {
            const { id, title } = sites[key];

            return (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <ListItem
                key={id}
                title={title}
                actions={[
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Button
                    key="1"
                    onClick={() => navigate(getRoute(`dashboard`, { siteID: id }))}
                    children={`Dashboard`}
                  />,
                ]}
                link={getRoute(`dashboard`, { siteID: id })}
              />
            );
          })}
        </Space>
      </Edges>
    </BaseLayout>
  );
};

export default Home;
