const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Photobooth Collection
const photoboothSchema = new schema({
    name: {type:String, required:true},
    boothNum: {type:Number, required: true},
    gender: {type:String, required:true},
    hasHairdo: {type:Boolean, required:true},
    hasMakeup: {type:Boolean, required:true},
    queueNumber: {type:Number, required: true}
});

// Models
const photobooth = mongoose.model("Photobooth", photoboothSchema);
const mySchemas = {"Photobooth": photobooth};

module.exports = mySchemas;
