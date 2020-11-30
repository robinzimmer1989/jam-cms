import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { PageHeader, Space, Button } from 'antd';

// import app components
import BaseLayout from '../BaseLayout';
import Edges from '../Edges';
import SiteForm from '../SiteForm';
import ListItem from '../ListItem';
import Loader from '../Loader';

import { siteActions } from '../../actions';
import { useStore } from '../../store';
import getRoute from '../../routes';

const Home = () => {
  const [
    {
      cmsState: { sites },
    },
    dispatch,
  ] = useStore();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadSites = async () => {
      if (!!process.env.GATSBY_CMS_MULTISITE) {
        await siteActions.getSites({}, dispatch);
      } else {
        navigate(getRoute(`dashboard`));
      }

      setLoaded(true);
    };
    loadSites();
  }, []);

  return (
    <>
      {loaded ? (
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
                    hideImage={true}
                  />
                );
              })}
            </Space>
          </Edges>
        </BaseLayout>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
