# Party Questions App

This is a simple React Native (Expo) prototype that allows a host to create a room and distribute secret questions to players. One player receives an "odd" question while everyone else gets the same main question. The app is only responsible for distributing questions and starting the offline discussion.

## Setup

1. Install [Expo CLI](https://docs.expo.dev/get-started/installation/) globally.
2. Install dependencies:

```bash
npm install
```

3. Configure Firebase.
   - Copy your Firebase project credentials into `src/firebase.js`.

4. Run the development server:

```bash
npm start
```

Use the Expo Go app or an emulator to test.

## Project Structure

- `App.js` – navigation setup
- `src/screens/*` – individual screens
- `src/firebase.js` – Firebase initialization (Firestore)
- `src/questions.js` – sample question pairs

This project focuses on the basic game flow and room/question management. UI styling is minimal for clarity.
