import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const partnerSchema = new Schema ({
    name: String,
    brief: String,
    pic:  {
        type:String, default:'./uploads/robot'
    },
    project: [
        {type: ObjectId, ref: 'Project'}
    ],
});

const Partner = mongoose.model('Partner', partnerSchema, 'partner');

export default Partner;