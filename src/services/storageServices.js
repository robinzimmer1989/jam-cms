import { Storage } from 'aws-amplify'

import { getCleanedFileName } from '../utils/helpers'
import config from '../aws-exports.js'

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config

export const uploadFile = async ({ siteID, file }) => {
  const { name: fileName, type: mimeType } = file

  const cleanedFileName = getCleanedFileName(fileName)

  const key = `${siteID}/media/${cleanedFileName}`

  try {
    const imageInfo = await Storage.put(key, file, { contentType: mimeType })

    const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${imageInfo.key}`

    return { key: imageInfo.key, url }
  } catch (err) {
    console.log('error: ', err)
  }
}
