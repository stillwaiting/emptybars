import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"


function isComposerName(node) {
    return (node.relativeDirectory.split('/').length == 1 && node.internal.type == 'File' && node.name === 'name');
}

function addComposer(indexedData, node) {
    indexedData[node.relativeDirectory] = {
        name: node.fields.content,
        compositions: {},
    };
}

function isCompositionName(node) {
    return (node.relativeDirectory.split('/').length == 2 && node.internal.type == 'File' && node.name === 'name');
}

function addComposition(indexedData, node) {
    const composerSlug = node.relativeDirectory.split('/')[0];
    const compositionSlug = node.relativeDirectory.split('/')[1];
    indexedData[composerSlug].compositions[compositionSlug] = {
        name: node.fields.content,
        performers: {},
    };
}

function isPerformerName(node) {
    return (node.relativeDirectory.split('/').length == 3 && node.internal.type == 'File' && node.name === 'name');
}

function addPerformer(indexedData, node) {
    const composerSlug = node.relativeDirectory.split('/')[0];
    const compositionSlug = node.relativeDirectory.split('/')[1];
    const performerSlug = node.relativeDirectory.split('/')[2];
    indexedData[composerSlug].compositions[compositionSlug].performers[performerSlug] = {
        name: node.fields.content,
    };
}

const IndexPage = ({ data }) => {
    const indexedData = {};
    data.allFile.nodes.forEach(node => {
        if (isComposerName(node)) {
            addComposer(indexedData, node);
        }
    });
    data.allFile.nodes.forEach(node => {
        if (isCompositionName(node)) {
            addComposition(indexedData, node);
        }
    });
    data.allFile.nodes.forEach(node => {
        if (isPerformerName(node)) {
            addPerformer(indexedData, node);
        }
    });

    return <Layout>
        <SEO title="Home"/>
        <h1>Hi people</h1>
        <pre>{JSON.stringify(indexedData, null, 3)}</pre>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{maxWidth: `300px`, marginBottom: `1.45rem`}}>
            <Image/>
        </div>
        <Link to="/page-2/">Go to page 2</Link> <br/>
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout>
}

export default IndexPage

export const query = graphql`
    query MyQuery {
      allFile(sort: {fields: absolutePath}) {
        nodes {
          absolutePath
          id
          name
          extension
          relativeDirectory
          relativePath
          internal {
            type
          }
          fields { content }
        }
      }
    }
`