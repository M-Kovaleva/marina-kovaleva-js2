Tool used: ChatGPT
Date: 6 April 2026
Purpose: Brainstorming: Improvements for ui/ux
Outcome: List of recommendations for improvement UI/UX for my project

Date: 7 April 2026
Purpose: Compare Bootstrap and Tailwind for a VITE project
Outcome: Choosing between Tailwind CSS and Bootstrap for a Vite-based SPA project depends on how unique the design needs to be and how quickly you want to build it.

Date: 7 April 2026
Purpose: Explanation of what the project structure looks like on Vite and with Tailwind if it is necessary to split html and js
Outcome: Vite gives us a clean way to separate HTML and JS through ?raw imports

Date: 7 April 2026
Purpose: What extension should be installed in VSCode to remove the @custom-variant highlighting?
Outcome: To remove underlining, install the extension: Tailwind CSS IntelliSense in VS Code

Date: 8 April 2026
Purpose: How to check the entire project for class usage
Outcome: grep -r "className" src/

Date: 8 April 2026
Purpose: Explanation of Change Isolation Strategy (3 pages only)
Outcome: Login Tailwind utilities (bg-amber-100, rounded-2xl) tailwind.css
Register Tailwind utilities tailwind.css
Home Tailwind utilities tailwind.css
Navbar Tailwind utilities tailwind.css
PostCard Tailwind utilities (in JS) tailwind.css
Post Original classes (.post-container, .post-detail) style.css
Profile Original classes (.profile-container) style.css
CreatePost Original classes (.create-post-form) style.css
NotFound Original classes (.container) style.css

Potential Conflicts:
Tailwind reset may affect other pages
Tailwind 4 uses @layer — a minimal reset
.container class in Tailwind vs. the original
The original .container in style.css will take precedence (loaded last)
Body styles
Add Tailwind classes to the <body>, but they don't conflict with CSS variables

Additional protection:
You can add scope via wrapper.
But this isn't necessary — Tailwind utilities don't conflict with BEM-like classes

These are the videos I used to make things a little clearer for the work.
https://tailwindcss.com/docs/
https://www.youtube.com/watch?v=aSlK3GhRuXA
https://www.youtube.com/watch?v=7Os-Bt41yp8
https://www.youtube.com/shorts/JcmHPOrb-FA
https://www.youtube.com/watch?v=86PGRyQjdzQ&t=210s
https://www.youtube.com/watch?v=vYowvsUiChs