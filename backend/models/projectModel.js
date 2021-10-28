import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const projectSchema = new Schema ({
    title: String,
    brief: String,
    detail: String,
    status: {
        type:String,
        enum :['current','future','past'],
        required: true
    },
    teamleader: {
        type: ObjectId,
        ref: 'Member'
    },
    member:[
        {
            type: ObjectId,
            ref: 'Member'
        }
    ],
    supervisor:[
        {
            type: ObjectId,
            ref: 'Member'
        }
    ],
    partner: [{
        type: ObjectId,
        ref: 'Partner'
    }],
    resource: [{
        type: ObjectId,
        ref: 'Resource'
    }],
    cover: {
        type:String, default:'./uploads/robot'
    },
    isFeatured: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Project = mongoose.model('Project', projectSchema, 'project');

export default Project;