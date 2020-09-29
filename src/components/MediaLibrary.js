import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'

// import app components
import Image from '../components/Image'
import { mediaActions } from '../actions'
import { useStore } from '../store'

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

      <Grid container>
        {site?.mediaItems?.items &&
          site.mediaItems.items.map(o => {
            return (
              <Grid key={o.id} item xs={12} onClick={() => onSelect && onSelect(o)}>
                <Image storageKey={o.storageKey} />
              </Grid>
            )
          })}
      </Grid>
    </>
  )
}

export default MediaLibrary
