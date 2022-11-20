# Shared App
Set of utils for all the fs front apps.

Here is defined the main resources for create routes, create forms and api calls.

---
## Create Routes
For create Router schema its needed to have a config object (see [useRoutes Doc](https://reactrouter.com/docs/en/v6/api#useroutes))

TODO: set config for auth

 and set in the root file app

```
import 
```

---
## Create Forms


---

## Api calls

---
## Components and Utils
- components
  - loading
- hoc
  - buildEntityPage
  - buildForm
- utils
  - api
  - endpoints
  - intl
  - localStorage



----
# Scripts
## Create Entity


run  `node node_modules/reactive-shared/createEntity.js entity`  where `entity` must be singular and lower. (ie: user, post, config)


For run correctly, in your main repo must have `chalk` & `pluralize`. (`npm run --save-dev chalk pluralize`)

----
# Troubleshot
### How to solve react hooks problem in apps
add this in `webpack.config` main app
```
resolve: {
  react: path.resolve('../../node_modules/react'),
  'react-router-dom': path.resolve('../../node_modules/react-router-dom')
}
```

for avoid `onlyText` lang issues, use these functions inside components tree. Do NOT create constants that use these functions outside components.... use `useMemo` for this 