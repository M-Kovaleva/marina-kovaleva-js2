# Social Media Application

Social media platform where users can share posts with images and follow other users

Built as a **Single Page Application (SPA)** using the Noroff API.

## Live Demo

[View live demo](https://marina-kovaleva-js2.vercel.app/)

## Pages
- Home/feed
- Login
- Register
- Single Post
- Create Post
- Profile

## Features
- Register new user
- Login user
- View all posts
- View a single post
- Create post
- Edit own post
- Delete own post
- View posts of a specific user
- Follow / unfollow user
- Search posts
- View own profile

## Known Issues
- Search uses client-side filtering 
- Create button instead of Save button at the editing post
- Alerts instead of toasts

## Future Improvements
- Reaction system (likes etc.)
- Comments creation
- Edit own profile

## Tech Stack
- Vanilla JavaScript 
- HTML 
- CSS
- Noroff Social API (https://v2.api.noroff.dev)

### Tooling
- Vite
- Vercel for deployment

### Architecture
- SPA Router
- Modular component structure

## Architecture Overview

```bash
src/js/
├── api/
│   └── apiClient.js
├── auth/
│   ├── loginHandler.js
│   ├── registerHandler.js
│   └── storage.js
├── components/
│   ├── Nav.js
│   └── PostCard.js
├── handlers/
│   ├── feedHandler.js
│   ├── profileHandler.js
│   ├── postHandler.js
│   ├── createPostHandler.js
│   └── searchHandler.js
├── router/
│   └── router.js
├── utils/
│   ├── validation.js
│   └── ui.js
├── views/ 
│   └── (Page views)
└── main.js
```

## Installation

- Clone the repository: bash git clone https://github.com/M-Kovaleva/marina-kovaleva-js2
- Open the repository: bash cd ProjectExam1
- Run Live Server or write npm run dev in the terminal

## License
This project was created for educational purposes at Noroff.

## Contact
Marina Kovaleva - owlet.savvina@gmail.com

