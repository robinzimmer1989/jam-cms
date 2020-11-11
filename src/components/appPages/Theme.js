import React, { useEffect, useState } from 'react'
import { PageHeader, Divider, Space, Button, notification } from 'antd'
import styled from 'styled-components'

// import app components
import CmsLayout from '../CmsLayout'
import FontFamily from '../theme/FontFamily'
import FontStyles from '../theme/FontStyles'
import FontFamilyPreview from '../theme/FontFamilyPreview'
import Colors from '../theme/Colors'
import PageWrapper from '../PageWrapper'

import { siteActions } from '../../actions'
import { useStore } from '../../store'

const SettingsTheme = () => {
  const [
    {
      cmsState: { sites, siteID },
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  const [tab, setTab] = useState(null)

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
    if (tab === 'Colors') {
      return <Colors />
    } else if (tab === 'Typography') {
      return (
        <>
          <FontFamily />
          <FontStyles />
        </>
      )
    }
  }

  const getSidebar = () => {
    let sidebar = {
      title: '',
      icon: {
        onClick: null,
        component: null,
      },
      children: null,
    }

    if (tab === null) {
      sidebar = {
        title: { title: 'Settings', onBack: null },
        children: (
          <Container>
            <Space direction="vertical" size={20}>
              {['Colors', 'Typography'].map((name) => {
                return <Button key={name} children={name} onClick={() => setTab(name)} />
              })}

              <Button onClick={handleSave} children="Update" type="primary" />
            </Space>
          </Container>
        ),
      }
    } else {
      sidebar = {
        title: {
          title: tab,
          onBack: () => setTab(null),
        },
        children: renderContent(),
      }
    }

    return (
      <>
        <PageHeader {...sidebar.title} style={{ paddingLeft: 20 }} />
        <Divider style={{ margin: 0 }} />
        {sidebar.children}
      </>
    )
  }

  return (
    <CmsLayout pageTitle="Theme" actionBar={'editor'} rightSidebar={getSidebar()}>
      <PageWrapper>
        <FontFamilyPreview />
      </PageWrapper>
    </CmsLayout>
  )
}

const Container = styled.div`
  padding: 20px;
`

export default SettingsTheme
