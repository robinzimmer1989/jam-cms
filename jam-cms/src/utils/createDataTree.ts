export default function createDataTree(dataset: any) {
  let hashTable = Object.create(null);

  dataset.forEach((aData: any) => hashTable[aData.id] = { ...aData, childNodes: [] });

  let dataTree: any = [];

  dataset.forEach((aData: any) => {
    if (aData.parentID && hashTable[aData.parentID]) {
      hashTable[aData.parentID].childNodes.push(hashTable[aData.id]);
    } else {
      dataTree.push(hashTable[aData.id]);
    }
  });
  return dataTree;
}
