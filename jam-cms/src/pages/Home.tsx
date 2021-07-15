import React, { useEffect, useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { PageHeader, Space, Button } from 'antd';

// import app components
import BaseLayout from '../components/BaseLayout';
import Edges from '../components/Edges';
import SiteForm from '../components/SiteForm';
import ListItem from '../components/ListItem';
import Loader from '../components/Loader';

import { siteActions } from '../actions';
import { useStore } from '../store';
import getRoute from '../routes';

const Home = (props: RouteComponentProps) => {
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
      await siteActions.getSites({}, dispatch, config);
      setLoaded(true);
    };

    loadSites();
  }, []);

  if (!loaded) {
    return <Loader />;
  }

  return (
    <BaseLayout>
      <Edges size="md">
        <PageHeader
          title="My Websites"
          extra={[
            <Button
              key="1"
              onClick={() =>
                dispatch({
                  type: 'SET_DIALOG',
                  payload: {
                    open: true,
                    title: 'Add Website',
                    component: <SiteForm />,
                  },
                })
              }
              type="primary"
              children={`Add Site`}
            />,
          ]}
        />

        <Space direction="vertical">
          {Object.keys(sites).map((key) => {
            const { id, title } = sites[key];

            return (
              <ListItem
                key={id}
                title={title}
                actions={[
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
