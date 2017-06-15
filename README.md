# Cude CMS

**Work in progress**

## Features

* React server side rendering with populating initial redux state. 
* Automatic model creations in DB thanks to keystone. 
* Automatic API endpoints for models. A model has to be enabled before endpoint is available.

##Environment variables
```
COOKIE_SECRET=<SECRET_GUID>
CLOUDINARY_URL=
MANDRILL_API_KEY=<API_KEY>
PORT=3000
PUBLIC_URL=http://0.0.0.0:3000
NODE_ENV=development
MONGO_URL=<remote mongo db url, otherwise local will be used. Example: mongodb://user:pass@domain:port/db_name>
```