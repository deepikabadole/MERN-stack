const express = require('express');
const router = express.Router();

//Item model initialize

const Item = require('../../models/Item');


//bcz we are using router so,instead of using app.get, we will use router.get


// @route GET api/items
// @desc GET All Items
// @access Public

router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
})

// @route POST api/items
// @desc GET All Items
// @access Public

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save().then(item => res.json(item));
})


// @route Delete api/items/:id
// @desc delete an Item
// @access Public

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id).then(item =>
        item.remove().then(() => res.json({success: true}))
    ).catch(err => res.status(404).json({success: false}))
})


module.exports = router