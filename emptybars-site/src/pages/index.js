import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

function addComposer(indexedData, node) {
    indexedData[node.relativeDirectory] = {
        name: node.fields.content,
        compositions: {},
    };
}

function addComposition(indexedData, node) {
    const composerSlug = node.relativeDirectory.split('/')[0];
    const compositionSlug = node.relativeDirectory.split('/')[1];
    indexedData[composerSlug].compositions[compositionSlug] = {
        name: node.fields.content,
        performers: {},
    };
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
    data.composers.nodes.forEach(node => {
        addComposer(indexedData, node);
    });
    data.compositions.nodes.forEach(node => {
        addComposition(indexedData, node);
    });
    data.performers.nodes.forEach(node => {
        addPerformer(indexedData, node);
    });

    // data.allFile.nodes.forEach(node => {
    //     if (isPerformerName(node)) {
    //         addPerformer(indexedData, node);
    //     }
    // });

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
        composers: allFile(filter: {fields: {type: {eq: "composerName"}}}) {
            nodes {
              relativeDirectory
              fields {
                content
              }
            }
        }
        compositions: allFile(filter: {fields: {type: {eq: "compositionName"}}}) {
            nodes {
              relativeDirectory
              fields {
                content
              }
            }
        }
        performers: allFile(filter: {fields: {type: {eq: "performerName"}}}) {
            nodes {
              relativeDirectory
              fields {
                content
              }
            }
        }
    } 

`