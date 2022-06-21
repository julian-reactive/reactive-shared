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
# Troubleshot
### How to solve react hooks problem in apps
add this in `webpack.config` main app
```
resolve: {
  react: path.resolve('../../node_modules/react'),
  'react-router-dom': path.resolve('../../node_modules/react-router-dom')
}
```

for avoid `onlyText` lang issues, use these functions inside components tree. Do not create constants that use these functions outside components.... use `useMemo` for this 