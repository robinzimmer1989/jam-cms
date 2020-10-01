import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import CollectionsIcon from 'react-ionicons/lib/IosAlbumsOutline'
import SettingsIcon from 'react-ionicons/lib/IosOptionsOutline'
import DashboardIcon from 'react-ionicons/lib/IosPodiumOutline'
import MediaIcon from 'react-ionicons/lib/IosImagesOutline'
import AddIcon from 'react-ionicons/lib/IosAdd'
import BackIcon from 'react-ionicons/lib/IosArrowBack'

// import app components
import AddCollection from '../forms/AddCollection'
import Header from './Header'
import { useStore } from '../../store'
import { colors } from '../../theme'

const Layout = props => {
  const { pageTitle, children } = props

  const [
    {
      postState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const site = sites[siteID] || null

  return (
    <>
      <Container>
        <Sidebar>
          <div>
            <Title>{site?.title}</Title>

            <List>
              <ListItem to={`/app/site/${siteID}`} activeClassName="active">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText children={`Dashboard`} />
              </ListItem>

              <ListItem to={`/app/site/${siteID}/media`} activeClassName="active">
                <ListItemIcon>
                  <MediaIcon />
                </ListItemIcon>
                <ListItemText children={`Media`} />
              </ListItem>

              <CollectionsItem
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
                <ListItemIcon>
                  <CollectionsIcon />
                </ListItemIcon>
                <ListItemText children={`Collections`} />
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
              </CollectionsItem>

              <SubList>
                {site?.postTypes?.items &&
                  site.postTypes.items.map(o => {
                    return (
                      <CollectionsSubItem key={o.id} to={`/app/site/${siteID}/collections/${o.id}`} activeClassName="active">
                        <SubListItemText children={o.title} />
                      </CollectionsSubItem>
                    )
                  })}
              </SubList>

              <ListItem to={`/app/site/${siteID}/settings`} activeClassName="active">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText children={`Settings`} />
              </ListItem>
            </List>
          </div>

          <ListItem to={`/app`}>
            <ListItemIcon>
              <BackIcon />
            </ListItemIcon>
            <ListItemText children={`All Websites`} />
          </ListItem>
        </Sidebar>

        <Content>
          <Header pageTitle={pageTitle} />
          {children}
        </Content>
      </Container>
    </>
  )
}

const Container = styled.div`
  padding-left: 250px;
`

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  overflow: auto;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
`

const Title = styled.h1`
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  font-size: 24px;
`

const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 40px;
`

const List = styled.div``

const item = css`
  display: flex;
  height: 50px;
  border-right: 4px solid #fff;
  transition: ease all 0.2s;
  color: ${colors.text.light};
  cursor: pointer;
`

const ListItem = styled(Link)`
  ${item}

  path {
    transition: ease all 0.2s;
  }

  &:hover,
  &.active {
    color: ${colors.text.dark};
    background: ${colors.primary.light};
    border-color: ${colors.primary.dark};

    path {
      fill: ${colors.primary.dark};
    }
  }
`

const CollectionsItem = styled.div`
  ${item}
`

const CollectionsSubItem = styled(ListItem)`
  border-color: ${colors.background.light};
`

const ListItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100%;
`

const ListItemText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 5px 12px 5px 0;
  color: inherit;
  font-weight: bold;
`

const SubList = styled.div`
  background: ${colors.background.light};
`

const SubListItemText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 5px 12px 5px 30px;
  font-size: 16px;
`

export default Layout
