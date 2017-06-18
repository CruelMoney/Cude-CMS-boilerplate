'use strict';
const path = require( 'path')
const fs = require( 'fs')
const {render} = require('../../../public/build/server/serverRender')

exports = module.exports = async (req, res, next) => {
  
  // Create store and context to be populated one first render
  var initialState = {
    adminOverlay: {
      user: res.locals.user
    },
  }

  try {
      //  TODO  move this fetching to the frontend
      const RenderedApp = await render(initialState, req, res)
      res.send(RenderedApp)
  } catch (error) {
      next(error)
  }
 
};