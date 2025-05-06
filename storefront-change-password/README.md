# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Flow of File

## `src/App.js`
```
This file is a starting point of microfront-end.

Components:
1) ChangePasswordPage

-> It is responsible for render ChangePassword Page Component ,which contains the remaining rendering part for ChangePassword.
-> It also contains code to remove InitialLoader from microfront-end
```
## `src/ChangePasswordPage/ChangePasswordPage.jsx`
```
Components:
1) ChangePasswordFormComponent

Dependencies:
1) microFrontEndData -> state.storeFrontContainer.microFrontEndData
2) passwordJsonTemplate -> contains the json template for changepassword
3) Components Needed from GlobalStore
4) componentMap -> it is object contains component to render

--> It is responsible for rendering the components based on renderType.
```
## `src/ChangePasswordFormComponent/ChangePasswordFormComponent.jsx`
```
Components:
1) NewPassword
2) UpdatePasswordDuo 
3) ConfirmNewPassword
4) UpdatePassword

Dependencies:
1) microFrontEndData -> state.storeFrontContainer.microFrontEndData
2) componentMap -> it is object contains component to render
3) unoTemplate -> contains json structure for changepassword uno template
4) duoTemplate -> contains json structure for changepassword duo template


--> It is responsible for dynamically rendering the components based on componentMap.
```
## `src/NewPassword/NewPassword.jsx`
```
Dependencies:
1) passwordError -> state.storeFrontChangePassword.passwordError
2) newPassword -> state.storeFrontChangePassword.newPassword
3) item -> contains data
4) Components Needed from GlobalStore

Events:
1) handleChange -> responsible for updating value

-> It is responsible for rendering the new password field related components.
```
## `src/ConfirmNewPassword/ConfirmNewPassword.jsx`
```
Dependencies:
1) passwordError -> state.storeFrontChangePassword.passwordError
2) newPassword -> state.storeFrontChangePassword.newPassword
3) item -> contains data
4) Components Needed from GlobalStore
5) confirmNewPassword -> state.storeFrontChangePassword.confirmNewPassword

Events:
1) handleChange -> responsible for updating value

-> It is responsible for rendering the confirm new password field related components.
```
## `src/UpdatePassword/UpdatePassword.jsx`
```
Dependencies:
1) snackBarMode -> useState
2) message -> useState
3) newPassword -> state.storeFrontChangePassword.newPassword
4) confirmNewPassword -> state.storeFrontChangePassword.confirmNewPassword
5) Components Needed from GlobalStore

Events:
1) handleClickChange -> responsible for validation, updating data, api call

-> It is responsible for rendering the Update Password button in uno template and click action for button.
```
## `src/UpdatePasswordDuo/UpdatePasswordDuo.jsx`
```
Dependencies:
1) snackBarMode -> useState
2) message -> useState
3) newPassword -> state.storeFrontChangePassword.newPassword
4) confirmNewPassword -> state.storeFrontChangePassword.confirmNewPassword
5) Components Needed from GlobalStore

Events:
1) handleClickChange -> responsible for validation, updating data, api call

-> It is responsible for rendering the Update Password button in duo template and click action for button.
```
# Description

## `src/App.js`
```
It is the entry point of the microfront-end. When this file render it will first remove the Loader from the page and render the ChangePasswordPage Component.
```
## `src/ChangePasswordPage/ChangePasswordPage.jsx`
```
It will first get all the data from depencies and components from GlobalStore. If the component or data is not present it return null, when the data comes it will dynamically render the component based on component type.

If component type is local it will get the component from componentMap and render it.
If component type is remote it will render the RemoteAppHandler component from GlobalStore.
```
## `src/ChangePasswordFormComponent/ChangePasswordFormComponent.jsx`
```
It has json structure and components in depencies data. When this component render it will check the template to load and based on template it will render components from dependencies.
```
## `src/NewPassword/NewPassword.jsx`
```
It will first get all the data from depencies and components from GlobalStore. If the component or data is not present it return null, when the data comes it will render the New Password field related component from GlobalStore. And on change in value it will call the event and update the data
```
## `src/ConfirmNewPassword/ConfirmNewPassword.jsx`
```
It will first get all the data from depencies and components from GlobalStore. If the component or data is not present it return null, when the data comes it will render the Confirm New Password field related component from GlobalStore. And on change in value it will call the event and update the data
```
## `src/UpdatePassword/UpdatePassword.jsx`
```
It will first get all the data from depencies and components from GlobalStore. If the component or data is not present it return null, when the data comes it will render the Update Password(uno) field related component from GlobalStore. And on click of button it will check the validation and if the validation passes it will make an api call and also update the data.Also it will show SnackBar based dependencies.
```
## `src/UpdatePasswordDuo/UpdatePasswordDuo.jsx`
```
It will first get all the data from depencies and components from GlobalStore. If the component or data is not present it return null, when the data comes it will render the Update Password(duo) field related component from GlobalStore. And on click of button it will check the validation and if the validation passes it will make an api call and also update the data.Also it will show SnackBar based dependencies.
```
# Unused files

1) `src/ChangePasswordForm/ChangePasswordForm.jsx`

