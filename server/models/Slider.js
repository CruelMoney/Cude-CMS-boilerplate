'use strict';
const keystone = require( 'keystone');
const Types = keystone.Field.Types;

var Slider = new keystone.List('Slider')

Slider.add({
    name: { type: String, required: true },
    images: {
        type: Types.CloudinaryImages,
        folder: 'californiakitchen/slider',
        autoCleanup : true,
        select: true
	},
});
Slider.register();
