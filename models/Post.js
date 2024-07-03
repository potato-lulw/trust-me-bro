import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    links: [{ 
        type: String, 
        required: true,
    }]
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default Post;
