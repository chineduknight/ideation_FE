# Mini Note App - Frontend

This is the frontend part of the Mini Note App with authentication and note management features.

## Demo Link

Access the site at [knight-noteapp](https://knight-noteapp.netlify.app)

## Table of Contents

- [About The App](#about-the-app)
- [Technologies](#technologies)
- [Setup](#setup)
- [Approach](#approach)
- [Status](#status)
- [Credits](#credits)
- [License](#license)

## About The App

This is the frontend part of the Mini Note App that allows users to register, log in, manage their notes, and reset their passwords. The app features client-side validation and state management using Redux.

## Technologies

- **React**
- **Redux**
- **Chakra UI**
- **localforage**
- **react-toastify**
- **TypeScript**
- **@tanstack/react-query**

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repository-url.git
   cd your-repository-folder/frontend
   ```
2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Running the Application:**

```sh
 npm start
 # or
 yarn start
```

4. **Environment Variables:**

```sh
 REACT_APP_BASE_URL= =<your-backend-url>

```

## Usage

After launching the app, you can register a new user account or log in to an existing account. Once logged in, you can add, view, and delete notes. If you forget your password, you can use the "Forgot Password" feature to reset it.

## Approach

The project uses a modular approach with reusable components. Chakra UI is used for consistent styling, and form validation is handled client-side with appropriate error messages for invalid inputs. Redux manages the application state, including user authentication status and notes.

## Status

The Mini Notes App is a work in progress. Future updates will include more features and improvements.

## Credits

List of contributors:

- [Chinedu Knight](https://chineduknight.com)

## License

MIT license @ [knight](chineduknight.com)
