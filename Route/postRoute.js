const express = require("express")
const {PostModel} = require("../Model/PostModel")
const {auth} = require("../Middleware/auth")
const postRouter = express.Router()

postRouter.get('/posts', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const category = req.query.category; 
    const title = req.query.title; 
  
    try {
      let query = {};
      if (category) {
        query = { category: category }; 
      }
  
      if (title) {
        query = { title: title};
      }
        const posts = await PostModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
        const totalPost = await PostModel.find()
        const len = totalPost.length
        res.status(200).send({total: len, Posts: posts})
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

postRouter.post("/posts", auth, async(req,res)=>{
    try {
        const newpost = new PostModel(req.body)
        await newpost.save()
        res.status(200).send({msg:"Post created", Post: req.body})
    } catch (error) {
        console.log(error)
    }
})

postRouter.patch("/posts/:post_id",auth, async(req,res)=>{
    let {post_id} = req.params
    try {
        await PostModel.findByIdAndUpdate({_id: post_id}, req.body)
        res.status(200).send({msg: "Product Updated"})
    } catch (error) {
        console.log(error)
    }
})

postRouter.delete("/posts/:post_id",auth, async(req,res)=>{
    let {post_id} = req.params
    try {
        await PostModel.findByIdAndDelete({_id: post_id}, req.body)
        res.status(200).send({msg: "Product Deleted"})
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
    postRouter
}