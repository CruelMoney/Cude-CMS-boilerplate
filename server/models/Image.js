var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Image = new keystone.List('Image', {
    hidden: true
});
 
Image.add({
    key: { 
        type: String, 
        required: true, 
        initial: true, 
        index: { unique: true }  //only one of each key
    },
    url: { type: String }
});


Image.register();