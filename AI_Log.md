Tool used: ChatGPT
Date: 13 February 2026
Purpose: Brainstorming project structure based on assignment requirements, file organization
Outcome: Understood implementation order, prioritize

Date: 13 February 2026
Purpose: Discussed color scheme, typography, spacing scale ect.
Outcome: I created style.css with CSS variables 

Date: 16 February 2026
Purpose: Explaining client-side routing with History API. Explaining AbstractView pattern, pathToRegex function for dynamic routes, navigateTo function  
Outcome:  Improved understanding of SPA router with dynamic parameter extraction

Date: 17 February 2026
Purpose: Explaining JavaScript concepts - FormData API vs manual input.value extraction. Comparing approaches for form handling; explaining FormData constructor and get() method     
Outcome: Refactored registration form to use FormData

Date: 17 February 2026
Purpose: Brainstorming testing approach. Discussing unit tests, Jest 
Outcome: Understood testing concepts but deferred implementation due to time constraints; focused on core features

Date: 17 February 2026
Purpose: Brainstorming project structure - deciding between separate vs universal validation functions. Comparing validation approaches: specific functions 
Outcome: Chose specific validation functions for clarity and reusability; implemented validation.js module

Date: 17 February 2026
Purpose: Brainstorming test cases. Help with the definition of test scenarios
Outcome: Writing unit tests based on the proposed test cases

Date: 18 February 2026
Purpose: Brainstorming user flow for feed page with posts display, search, pagination. Discussing layout structure, component organization, event handler setup    
Outcome: Created feed page HTML template with navbar, search bar, post cards, pagination controls

Date: 18 February 2026
Purpose: Brainstorming project structure - centralizing HTTP requests. Explaining benefits of unified API client vs scattered fetch calls; discussing error handling patterns  
Outcome: I created apiClient.js with get/post/put/delete helpers; centralized authentication headers

Date: 18 February 2026
Purpose: Explaining  API meta objects, pagination state management . Clarifying how to use API meta.isFirstPage/isLastPage for pagination controls  
Outcome: Understanding how to implement working pagination with disabled states on the first/last pages; understanding the structure of metaobjects

Date: 19 February 2026
Purpose: Brainstorming project structure - separating HTML templates from business logic. Comparing three refactoring approaches: helper methods, defer pattern, maximum separation  
Outcome: Understood trade-offs between different architectural patterns; planned gradual refactoring

Date: 19 February 2026
Purpose: Comparing DOM creation methods  Clarifying differences between template literal HTML vs imperative createElement; discussing performance and maintainability  
Outcome: Chose template strings for readability and speed of development; understood createElement use cases

Date: 19 February 2026
Purpose: Brainstorming CSS code improvements - aligning create post form with login/register styling. Identifying style differences between forms; discussing how to apply shared form classes  
Outcome: Unified form styling across all pages; consistent input appearance and spacing

Date: 20 February 2026
Purpose: Debugging assistance - ReferenceError for undefined variables. Identifying missing imports (getUser, updatePost) in createPostHandler.js  
Outcome: Added correct imports from auth.js and apiClient.js; errors resolved

Date: 20 February 2026
Purpose: Debugging assistance - 404 errors on direct URL access with History API router. Explaining why GitHub Pages (static file server) fails with client-side routing; suggesting 404.html redirect solution and hash routing alternative  
Outcome: Understood static vs application server differences; explored multiple deployment solutions

Date: 20 February 2026
Purpose: Explaining deployment concepts - server rewrites for SPA routing. Clarifying vercel.json configuration with rewrites; explaining how Vercel handles client-side routing  
Outcome: Successfully deployed to Vercel with vercel.json rewrites; History API router working in production

Date: 21 February 2026
Purpose: Explaining complex JavaScript concepts - JWT structure, expiration, security. Clarifying what JWT tokens contain (header, payload, signature); explaining Bearer auth and token storage  
Outcome: Deeper understanding of authentication mechanism; able to debug token-related issues

Date: 21 February 2026
Purpose: Debugging assistance - post images not displaying in feed. Identifying missing _author=true API parameter to include media in response  
Outcome: Added correct API parameters; images now displaying;

Date: 21 February 2026
Purpose: Brainstorming code improvements - suggestion: creating reusable component for post display  
Outcome: I Ccreated shared PostCard component used across Feed, Profile, and Post pages

Date: 21 February 2026
Purpose: Brainstorming CSS code improvements - eliminating duplicate post card styles. Identifying identical CSS classes across home.css, Profile.css, Post.css; suggesting shared component stylesheet  
Outcome: I created postCard.css with shared styles imported across all pages

Date: 22 February 2026
Purpose: Brainstorming project structure - code quality tooling. Explaining ESLint rules for catching errors; Prettier configuration for consistent formatting  
Outcome:  Configured ESLint and Prettier

Date: 22 February 2026
Purpose: Refresh memory about documentation standards JSDoc , help with @param
Outcome: JSDoc применен

Date: 22 February 2026
Purpose: Brainstorming code improvements - identifying repeated patterns  
Outcome: Identified showError, createAvatar, formatDate, validation loops

Date: 22 February 2026
Purpose: Debugging assistance - validation errors not appearing under form inputs  
Outcome: Identifying that showError only removed "register-" prefix, not handling "login-" or "post-" prefixes  

Date: 22 February 2026
Purpose: Brainstorming code quality improvements. Help with identifying magic numbers
Outcome: Created named constants after it

Date: 22 February 2026
Purpose: Brainstorming test cases. Help with the definition of test scenarios
Outcome: Writing unit tests based on the proposed test cases

These are the videos I used to make things a little clearer for the work.
https://www.youtube.com/playlist?list=PL0MUAHwery4qb4bilAQ9Is2NhgUsAmzkR
https://www.youtube.com/playlist?list=PL0MUAHwery4qb4bilAQ9Is2NhgUsAmzkR
https://www.youtube.com/playlist?list=PL0MUAHwery4qb4bilAQ9Is2NhgUsAmzkR
https://www.youtube.com/playlist?list=PL0MUAHwery4qb4bilAQ9Is2NhgUsAmzkR
https://www.youtube.com/playlist?list=PL0MUAHwery4qb4bilAQ9Is2NhgUsAmzkR
https://www.youtube.com/playlist?list=PL0MUAHwery4qb4bilAQ9Is2NhgUsAmzkR
https://www.youtube.com/playlist?list=PL0MUAHwery4qb4bilAQ9Is2NhgUsAmzkR
https://www.youtube.com/playlist?list=PL0MUAHwery4qb4bilAQ9Is2NhgUsAmzkR

