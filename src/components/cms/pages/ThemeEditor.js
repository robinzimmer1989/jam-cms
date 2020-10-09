import React, { useEffect, useState } from 'react'
import { Radio, PageHeader, Divider } from 'antd'
import styled from 'styled-components'

// import app components
import EditorLayout from '../editor/EditorLayout'
import ThemeFontFamily from '../settings/ThemeFontFamily'
import ThemeColors from '../settings/ThemeColors'

import { siteActions } from 'actions'
import { useStore } from 'store'
import getRoute from 'routes'

const ThemeEditor = () => {
  const [
    {
      sitesState: { sites, siteID },
      editorState: { site, viewport },
    },
    dispatch,
  ] = useStore()

  const [tab, setTab] = useState('colors')

  useEffect(() => {
    siteActions.addSiteToEditor({ site: sites[siteID] }, dispatch)
  }, [])

  const renderTabContent = () => {
    if (tab === 'colors') {
      return <ThemeColors />
    } else if (tab === 'fonts') {
      return <ThemeFontFamily />
    } else if (tab === 'blocks') {
    }
  }

  const sidebar = (
    <>
      <PageHeader title="Theme" style={{ paddingLeft: 20 }} />

      <Divider style={{ margin: 0 }} />

      <Radio.Group value={tab} onChange={e => setTab(e.target.value)}>
        <Radio.Button value="colors">Colors</Radio.Button>
        <Radio.Button value="fonts">Fonts</Radio.Button>
        <Radio.Button value="blocks">Blocks</Radio.Button>
      </Radio.Group>

      {renderTabContent()}
    </>
  )

  return (
    <EditorLayout sidebar={sidebar} backLink={getRoute(`settings-theme`, { siteID })}>
      <Page viewport={viewport}></Page>
    </EditorLayout>
  )
}

const Page = styled.div`
  background: #fff;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
  margin: 0 auto;
  width: 100%;
  min-height: 360px;
  margin-bottom: 40px;
`

export default ThemeEditor
