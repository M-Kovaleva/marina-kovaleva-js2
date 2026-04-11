# Social Media Application

Social media platform where users can share posts with images and follow other users

Built as a **Single Page Application (SPA)** using the Noroff API.

## Branches

| Branch | Description |
|--------|-------------|
| `main` | Production branch |
| `css-frameworks` | CSS Frameworks assignment (Tailwind CSS) |

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
- Dark mode toggle with localStorage persistence
- Mobile-first responsive design
- Hamburger menu for mobile navigation

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
- Tailwind CSS 4.2.2
- Noroff Social API (https://v2.api.noroff.dev)

### Tooling
- Vite
- Tailwind CSS CLI
- ESLint + Prettier
- Vercel for deployment

### Architecture
- SPA Router
- Modular component structure

## Architecture Overview

```bash
.
├── AI_Log.md
├── README.md
├── dist
│   ├── assets
│   │   ├── index-BzJIo3Oh.js
│   │   └── index-ClGaDma-.css
│   └── index.html
├── eslint.config.js
├── index.html
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── css
│   │   ├── input.css
│   │   └── tailwind.css
│   └── js
│       ├── api
│       │   └── apiClient.js
│       ├── auth
│       │   ├── loginHandler.js
│       │   ├── registerHandler.js
│       │   └── storage.js
│       ├── components
│       │   ├── Nav.js
│       │   └── PostCard.js
│       ├── handlers
│       │   ├── createPostHandler.js
│       │   ├── feedHandler.js
│       │   ├── postHandler.js
│       │   ├── profileHandler.js
│       │   └── searchHandler.js
│       ├── main.js
│       ├── router
│       │   └── router.js
│       ├── tests
│       │   ├── Home.test.js
│       │   ├── storage.test.js
│       │   └── validation.test.js
│       ├── utils
│       │   ├── theme.js
│       │   ├── ui.js
│       │   └── validation.js
│       └── views
│           ├── AbstractView.js
│           ├── CreatePost.js
│           ├── Home.js
│           ├── Login.js
│           ├── NotFound.js
│           ├── Post.js
│           ├── Profile.js
│           └── Register.js
├── vercel.json
└── vite.config.js
```

## Installation

- Clone the repository: bash git clone https://github.com/M-Kovaleva/marina-kovaleva-js2
- Open the repository: bash cd marina-kovaleva-js2
- Install dependencies: bash npm install
- Run development server: bash npm run dev
- Run Tailwind in watch mode: bash npm run tw:dev

## License
This project was created for educational purposes at Noroff.

## Contact
Marina Kovaleva - owlet.savvina@gmail.com