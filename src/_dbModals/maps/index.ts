import * as mongoose from 'mongoose'
const Schema = mongoose.Schema;


const mapSchema = new Schema({
    FeatureType: {  type: String, default: ''},
    properties: {
        PARK_ID: {  type: Number, default: 0},
        Price: {  type: Number, default: 0},
        Review: {  type: Number, default: 0},
        fav:  {  type: Boolean, default: false},
        NAME: {  type: String, default: ''},
        DESCRIPTIO: {  type: String, default: ''},
        IMAGE: { type : [String] , default : [] },
        CREATED_DA: { type: Date, default: Date.now },
    },
    geometry: {
        geometryType: {  type: String, default: 'Point'},
        coordinates: { type : [Number] , default : [] }   //lat, lang
    }
})
const mapModal = mongoose.model('maps', mapSchema);
export default mapModal
