export default function getCleanedFileName(fileName: any) {
  const modifiedFileName = fileName.replace(/\s+/g, '-').toLowerCase();

  let fileNameArray = modifiedFileName.split('.');

  const extension = fileNameArray[fileNameArray.length - 1];

  delete fileNameArray[fileNameArray.length - 1];

  fileNameArray = fileNameArray.filter((r: any) => r);

  const newFileName = `${fileNameArray.join('-')}.${extension}`;

  return newFileName;
}
