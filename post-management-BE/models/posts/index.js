const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
   },
   thumbnail: {
      type: String,
      required: true,
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
});

// Automatically update the `updatedAt` field when the document is modified
postSchema.pre('save', function (next) {
   if (this.isModified()) {
      this.updatedAt = Date.now(); // Set updatedAt to current timestamp
   }
   next();
});

// Create the Post model based on the schema
const Post = mongoose.model('posts', postSchema);

module.exports = Post;
