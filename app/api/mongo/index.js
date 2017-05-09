/**
 * 增删改查！
 */
const mongoose = require('mongoose');
const { blogSchema } = require('./schema');

// (collection,schema)
const blogModule = mongoose.model('Blog', blogSchema);
