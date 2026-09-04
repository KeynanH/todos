import { GraphQLClient } from "graphql-request";

const endpoint = process.env.HYGRAPH_API_ENDPOINT as string;

export const hygraphClient = new GraphQLClient(endpoint)

export const hygraphAdminClient = new GraphQLClient(endpoint, {
    headers: {
        Authorization: process.env.HYGRAPH_API_TOKEN || ''
    },
})