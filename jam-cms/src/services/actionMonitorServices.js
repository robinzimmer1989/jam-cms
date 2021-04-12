import axios from 'axios';

export const getChangesSinceLastBuild = async ({ timestamp }, config) => {
  // TODO: add trailing slash function to utils and pass in endpoint via settings (doesn't need to be /graphql)
  const url = `${config?.source.replace(/\/+$/, '')}/graphql`;

  try {
    const result = await axios.post(url, {
      query: `
        query  {
          actionMonitorActions(where: {sinceTimestamp: ${timestamp}}, first: 999) {
            nodes {
              title
              referencedNodeStatus
              referencedNodeSingularName
              referencedNodePluralName
              referencedNodeID
              referencedNodeGlobalRelayID
              actionType
            }
          }
        }
      `,
    });

    return result?.data;
  } catch (err) {
    console.log(err);
  }
};
