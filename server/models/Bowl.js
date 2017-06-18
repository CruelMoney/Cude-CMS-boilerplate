'use strict';
const keystone = require( 'keystone');
const Types = keystone.Field.Types;
var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('../public/uploads/bowls'), // required; path where the files should be stored
        publicPath: '/uploads/bowls', // path where files will be served
    },
});

var Bowl = new keystone.List('Bowl')

Bowl.add({
    name: { type: String, required: true },
    highlights: { type: String },
    image: { 
        type: Types.File,
        storage: myStorage
	},
    price: { type: String },
    ingredients: { type: Types.Textarea },
});

Bowl.register();
