# Social Media Application

Social media platform where users can share posts with images and follow other users

Built as a **Single Page Application (SPA)** using the Noroff API.

## Live Demo

[View live demo](https://marina-kovaleva-js2.vercel.app/)

## Features

### Authentication

- User registration and login
- Secure token-based authentication
- Protected actions for logged-in users

### Posts

- Create, edit and delete your own posts
- Add images 
- Display posts in a feed and as a single view


### Profiles and Following

- View user profiles
- Follow and unfollow users
- Changeable counters of posts, followers and following

### Search



### UI and UX

- SPA router navigation
- Responsive layout


## Tech Stack

### Front End

- HTML
- CSS
- Vanilla JavaScript

### Architecture

- SPA Router
- Modular component structure

### API

- Noroff Social API
- Bearer token authentication

### Tooling

- Vite
- GitHub Actions for deployment

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

Follow these steps to get a copy of the project running locally:

✅**Clone the repo**

```bash
git https://github.com/M-Kovaleva/marina-kovaleva-js2
cd cd your-repo-name
```

✅**Install dependencies**

```bash
npm install
```

✅**Add `.env`**

VITE_NOROFF_API_KEY=your_api_key_here

✅**Run dev server**

```bash
npm run dev
```

## API Usage

This project uses the Noroff Social API. Authentication requires:

- Bearer token
- API key header

Example:

Authorization: Bearer token
X-Noroff-API-Key: key

## Validation and Security

- Password validation
- Email validation
- Image URL validation

## Learning Goals

- SPA architecture
- Modular JS design
- API integration and authentication

## Known Issues
- "Create" instead of "Save" during editing post

## Future Improvements
- Refactoring the project architecture
- Create services/ (API layer)
- Create initialize/ (Initialize pages)
- Toast.js

## License
This project was created for educational purposes at Noroff.

## Contact
Marina Kovaleva - owlet.savvina@gmail.com
Project Link: [https://github.com/M-Kovaleva/marina-kovaleva-PE1-JAN25FT](https://github.com/M-Kovaleva/marina-kovaleva-PE1-JAN25FT)
