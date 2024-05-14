const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const favModel = require("../models/favModel");
const cartModel = require("../models/cartModel");

const getHome = async (req, res) => {
  if (req.user) {
    const email = req.user.email;
    const user = await userModel.findOne({ email: email });
    const carts = await cartModel.find({userId: user._id }).populate("productId");
    let totalAmount;
    await carts.map((item)=>{
      // console.log(item.productId.price)
     totalAmount += Number(item.productId.price);
    })
    console.log(totalAmount);
    res.render("index", { user, totalAmount});
  } else {
    res.render("index");
  }
};

const getContact = (req, res) => {
  res.render("contact");
};

const getBlog = (req, res) => {
  res.render("blog");
};
const getSingleBlog = (req, res) => {
  res.render("single-blog");
};

const getShop = async(req, res) => {
   if(req.user){
    const userEmail = req.user.email
    const user = await userModel.findOne({email:userEmail});
    let page;
    if(req.query){
      page = req.query.page
    }
    
    const count = await productModel.find().countDocuments()
    let totalPages = Math.ceil(count/3)
    let allPages = []
    for(let i=1; i<= totalPages; i++){
      allPages.push({pageNumber:i})
    }

    // fo0r the previous and next page
    let previous = Number(page)-1
    let next = Number(page)+1
    if(previous <=1){
      previous = null
    }

    if(next >= allPages.length){
      next = null
    }

    const product = await productModel.find().populate("postBy").limit(5).sort({date:-1}).skip((page-1)*5);
    // console.log(product)
    res.render("shop", {user, product,next,previous,allPages,count,totalPages,page});
  }else{
    let perpage = 5
    let page;
    if(req.query){
      page = req.query.page
    }

    const count = await productModel.find().countDocuments()
    let totalPages = Math.ceil(count/perpage)
    let allPages = []
     
    for(let i=1; i<= totalPages; i++){
      allPages.push({pageNumber:i})
    }
    let previous = Number(page)-1
    let next = Number(page)+1
    if(previous <=1){
      previous = null
    }
     if(next >= allPages.length){
      next = null
    }
      const product = await productModel.find().populate("postBy").limit(perpage).sort({date:-1}).skip((page-1)*5);
    // console.log(product)
    res.render("shop", { product,next,previous,allPages,count,totalPages,page});
  }
}; 

const getSingleProduct = (req, res) => {
  res.render("single-product-details");
};

const getCheckout = async (req, res) => {
  if (req.user) {
    const email = req.user.email;
    const user = await userModel.findOne({ email: email });
    const carts = await cartModel.find({userId: user._id }).populate("productId");
    let totalAmount;
    await carts.map((item)=>{
      // console.log(item.productId.price)
     totalAmount += Number(item.productId.price);
    })
    console.log(totalAmount);
    
    // console.log(user)
    res.render("checkout", { user, totalAmount, carts });
  } else {
    res.redirect("/login");
  }
};

const getLoginSignup = (req, res) => {
  res.render("orangelogin");
};
const getFavourite = async(req, res)=>{
  if(req.user){
    const productId = req.params.id
    const userEmail = req.user.email
   //  const product = await productModel.findOne( _id: productId)
    const user = await userModel.findOne({email:userEmail})
    const product = await productModel
    .find({postBy: user._id})
    .populate("postBy")
    const favourite = await favouriteModel.findOne({
      userId:user_Id, 
      productId:productId})
    if(!favourite){
     await favouriteModel.create({
       userId: user._id,
       productId:productId
      })
     res.render("shop", {user,  product: "Product added favourite"});
    }else{
 
     res.render("shop", {user,  product: "Product already added favourite"});
    }
  }else{
     res.redirect("/login")
  }
};

const getCart = async(req, res) =>{
  const userEmail = req.user.email;
  const user = await userModel.findOne({ email: userEmail });
  const allCarts = await cartModel.find({userId:user._id}).populate("productId");
  const carts = await allCarts.map((item, index) => ({
    index: index + 1,
    ...item.toObject(),
  }));
  res.render("cart", { user, carts})
};

const addCart = async(req, res)=>{
  if(req.user){
    const productId = req.params.id
    const userEmail = req.user.email
   //  const product = await productModel.findOne( _id: productId)
    const user = await userModel.findOne({email:userEmail})
    const product = await productModel
    .find()
    .populate("postBy")
    const cart = await cartModel.findOne({
      userId:user._Id, 
      productId:productId
    })
    if(!cart){
     await cartModel.create({
       userId: user._id,
       productId:productId
      })
     res.render("shop", {user,  product: "Product added to cart"});
    }else{
 
     res.render("shop", {user,  product: "Product already added to cart"});
    }
  }else{
     res.redirect("/login")
  }
}
const deleteCart = async(req, res)=>{
  const mCart = req.params.id
  const userEmail = req.user.email;
  const user = await userModel.findOne({ email: userEmail });
  const allCarts = await cartModel.find({userId:user._id}).populate("productId");
  const carts = await allCarts.map((item, index) => ({
    index: index + 1,
    ...item.toObject(),
  }));
  await cartModel.findByIdAndDelete(mCart)
  res.render("cart", { user, carts, message:"product deleted from cart"})
}


const getPostProduct = async (req, res) => {
  const userEmail = req.user.email;
  const user = await userModel.findOne({ email: userEmail });
  res.render("postproduct", { user });
};

const postPictures = async (req, res) => {
  const userEmail = req.user.email;
  const user = await userModel.findOne({ email: userEmail });
  const { name, description, price, colors, sizes } = req.body;
  const images = req.files.images;
  const colorArr = colors.split(",");
  const sizeArr = sizes.split(",");
  const imageArr = [];

  if (Array.isArray(images)) {
    await Promise.all(
      images.map(async (image, index) => {
        const imageName = image.name;
        try {
          await new Promise((resolve, reject) => {
            image.mv(`public/uploads/${imageName}`, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
          const filePath = `/uploads/${imageName}`;
          imageArr.push(filePath);
        } catch (err) {
          return res.render("postproduct", {
            error: "Error occurred while adding images",
            user,
          });
        }
      })
    );
  } else {
    const imageName = images.name;
    try {
      await new Promise((resolve, reject) => {
        images.mv(`public/uploads/${imageName}`, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      const filePath = `/uploads/${imageName}`;
      imageArr.push(filePath);
    } catch (err) {
      return res.render("postproduct", {
        error: "Error occurred while adding images",
      });
    }
  }

  await productModel.create({
    name: name,
    description: description,
    price: price,
    size: sizeArr,
    color: colorArr,
    images: imageArr,
    postBy:user._id,
    displayImage: imageArr[0] || "",
    displayImageTwo: imageArr.length > 1 ? imageArr[1] : imageArr[0],
  });
  res.render("postproduct", { user, message: "Post added successfully" });
};

module.exports = {
  getHome,
  getBlog,
  getShop,
  getSingleProduct,
  getCheckout,
  getSingleBlog,
  getContact,
  getLoginSignup,
  getPostProduct,
  getFavourite,
  addCart,
  getCart,
  postPictures,
  deleteCart
};
