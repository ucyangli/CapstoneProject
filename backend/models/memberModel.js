import mongoose from 'mongoose';
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const memberSchema = new Schema ({
    
    email: String,
    name: String,
    img:  {
        type:String, default:'./uploads/face'
    },
    pjs: [
        {type: ObjectId, ref: 'Project'}
    ],
    leadpjs: [
        {type: ObjectId, ref: 'Project'}
    ],
    role: {
        type:String,
        enum :['Professor','PhD','PostGraduate','UnderGraduate'],
        required: true
    },
    isCurrent: {
        type:Boolean,
        default: false,
        required: true
    }
});

const Member = mongoose.model('Member', memberSchema, 'member');

export default Member;