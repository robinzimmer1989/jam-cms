export default function createDataTree(dataset) {
  let hashTable = Object.create(null)

  dataset.forEach(aData => (hashTable[aData.id] = { ...aData, childNodes: [] }))

  let dataTree = []

  dataset.forEach(aData => {
    if (aData.parentID && hashTable[aData.parentID]) {
      hashTable[aData.parentID].childNodes.push(hashTable[aData.id])
    } else {
      dataTree.push(hashTable[aData.id])
    }
  })
  return dataTree
}
