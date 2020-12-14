import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
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

    const composerSlugsSorted = data.composers.nodes.map(node => node.relativeDirectory);
    composerSlugsSorted.sort();

    const renderPerformer = (compositionName, composerSlug, compositionSlug, performerSlug) => {
        return <li key={compositionSlug + '_' + performerSlug}>
            <Link to={`${composerSlug}/${compositionSlug}/${performerSlug}`}>{compositionName}, performed by {indexedData[composerSlug].compositions[compositionSlug].performers[performerSlug].name}</Link>
        </li>
    }

    const renderComposition = (composerSlug, compositionSlug) => {
        const performersSorted = Object.keys(indexedData[composerSlug].compositions[compositionSlug].performers);
        performersSorted.sort();
        const compositionName = indexedData[composerSlug].compositions[compositionSlug].name;
        return performersSorted.map(performerSlug => renderPerformer(compositionName, composerSlug, compositionSlug, performerSlug));
    }

    const renderComposer = (composerSlug) => {
        const compositionsSorted = Object.keys(indexedData[composerSlug].compositions);
        compositionsSorted.sort();
        return <li key={composerSlug}>
            <b>{indexedData[composerSlug].name}</b>
            <ul>
                {compositionsSorted.map(compositionSlug => renderComposition(composerSlug, compositionSlug))}
            </ul>
        </li>;
    }

    return <Layout composition='EmptyBars.org'>
        <SEO title="Home"/>
        <ul>
        {composerSlugsSorted.map(renderComposer)}
        </ul>
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