import React, { useEffect } from 'react'
import styled from 'styled-components'

// import app components
import Image from '../Image'
import Paper from '../Paper'
import { mediaActions } from 'actions'
import { useStore } from 'store'

const MediaLibrary = props => {
  const { onSelect } = props

  const [
    {
      postState: { siteID, sites },
    },
    dispatch,
  ] = useStore()

  const site = sites[siteID]

  useEffect(() => {
    const loadMediaItems = async () => {
      await mediaActions.getMediaItems({ siteID }, dispatch)
    }

    loadMediaItems()
  }, [siteID])

  const handleFileUpload = async event => {
    await mediaActions.uploadMediaItem({ siteID, file: event.target.files[0] }, dispatch)
  }

  return (
    <>
      <input type="file" placeholder={'File Upload'} onChange={handleFileUpload} name="file" />

      <Paper>
        <Grid>
          {site?.mediaItems?.items &&
            site.mediaItems.items.map(o => {
              return (
                <MediaItem key={o.id} onClick={() => onSelect && onSelect(o)}>
                  <Image bg={true} storageKey={o.storageKey} />
                </MediaItem>
              )
            })}
        </Grid>
      </Paper>
    </>
  )
}

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 120px;
`

const MediaItem = styled.div`
  position: relative;
  height: 120px;
  width: 120px;
`

export default MediaLibrary
