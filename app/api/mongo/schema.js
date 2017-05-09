/*
** 创建schema lala- -
 */

const { Schema } = require('mongoose');


exports.blogSchema = new Schema({
	title:  String,
	content:  String,         // html
	rawContent: String,       // markdown
	category: String,         //分类
	date: { type: String, default: ()=>{
		return new Date().toLocaleString()
	} },
});
