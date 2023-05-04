const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include:[Product]
  }).then(categories=>{
    res.json(categories)
  }).catch(err=>{
    console.log(err)
    res.status(500).json({msg:"error",err})
  })
});

router.get('/:id', (req, res) => {
  Category.findByPK(req.params.id,{
    include:[Product]
  }).then(category=>{
    if(!category){
      return res.status(404).json({msg:"no category with that id",err})
    }
    res.json(category)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred"})
  })
});

router.post('/', (req, res) => {
  Category.create({
    product_name:req.body.product_name
  }).then(newProduct=>{
    res.json(newProduct)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  })

});

router.put('/:id', (req, res) => {
  Category.update({
    category_name:req.body.category_name
  },{
    where:{
      id:req.params.id
    }
  }).then(editCategory=>{
    if(!editCategory[0]){
      return res.status(404).json({msg:"no category with that id in this database!"})
    }
    res.json(editCategory)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id:req.params.id
    }
  }).then(delCategory=>{
    if(!delCategory){
      return res.json(404).json({msg:"no category with this id in the database"})
    }
    res.json(delCategory)
  }).catch(err=>{
    console.log(err);
        res.status(500).json({msg:"error occurred",err})
  })
});

module.exports = router;
