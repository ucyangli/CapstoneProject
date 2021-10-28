import mongoose from 'mongoose';

const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const resourceSchema = new Schema ({
    name: String,
    brief: String,
    detail: String,
    rsimg:  {
        type:String, default:'./uploads/robot'
    },
    project: [
        {type: ObjectId, ref: 'Project'}
    ]
});

const Resource = mongoose.model('Resource', resourceSchema, 'resource');

export default Resource;

