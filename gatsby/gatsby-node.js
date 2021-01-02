/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const fs = require("fs")
const jsdom = require("jsdom")

function isComposerName(node) {
  return (
    node.relativeDirectory &&
    node.relativeDirectory.split("/").length == 1 &&
    node.internal.type == "File" &&
    node.name === "composer-name"
  )
}

function isCompositionName(node) {
  return (
    node.relativeDirectory &&
    node.relativeDirectory.split("/").length == 2 &&
    node.internal.type == "File" &&
    node.name === "composition-name"
  )
}

function isPerformerName(node) {
  return (
    node.relativeDirectory &&
    node.relativeDirectory.split("/").length == 3 &&
    node.internal.type == "File" &&
    node.name === "performer-name"
  )
}

function isSheetMusicUrl(node) {
  return (
    node.relativeDirectory &&
    node.relativeDirectory.split("/").length == 3 &&
    node.internal.type == "File" &&
    node.name === "sheet-music"
  )
}

// You can delete this file if you're not using it
exports.onCreateNode = async ({ node, loadNodeContent, actions }) => {
  const { createNode, createNodeField } = actions

  if (node.name == "playerIndexHtml") {
    const content = await loadNodeContent(node)
    const baseUrl = node.url.split("index.html")[0]
    const dom = new jsdom.JSDOM(content)
    const cssNodes = [...dom.window.document.querySelectorAll("link")]
    console.log("Player css files found: " + cssNodes.length)
    createNode({
      id: "playerCss",
      urls: cssNodes.map(node => baseUrl + node.href),
      internal: {
        type: "playerCss",
        contentDigest: "html",
      },
    })

    const jsNodes = [...dom.window.document.querySelectorAll("script")].filter(
      node => node.src
    )
    console.log("Player js files found: " + jsNodes.length)
    createNode({
      id: "playerJs",
      urls: jsNodes.map(node => baseUrl + node.src),
      internal: {
        type: "playerJs",
        contentDigest: "html",
      },
    })
  }

  if (node.name == "editorIndexHtml") {
    const content = await loadNodeContent(node)
    const baseUrl = node.url.split("index.html")[0]
    const dom = new jsdom.JSDOM(content)
    const cssNodes = [...dom.window.document.querySelectorAll("link")]
    console.log("Editor css files found: " + cssNodes.length)
    createNode({
      id: "editorCss",
      urls: cssNodes.map(node => baseUrl + node.href),
      internal: {
        type: "editorCss",
        contentDigest: "html",
      },
    })

    const jsNodes = [...dom.window.document.querySelectorAll("script")].filter(
      node => node.src
    )
    console.log("Editor js files found: " + jsNodes.length)
    createNode({
      id: "editorJs",
      urls: jsNodes.map(node => baseUrl + node.src),
      internal: {
        type: "editorJs",
        contentDigest: "html",
      },
    })
  }

  if (
    node.internal.type === `File` &&
    (node.extension === "json" ||
      node.extension === "txt" ||
      node.extension === "url")
  ) {
    fs.readFile(node.absolutePath, undefined, (_err, buf) => {
      createNodeField({ node, name: `content`, value: buf.toString().trim() })
    })
  }
  if (isComposerName(node)) {
    createNodeField({ node, name: `type`, value: "composerName" })
  } else if (isCompositionName(node)) {
    createNodeField({ node, name: `type`, value: "compositionName" })
  } else if (isPerformerName(node)) {
    createNodeField({ node, name: `type`, value: "performerName" })
  } else if (isSheetMusicUrl(node)) {
    createNodeField({ node, name: `type`, value: "sheetMusicUrl" })
  }
}

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const sectionPlayerTemplate = path.resolve(
    `src/templates/sections-player-template.js`
  )
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query MyQuery {
        jsons: allFile(filter: { extension: { eq: "json" } }) {
          nodes {
            relativeDirectory
            relativePath
            fields {
              content
            }
          }
        }
      }
    `,
    {}
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.jsons.nodes.forEach(node => {
      const composer = node.relativePath.split("/")[0]
      const composition = node.relativePath.split("/")[1]
      const performer = node.relativePath.split("/")[2]
      createPage({
        // Path for this page — required
        path: `${node.relativeDirectory}`,
        component: sectionPlayerTemplate,
        context: {
          sections: JSON.parse(node.fields.content),
          composerNamePath: `${composer}/composer-name.txt`,
          compositionNamePath: `${composer}/${composition}/composition-name.txt`,
          performerNamePath: `${composer}/${composition}/${performer}/performer-name.txt`,
          sheetMusicUrlPath: `${composer}/${composition}/sheet-music.url`,
        },
      })
    })
  })
}
