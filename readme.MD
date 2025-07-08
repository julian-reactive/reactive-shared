# Reactive Shared
Super Set of libraries for build Apps faster.

This app will help to build list && form based apps in a faster without too much thinking.

The main libraries in this app are:
- [react](https://es.reactjs.org/)
- [mui](https://mui.com/)
- [react-router](https://reactrouter.com/)
- [react-query](https://tanstack.com/query/v3/)
- [react-hook-form](https://react-hook-form.com/)

Other libraries like [yup](https://github.com/jquense/yup), [moment](https://momentjs.com/), [lodash](https://lodash.com/), etc. are used as helper for main libraries. Further it's described how are used.

---

# IMPORTANT!
__Reactive Shared__ was build with __webpack__ as bundler and some ___peerDependencies___. It's ___mandatory___ to keep same versions in main app, for avoid conflicts and duplicated libraries.
- "@date-io/date-fns": "^2.14.0",
- "@emotion/react": "11.9.3",
- "@emotion/styled": "11.9.3",
- "@fontsource/roboto": "4.5.7",
- "@mui/icons-material": "5.8.4",
- "@mui/material": "5.9.0",
- "@mui/system": "^5.9.0",
- "@mui/x-date-pickers": "^5.0.0-beta.2",
- "date-fns": "^2.28.0",
- "lodash": "4.17.21",
- "moment": "^2.29.3",
- "moment-timezone": "^0.5.34",
- "react": "18.2.0",
- "react-router-dom": "6.3.0",
- "yup": "^0.32.11"

For use them correctly it's needed to add some of them as alias in ___webpack.config___ file. Ie `webpack.common.js`:
```
...
resolve: {
  ...
  '@mui': path.resolve(__dirname, 'node_modules/@mui'),
  lodash: path.resolve(__dirname, 'node_modules/lodash'),
  react: path.resolve(__dirname, 'node_modules/react'),
  'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
  '@date-io/date-fns': path.resolve(__dirname, 'node_modules/@date-io/date-fns'),
  'date-fns': path.resolve(__dirname, 'node_modules/date-fns'),
  ...
  },
  ...
}
```

---

# Index
- [Reactive Shared](#reactive-shared)
- [IMPORTANT!](#important)
- [Index](#index)
  - [Setting the App](#setting-the-app)
    - [Structure Proposal](#structure-proposal)
      - [assets](#assets)
      - [config](#config)
    - [App Context](#app-context)
    - [Auth Component](#auth-component)
    - [Routing](#routing)
    - [index.tsx](#indextsx)
    - [app.tsx](#apptsx)
  - [Initial Config](#initial-config)
    - [Translations](#translations)
    - [Main Context](#main-context)
    - [Menu Items](#menu-items)
    - [Routes](#routes)
  - [List Builder](#list-builder)
  - [Form Builder](#form-builder)
- [Troubleshot](#troubleshot)

## Setting the App
### Structure Proposal
- src
  - **assets**:
  - **config**: store configuration files needed for set the app with `reactive-shared` library.
  - **entities**: set app sections here 
  - **App.tsx**: set app config
  - **index.tsx**: app entrypoint

#### assets
folder for store media files

#### config
folder for store all

### App Context
### Auth Component
### Routing
### index.tsx
### app.tsx

## Initial Config
### Translations
### Main Context
### Menu Items
### Routes

## List Builder
## Form Builder

---
---
# Troubleshot
- for avoid `onlyText` lang issues, use these functions inside components tree. Do not create constants that use these functions outside components.... use `useMemo` for this.