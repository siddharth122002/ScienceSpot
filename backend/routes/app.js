const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users')
const Posts = require('../models/Posts')
const secret = "iambatman"
const multer = require('multer')

const {storage} = require('../cloudinary')
const upload = multer({storage});

const isLoggedIn =async(req,res,next)=>{
    const token = req.cookies.token;
    
    if(!token){
        return res.send("no")
    }
    const pass =await jwt.verify(token,secret);
    req.user = pass;
    if(!pass){
        return res.send("no")
    }
    next();
}


router.get('/',async(req,res)=>{
    res.send("working")
})


router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({
        email:email,
    });
    if(!user){
        return res.json("this email is not connect to any account")
    }
    const pass =await bcrypt.compare(password,user.password)
    if(!pass){
        return res.json("invalid email or password")
    }
    const token =await jwt.sign({name:user.name,id:user._id},secret);
    res.cookie('token', token).json("ok")
})

router.post('/register',async(req,res)=>{
    const {name,email,password} = req.body;
    const hash =await bcrypt.hash(password,12);
    await User.create({
        name:name,
        email:email,
        password:hash,
    })
    res.json("ok")
})

router.get('/logout',(req,res)=>{
    res.clearCookie("token")
    res.send("ok");
})


router.post('/create',isLoggedIn,upload.single('file'),async(req,res)=>{
    try{
        const id = req.user.id;
        const {title,summary,article}=req.body;
        const post = await Posts.create({
            title:title,
            summary:summary,
            article:article,
            image:req.file.path,
            author:id,
        })
        await post.save();
        res.send("ok")
    }catch(err){
        console.log("cloudinary err")
    }
})
        

router.get('/posts',async(req,res)=>{
    
    const allPosts = await Posts.find();
    
    res.send(allPosts);
})
router.get('/post/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const post = await Posts.findOne({
        _id:id,
    }).populate('author')

    if(req.user.id===post.author._id.toString()){
        return res.send({post,editable:true});
    }
    res.send({post,editable:false})
})

//editing
router.put('/post/:id/edit',isLoggedIn,upload.single('file'),async(req,res)=>{
    const {id,title,summary,article} = req.body;
    const post = await Posts.findById(id);
    await Posts.findByIdAndUpdate(id,{
        title,
        summary,
        article,
        image: req.file?req.file.path:post.image,
    });
    res.json(post);
});


module.exports = router;