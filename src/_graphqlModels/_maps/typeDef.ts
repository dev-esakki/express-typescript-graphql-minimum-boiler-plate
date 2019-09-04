import { gql } from 'apollo-server-express'

const mapTypeDef = gql` 

    type properties {
        PARK_ID: ID
        NAME: String
        DESCRIPTIO: String
        IMAGE: [String]
        Price: Float
        Review: Float
        fav: Boolean
    }

    type geometry {
        geometryType: String
        coordinates: [Float]
    }

    type MapsDetail {
        FeatureType: String
        properties: properties
        geometry: geometry
    }    

    input MapInput {
        FeatureType: String,
        properties: inputProperties,
        geometry: inputGeometry
    }

    input inputProperties {
        PARK_ID: ID,
        NAME: String,
        DESCRIPTIO: String,
        IMAGE: [String],
        Price: Float,
        Review: Float,
        fav: Boolean
    }

    input inputGeometry {
        geometryType: String,
        coordinates: [Float]
    }

    input inputOnBound {
        minLat: Float,
        maxLat: Float,
        minLng: Float,
        maxLng: Float
    }

    extend type Query {
        getMapDetails: [MapsDetail]
        onboundDetails(data: inputOnBound): [MapsDetail]
    }

    extend type Mutation {
        addMapDetails(data: MapInput): MapsDetail
    }
`

export default mapTypeDef