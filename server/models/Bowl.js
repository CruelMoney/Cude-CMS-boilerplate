'use strict';
const keystone = require( 'keystone');
const Types = keystone.Field.Types;

var Bowl = new keystone.List('Bowl')

Bowl.add({
    name: { type: String, required: true },
    highlights: { type: String },
    image: { type: Types.CloudinaryImage },
    price: { type: String },
    ingredients: { type: Types.Textarea },
});

Bowl.register();
