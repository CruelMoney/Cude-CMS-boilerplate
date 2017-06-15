'use strict';
const path = require( 'path')
const fs = require( 'fs')
const {render} = require('../../../public/build/server/serverRender')

exports = module.exports = (req, res, next) => {
  const filePath =  path.resolve(__dirname, '.', '../../../public/main.html');
  
  var locals = res.locals;

  //Read the react created html file
  fs.readFile(filePath, 'utf8', async (err, htmlTemplate)=>{
    
    // Create store and context to be populated one first render
    var initialState = {
      adminOverlay: {
        user: req.user
      },
    }

    try {
        //  TODO  move this fetching to the frontend
        const RenderedApp = await render(initialState, req, htmlTemplate)
        res.send(RenderedApp)
    } catch (error) {
        next(error)
    }
  
  })
 
};