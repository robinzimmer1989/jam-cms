import React from 'react'
import { navigate, Link } from 'gatsby'
import styled from 'styled-components'
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core'

import CollectionsIcon from 'react-ionicons/lib/IosAlbumsOutline'
import SettingsIcon from 'react-ionicons/lib/IosOptionsOutline'
import DashboardIcon from 'react-ionicons/lib/IosPodiumOutline'
import MediaIcon from 'react-ionicons/lib/IosImagesOutline'
import AddIcon from 'react-ionicons/lib/IosAdd'

// import app components
import AddCollection from '../forms/AddCollection'
import { useStore } from '../../store'

const Sidebar = props => {
  const { children } = props

  const [
    {
      postState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const site = sites[siteID] || null

  return (
    <>
      <Header>
        <Link to={`/app/site/${site?.id}`} children={`${site?.title}`} />

        <div>
          {site?.netlifyID && <img src={`https://api.netlify.com/api/v1/badges/${site.netlifyID}/deploy-status`} />}

          {site?.netlifyUrl && <a href={site?.netlifyUrl} children={`Visit Website`} target="_blank" rel="noopener" />}
        </div>
      </Header>

      <Container>
        <SidebarContainer>
          <List>
            <ListItem button onClick={() => navigate(`/app/site/${siteID}`)}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText children={`Dashboard`} />
            </ListItem>

            <ListItem button onClick={() => navigate(`/app/site/${siteID}/media`)}>
              <ListItemIcon>
                <MediaIcon />
              </ListItemIcon>
              <ListItemText children={`Media`} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <CollectionsIcon />
              </ListItemIcon>
              <ListItemText children={`Collections`} />
              <IconButton
                onClick={() =>
                  dispatch({
                    type: 'SET_DIALOG',
                    payload: {
                      open: true,
                      component: <AddCollection siteID={siteID} />,
                      width: 'xs',
                    },
                  })
                }
              >
                <AddIcon />
              </IconButton>
            </ListItem>

            <SubMenu>
              {site?.postTypes?.items &&
                site.postTypes.items.map(o => {
                  return (
                    <ListItem key={o.id} button onClick={() => navigate(`/app/site/${siteID}/collections/${o.id}`)}>
                      <ListItemText children={o.title} />
                    </ListItem>
                  )
                })}

              <ListItem button onClick={() => navigate(`/app/site/${siteID}/collections/form`)}>
                <ListItemText children={`Form`} />
              </ListItem>

              <ListItem button onClick={() => navigate(`/app/site/${siteID}/collections/user`)}>
                <ListItemText children={`User`} />
              </ListItem>
            </SubMenu>

            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText children={`Settings`} />
            </ListItem>

            <SubMenu>
              {[
                {
                  title: `General`,
                  slug: `general`,
                },
                {
                  title: `SEO`,
                  slug: `seo`,
                },
                {
                  title: `Theme`,
                  slug: `theme`,
                },
                {
                  title: `Fonts`,
                  slug: `fonts`,
                },
                {
                  title: `Blocks`,
                  slug: `blocks`,
                },
              ].map(o => {
                return (
                  <ListItem key={o.title} button onClick={() => navigate(`/app/site/${siteID}/settings/${o.slug}`)}>
                    <ListItemText children={o.title} />
                  </ListItem>
                )
              })}
            </SubMenu>
          </List>
        </SidebarContainer>

        <Content>{children}</Content>
      </Container>
    </>
  )
}

const Container = styled.div``

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: #ccc;
  height: 40px;
`

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 104px;
  height: calc(100% - 104px);
  width: 250px;
  background: #f2f2f2;
`

const Content = styled.div`
  width: calc(100% - 250px);
  margin-left: 250px;
  padding: 20px;
  box-sizing: border-box;
`

const SubMenu = styled.div`
  background: #fff;
`

export default Sidebar
