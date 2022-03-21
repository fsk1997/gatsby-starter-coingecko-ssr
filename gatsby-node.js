const {
    addRemoteFilePolyfillInterface,
    polyfillImageServiceDevRoutes,
} = require(`gatsby-plugin-utils/polyfill-remote-file`)
// const { polyfillImageServiceDevRoutes } = require('gatsby-plugin-utils/polyfill-remote-file');
exports.createSchemaCustomization = ({ actions, schema }) => {
    actions.createTypes([
        addRemoteFilePolyfillInterface(
            schema.buildObjectType({
                name: `PrefixAsset`,
                fields: {
                    // your fields
                },
                interfaces: [`Node`, 'RemoteFile'],
            }),
            {
                schema,
                actions,
            }
        )
    ]);
}

//   @type {import('gatsby').onCreateDevServer}
exports.onCreateDevServer = ({ app }) => {
    polyfillImageServiceDevRoutes(app)
}