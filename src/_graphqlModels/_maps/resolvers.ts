import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server'
import * as Joi from '@hapi/joi'



    //IMAGE: Joi.string().regex(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/),
const addMapPattern = Joi.object().keys({
    FeatureType: Joi.string().required(),
    properties : {
        PARK_ID: Joi.number().required(),
        NAME: Joi.string().required(),
        DESCRIPTIO: Joi.string().required(),
        IMAGE: Joi.array().required(),
        Price: Joi.number().required(),
        Review: Joi.number().required(),
        fav: Joi.boolean().required(),
    },
    geometry: {
        geometryType:  Joi.string().required(),
        coordinates: Joi.array().required(),
    }
})


const mapResolver = {
    Query: {
        getMapDetails: async (_, args, { mapModal }) => { 
            const mapData = await mapModal.find({});
            return mapData;        
        },
        onboundDetails: async (_, { data }, { mapModal }) => {            
            const bound = await mapModal.aggregate(
                [
                  {
                    $project:
                       {
                        FeatureType: 1,
                        properties: 1,
                        geometry: 1,
                         result: { $and: [ { $gte: [ { "$arrayElemAt": ["$geometry.coordinates", 0] }, data.minLat ] }, { $lte: [ { "$arrayElemAt": ["$geometry.coordinates", 0] }, data.maxLat ] }, { $gte: [ { "$arrayElemAt": ["$geometry.coordinates", 1] }, data.minLng ] }, { $lte: [ { "$arrayElemAt": ["$geometry.coordinates", 1] }, data.maxLng ] }  ] }
                       }
                  },
                  {
                      $match: 
                        {
                            result: true
                        }
                  }
                ]
             )
            return bound
        } 
    },
    Mutation: {
        addMapDetails: async (_, { data }, { mapModal }) => {  
            const result = Joi.validate(data, addMapPattern);
            console.log(result.error)
            if(result.error === null) { 
                let mapExist = await mapModal.findOne({"properties.PARK_ID": data.properties.PARK_ID})
                if(mapExist) {
                    throw new UserInputError('Location Already Exist');
                } else {
                    const location = await mapModal.create(data)            
                    return location
                }
            } else {
                throw new UserInputError('Please Enter Valid Inputs');
            }         
            
        }
    }
}

export default mapResolver
