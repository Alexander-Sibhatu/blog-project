const { Schema, model } = require('mongoose')


const blogSchema = Schema({
    //title, description, image
    title: {required:true, type:String, trim:true, unique:true},
    description: {required:true, type:String, trim:true},
    image: {required:true, type:String, trim:true},
    slug: {required:true, type:String},
},
{timestamps: true}
);

const Blog = model('Blog', blogSchema)

module.exports = Blog