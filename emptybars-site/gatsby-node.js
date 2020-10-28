/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

fs = require('fs');

// You can delete this file if you're not using it
exports.onCreateNode = ({ node, actions }) => {
    const { createNode, createNodeField } = actions

    if (node.internal.type === `File` && (node.extension === 'json' || node.extension === 'txt')) {
        fs.readFile(node.absolutePath, undefined, (_err, buf) => {
            console.log(buf.toString())
            createNodeField({ node, name: `content`, value: buf.toString()});
        });
    }
}