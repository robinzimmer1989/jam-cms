import React, { useEffect, useState } from 'react'
import { Radio, PageHeader, Divider, Space, Button, Row } from 'antd'
import { toast } from 'react-toastify'

// import app components
import CmsLayout from 'components/CmsLayout'
import FontFamily from 'components/theme/FontFamily'
import FontStyles from 'components/theme/FontStyles'
import FontFamilyPreview from 'components/theme/FontFamilyPreview'
import Colors from 'components/theme/Colors'
import TextImage from 'components/postBlocks/TextImage'
import PageWrapper from 'components/PageWrapper'

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

  const [tab, setTab] = useState('colors')

  useEffect(() => {
    siteActions.addSiteToEditor({ site: sites[siteID] }, dispatch)
  }, [])

  const handleSave = async () => {
    const { id, settings } = site

    const result = await siteActions.updateSite({ id, settings }, dispatch)

    if (result?.data?.updateSite) {
      toast.success('Updated successfully')
    }
  }

  const renderContent = () => {
    if (tab === 'colors') {
      return {
        page: <TextImage image={{ storageKey: null }} title="Lorem" text="Lorem ipsum Dolor" button={null} />,
        title: 'Colors',
        sidebar: <Colors />,
      }
    } else if (tab === 'fontFamily') {
      return {
        page: <FontFamilyPreview />,
        title: 'Font Family',
        sidebar: <FontFamily />,
      }
    } else if (tab === 'fontStyles') {
      return {
        page: <FontFamilyPreview />,
        title: 'Font Styles',
        sidebar: <FontStyles />,
      }
    } else if (tab === 'blocks') {
      return {
        page: null,
        sidebar: null,
      }
    }
  }

  const elements = renderContent()

  const sidebar = (
    <>
      <PageHeader title={elements.title} style={{ paddingLeft: 20 }} />
      <Divider style={{ margin: 0 }} />
      {elements.sidebar}
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
          <Radio.Group value={tab} onChange={e => setTab(e.target.value)}>
            <Radio.Button value="colors">Colors</Radio.Button>
            <Radio.Button value="fontFamily">Font Family</Radio.Button>
            <Radio.Button value="fontStyles">Font Styles</Radio.Button>
            <Radio.Button value="forms">Forms</Radio.Button>
            <Radio.Button value="blocks">Blocks</Radio.Button>
          </Radio.Group>

          <Button onClick={handleSave} children="Update" type="primary" />
        </Row>

        <PageWrapper>{elements.page}</PageWrapper>
      </Space>
    </CmsLayout>
  )
}

export default SettingsTheme
