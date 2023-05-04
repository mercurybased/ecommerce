const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//TAG
router.get('/', (req, res) => {
  Tag.findAll({
    include:[Product]
  }).then(tags=>{
    res.json(tags)
  }).catch(err=>{
    console.log(err)
    res.status(500).json({msg:"error",err})
  })
});


// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', (req, res) => {
  Tag.findByPK(req.params.id,{
    include:[Product]
  }).then(tags=>{
    if(!tags){
      return res.status(404).json({msg:"no tags with that id",err})
    }
    res.json(tags)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  })
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name:req.body.tag_name
  }).then(newTag=>{
    res.json(newTag)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
  })
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  router.put('/:id', (req, res) => {
    Tag.update({
      tag_name:req.body.tag_name
    },{
      where:{
        id:req.params.id
      }
    }).then(editTag=>{
      if(!editTag[0]){
        return res.status(404).json({msg:"no tag with that id in this database!"})
      }
      res.json(editTag)
    }).catch(err=>{
      console.log(err);
      res.status(500).json({msg:"error occurred",err})
    })
  });
  
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:{
      id:req.params.id
    }
  }).then(delTag=>{
    if(!delTag){
      return res.json(404).json({msg:"no tag with this id in the database"})
    }
    res.json(delTag)
  }).catch(err=>{
    console.log(err);
        res.status(500).json({msg:"error occurred",err})
  })
});

module.exports = router;
