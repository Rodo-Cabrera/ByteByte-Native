# ByteBite: mobile e-commerce app

React Native (Expo) shop app: browse and search products, filter by category, manage a cart, sign up and log in, and contact the store.
Part of the ByteBite project, together with the [backend](https://github.com/Rodo-Cabrera/ByteBite-Backend) and the [web front end](https://github.com/Rodo-Cabrera/ByteBite).

![ByteBite](src/assets/eShop.png)

## Features

- Authentication (login / register / profile) with a JWT stored in AsyncStorage and sent by an Axios interceptor.
- Product catalog with search by title, category filters, carousel and product detail modal.
- Cart with global state (React Context + reducers).
- Contact form via EmailJS.
- Drawer, stack and bottom-tab navigation (React Navigation).
- Forms with Formik + Yup validation and React Native Paper UI.

## Tech stack

React Native · Expo · React Navigation · Context API + useReducer · Axios · Formik · Yup · React Native Paper · EmailJS

## Getting started

```bash
npm install
cp .env.example .env   # fill in API URL/port and EmailJS keys
npx expo start
```

## Author

**Rodolfo Cabrera**: Full Stack & Mobile Developer. [GitHub](https://github.com/Rodo-Cabrera)
