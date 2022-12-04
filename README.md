# Blog - Random code stuff go!

Blog app created with svelte firebase.

## Setup:

### create firebase project

1.  enable firestore
2.  enable authentication ( with google )
3.  create service accout
4.  create blog-admin account by signing up with google `/signup`
5.  run script `userCustomClaims.ts` to give admin rights to blog-admin user

## TODO:

1. **Auth**
   1. Prevent users from creating google accouts
2. **Preview**
3. **refactor**
   1. reuse logic in post-edit / draft-create

## Bugs

1. created post don't get assign to it's series

### - optional:

1. **Post Page**
   1. search bar
   2. infinite scroll
2. **Footer**
   1. social media icons
3. **About Page**
4. **Server Side Rendering**
   1. add admin sdk firestore config to netlify env variables.
5. **hover states for links**
6. **create gihub pipeline**
   1. deploy rules
   2. deploy indexes
   3. ensure admin user exists
