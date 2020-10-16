import React, { useEffect, useState } from 'react'
import { Tabs, PageHeader, Divider, Space, Button, Row, notification } from 'antd'

// import app components
import CmsLayout from 'components/CmsLayout'
import FontFamily from 'components/theme/FontFamily'
import FontStyles from 'components/theme/FontStyles'
import FontFamilyPreview from 'components/theme/FontFamilyPreview'
import Colors from 'components/theme/Colors'
import PageWrapper from 'components/PageWrapper'

import Header from 'components/postBlocks/Header'
import Banner from 'components/postBlocks/Banner'
import TextImage from 'components/postBlocks/TextImage'

import { siteActions } from 'actions'
import { useStore } from 'store'
import getRoute from 'routes'

const SettingsTheme = () => {
  const [
    {
      cmsState: { sites, siteID },
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  const [tab, setTab] = useState('Design')

  useEffect(() => {
    siteActions.addSiteToEditor({ site: sites[siteID] }, dispatch)
  }, [])

  const handleSave = async () => {
    const { id, settings } = site

    const result = await siteActions.updateSite({ id, settings }, dispatch)

    if (result?.data?.updateSite) {
      notification.success({
        message: 'Success',
        description: 'Updated successfully',
        placement: 'bottomRight',
      })
    }
  }

  const renderContent = () => {
    if (tab === 'Design') {
      return {
        title: tab,
        sidebar: null,
      }
    } else if (tab === 'Colors') {
      return {
        title: tab,
        sidebar: <Colors />,
      }
    } else if (tab === 'Typography') {
      return {
        title: tab,
        sidebar: (
          <>
            <FontFamily />
            <FontStyles />
          </>
        ),
      }
    } else if (tab === 'Components') {
      return {
        elements: null,
        title: tab,
        sidebar: null,
      }
    }
  }

  const content = renderContent()

  const sidebar = (
    <>
      <PageHeader title={content.title} style={{ paddingLeft: 20 }} />
      <Divider style={{ margin: 0 }} />
      {content.sidebar}
    </>
  )

  return (
    <CmsLayout
      pageTitle="Theme"
      actionBar={'editor'}
      rightSidebar={sidebar}
      backLink={getRoute(`settings-theme`, { siteID })}
    >
      <Space direction="vertical" size={30}>
        <Row justify="space-between">
          <Tabs defaultActiveKey="all" onChange={v => setTab(v)}>
            {['Design', 'Colors', 'Typography', 'Components'].map(name => {
              return <Tabs.TabPane key={name} tab={name} />
            })}
          </Tabs>

          <Button onClick={handleSave} children="Update" type="primary" />
        </Row>

        <PageWrapper>
          <Header
            image={{ storageKey: 'dummylogo.jpg' }}
            mainMenu={[{ title: 'About us' }, { title: 'Products' }, { title: 'Contact Us' }]}
          />
          <Banner image={{ storageKey: 'justin-hu-RIzdVSGa60w-unsplash (1).jpg' }} />
          <FontFamilyPreview />
          <TextImage
            image={{ storageKey: 'justin-hu-RIzdVSGa60w-unsplash (1).jpg' }}
            title={'Hello World'}
            text={'Lorem ipsum dolor...'}
          />
        </PageWrapper>
      </Space>
    </CmsLayout>
  )
}

export default SettingsTheme
