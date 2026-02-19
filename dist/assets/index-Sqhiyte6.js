(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();class y{constructor(t){this.params=t}setTitle(t){document.title=t}async getHtml(){return""}}class b extends y{constructor(t){super(t),this.setTitle("Feed - Social media application")}async getHtml(){return`
  <section class="feed-container">

    <!-- SEARCH -->
    <form id="search-form" class="feed-search-form">
      <input
        type="search"
        name="search"
        placeholder="Search posts..."
        class="input-field"
      />
      <button type="submit" class="btn-accent">Search</button>
    </form>

    <!-- SEARCH INFO -->
    <div id="search-info" class="search-info" style="display: none;"></div>

    <!-- LOADING -->
    <div id="feed-loading" class="loading-spinner" style="display: none;">
      <div class="spinner"></div>
      <p>Loading posts...</p>
    </div>

     <!-- POSTS -->
    <section id="feed" class="feed-section"></section>

    <!-- PAGINATION -->
    <div class="feed-pagination">
      <button class="btn-secondary" id="prev-page-btn">Previous</button>
      <span id="page-info" class="feed-page-info">Page 1</span>
      <button class="btn-secondary" id="next-page-btn">Next</button>
    </div>
  </section>
`}static renderPostCard(t){const a=t.author?.name||"Unknown",s=t.title||"Untitled",n=t.body||"",o=new Date(t.created).toLocaleDateString(),r=t.media?.url||"";return`
      <article class="feed-post">
      <div class="feed-post-header">
        <span class="feed-post-user">${a}</span>
        <span class="feed-post-date">${o}</span>
      </div>
      ${r?`<img src="${r}" alt="${s}" class="feed-post-image" />`:""}
      <h2 class="feed-post-title">${s}</h2>
      <p class="feed-post-content">${n.slice(0,150)}...</p>
      <a href="/post/${t.id}" data-link class="feed-post-link">Read more ></a>
    </article>
    `}static renderSearchInfo(t){return`
      <span>Showing results for: <strong>"${t}"</strong></span>
      <button id="clear-search-btn" class="btn-clear-search">Clear search</button>
    `}static renderEmptyState(){return"<p>No posts found.</p>"}static renderErrorState(){return"<p>Error loading posts. Please try again.</p>"}}class K extends y{constructor(t){super(t),this.setTitle("Login - Social media application")}async getHtml(){return`
      <div class="auth-container">
        <div class="auth-card">
          <h1>Log in to your account</h1>
          <form id="login-form" class="auth-form" novalidate>     
            <!-- Email -->
            <div class="form-group">
              <label for="login-email">Email</label>
              <input 
                type="email" 
                id="login-email" 
                name="email"
                required
                placeholder="your.name@stud.noroff.no"
                autocomplete="email"
              />
              <span class="form-error" id="email-error"></span>
            </div>
            <!-- Password -->
            <div class="form-group">
              <label for="login-password">Password</label>
              <input 
                type="password" 
                id="login-password" 
                name="password"
                required
                placeholder="••••••••"
                autocomplete="current-password"
              />
              <span class="form-error" id="password-error"></span>
            </div>
            <!-- Submit Button -->
            <button type="submit" class="btn-primary" id="login-submit">
              Log In
            </button>

            <!-- Loading State -->
            <div class="loading-spinner" id="login-loading" style="display: none;">
              <div class="spinner"></div>
              <p>Logging you in...</p>
            </div>

            <!-- Error Message -->
            <div class="error-message" id="login-error" style="display: none;">
              <p id="login-error-text"></p>
            </div>
          </form>

          <!-- Link to Register -->
          <p class="auth-link">
            Don't have an account? 
            <a href="/register" data-link>Create one here</a>
          </p>
          <p class="auth-link"><a href="/" data-link>< Back to Home</a></p>
        </div>
      </div>
    `}}class j extends y{constructor(t){super(t),this.setTitle("Register - Social media application")}async getHtml(){return`
      <div class="auth-container">
        <div class="auth-card">
          <h1>Create account</h1>
          <form id="register-form" class="auth-form" novalidate>
            <!-- Username -->
            <div class="form-group">
              <label for="register-name">Username</label>
              <input 
                type="text" 
                id="register-name" 
                name="name"
                required
                placeholder="your name"
                autocomplete="username"
              />
              <small class="form-help">Only letters, numbers, and underscores</small>
              <span class="form-error" id="name-error"></span>
            </div>
            <!-- Email -->
            <div class="form-group">
              <label for="register-email">Email</label>
              <input 
                type="email" 
                id="register-email" 
                name="email"
                required
                placeholder="your.name@stud.noroff.no"
                autocomplete="email"
              />
              <small class="form-help">Must be a @stud.noroff.no email</small>
              <span class="form-error" id="email-error"></span>
            </div>
            <!-- Password -->
            <div class="form-group">
              <label for="register-password">Password</label>
              <input 
                type="password" 
                id="register-password" 
                name="password"
                required
                placeholder="••••••••"
                autocomplete="new-password"
              />
              <small class="form-help">Minimum 8 characters</small>
              <span class="form-error" id="password-error"></span>
            </div>
            <!-- Submit Button -->
            <button type="submit" class="btn-primary" id="register-submit">
              Create Account
            </button>

            <!-- Loading State -->
            <div class="loading-spinner" id="register-loading" style="display: none;">
              <div class="spinner"></div>
              <p>Creating your account...</p>
            </div>

            <!-- Success Message -->
            <div class="success-message" id="register-success" style="display: none;">
              <p>✅ Account created successfully!</p>
              <p>Redirecting to login...</p>
            </div>

            <!-- Error Message -->
            <div class="error-message" id="register-error" style="display: none;">
              <p id="register-error-text"></p>
            </div>
          </form>
         
          <!-- Link to Login -->
          <p class="auth-link">
            Already have an account? 
            <a href="/login" data-link>Log in here</a>
          </p>
           <p class="auth-link"><a href="/" data-link>← Back to Home</a></p>
        </div>
      </div>
    `}}class G extends y{constructor(t){super(t),this.postId=t.id,this.setTitle("Post - Social media applicaion")}async getHtml(){return`
      <div class="post-container">
        
        <!-- BACK BUTTON -->
        <a href="/" data-link class="post-back-link">< Back to Home</a>

        <!-- LOADING -->
        <div id="post-loading" class="loading-spinner" style="display: none;">
          <div class="spinner"></div>
          <p>Loading post...</p>
        </div>

        <!-- POST CONTENT -->
        <article id="post-content" class="post-detail"></article>

      </div>
    `}}class V extends y{constructor(t){super(t),this.username=t.name,this.setTitle(`${this.username} - Profile`)}async getHtml(){return`
      <div class="container">
        <h1>Profile: @${this.username}</h1>
        <p class="auth-link"><a href="/" data-link>< Back to Home</a></p>
      </div>
    `}}class z extends y{constructor(t){super(t),this.setTitle("Create Post - Social media application")}async getHtml(){return`
      <div class="create-post-container">
        <div class="create-post-card">
          
          <!-- HEADER -->
          <div class="create-post-header">
            <h1>Create New Post</h1>
            <a href="/" data-link class="btn-secondary">Cancel</a>
          </div>

          <!-- FORM -->
          <form id="create-post-form" class="create-post-form" novalidate>
            
            <!-- Title (Required) -->
            <div class="form-group">
              <label for="post-title">Title *</label>
              <input 
                type="text" 
                id="post-title" 
                name="title"
                required
                placeholder="Enter post title"
                maxlength="100"
              />
              <small class="form-help">Required • Max 100 characters</small>
              <span class="form-error" id="title-error"></span>
            </div>

            <!-- Body -->
            <div class="form-group">
              <label for="post-body">Content</label>
              <textarea 
                id="post-body" 
                name="body"
                placeholder="What's on your mind?"
                rows="8"
              ></textarea>
              <small class="form-help">Optional</small>
              <span class="form-error" id="body-error"></span>
            </div>

            <!-- Tags -->
            <div class="form-group">
              <label for="post-tags">Tags</label>
              <input 
                type="text" 
                id="post-tags" 
                name="tags"
                placeholder="javascript, react, tutorial (comma-separated)"
              />
              <small class="form-help">Optional • Separate tags with commas</small>
              <span class="form-error" id="tags-error"></span>
            </div>

            <!-- Media URL -->
            <div class="form-group">
              <label for="post-media">Image URL</label>
              <input 
                type="url" 
                id="post-media" 
                name="media"
                placeholder="https://example.com/image.jpg"
              />
              <small class="form-help">Optional • Enter a valid image URL</small>
              <span class="form-error" id="media-error"></span>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn-primary" id="create-post-submit">
              Create Post
            </button>

            <!-- Loading State -->
            <div class="loading-spinner" id="create-post-loading" style="display: none;">
              <div class="spinner"></div>
              <p>Creating your post...</p>
            </div>

            <!-- Success Message -->
            <div class="success-message" id="create-post-success" style="display: none;">
              <p>✅ Post created successfully!</p>
              <p>Redirecting to feed...</p>
            </div>

            <!-- Error Message -->
            <div class="error-message" id="create-post-error" style="display: none;">
              <p id="create-post-error-text"></p>
            </div>

          </form>

        </div>
      </div>
    `}}class Y extends y{constructor(t){super(t),this.setTitle("404 - Page not found")}async getHtml(){return`
      <div class="container">
        <h1>404 - Page not found</h1>
        <p class="auth-link"><a href="/" data-link>< Return to Home</a></p>
      </div>
    `}}const f={ACCESS_TOKEN:"accessToken",API_KEY:"apiKey",USER_NAME:"userName",USER_EMAIL:"userEmail",USER_AVATAR:"userAvatar",USER_BIO:"userBio"};function R(e){e.accessToken&&localStorage.setItem(f.ACCESS_TOKEN,e.accessToken),e.name&&localStorage.setItem(f.USER_NAME,e.name),e.email&&localStorage.setItem(f.USER_EMAIL,e.email),e.avatar?.url&&localStorage.setItem(f.USER_AVATAR,e.avatar.url),e.bio&&localStorage.setItem(f.USER_BIO,e.bio)}function O(e){localStorage.setItem(f.API_KEY,e)}function M(){return localStorage.getItem(f.ACCESS_TOKEN)}function Q(){return localStorage.getItem(f.API_KEY)}function Z(){return!!M()}const J="https://v2.api.noroff.dev";async function B(e,t={}){const{body:a,...s}=t,n={"Content-Type":"application/json"},o=M(),r=Q();o&&(n.Authorization=`Bearer ${o}`),r&&(n["X-Noroff-API-Key"]=r);const i={method:a?"POST":"GET",...s,headers:{...n,...s.headers}};a&&(i.body=JSON.stringify(a));try{const c=await fetch(J+e,i);if(c.status===204)return{data:null};const m=await c.json();if(!c.ok)throw new Error(m.errors?.[0]?.message||"An API error occurred");return m}catch(c){throw console.error("API Client Error:",c),c}}const C=e=>B(e),k=(e,t)=>B(e,{body:t});async function W(e){return(await k("/auth/register",e)).data}async function $(e){return(await k("/auth/login",e)).data}async function D(e){return(await B("/auth/create-api-key",{method:"POST",body:{name:"Social Media App Key"},headers:{Authorization:`Bearer ${e}`}})).data.key}async function X(e){await W(e);const t=await $({email:e.email,password:e.password});R(t);const a=await D(t.accessToken);return O(a),t}async function ee(e){return(await k("/social/posts",e)).data}function U(e){return e?/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(e)?{valid:!0,message:""}:{valid:!1,message:"Email must be a valid @stud.noroff.no address"}:{valid:!1,message:"Email is required"}}function te(e){return e?/^[a-zA-Z0-9_]+$/.test(e)?{valid:!0,message:""}:{valid:!1,message:"Username can only contain letters, numbers, and underscores"}:{valid:!1,message:"Username is required"}}function _(e){return e?e.length<8?{valid:!1,message:"Password must be at least 8 characters"}:{valid:!0,message:""}:{valid:!1,message:"Password is required"}}function ae(e,t){const a=document.getElementById(e),s=document.getElementById(`${e.replace("register-","")}-error`);a&&a.classList.add("error"),s&&(s.textContent=t,s.classList.add("show"))}function A(){const e=document.querySelectorAll(".form-error"),t=document.querySelectorAll("input.error, textarea.error");e.forEach(a=>{a.textContent="",a.classList.remove("show")}),t.forEach(a=>{a.classList.remove("error")})}function se(){const e=document.getElementById("register-form");e&&e.addEventListener("submit",ne)}async function ne(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t),s=a.email?.trim()||"",n=a.password||"",o=a.name?.trim()||"",r=document.getElementById("register-submit"),i=document.getElementById("register-loading"),c=document.getElementById("register-success"),m=document.getElementById("register-error"),g=document.getElementById("register-error-text");A(),m.style.display="none";const v=[{field:"register-name",validator:()=>te(o)},{field:"register-email",validator:()=>U(s)},{field:"register-password",validator:()=>_(n)}];let l=!0;for(const{field:p,validator:L}of v){const d=L();d.valid||(ae(p,d.message),l=!1)}if(!l)return;const u={name:o,email:s,password:n};r.disabled=!0,r.style.display="none",i.style.display="block";try{await X(u),i.style.display="none",c.style.display="block",setTimeout(()=>S("/login"),3e3)}catch(p){i.style.display="none",r.style.display="block",r.disabled=!1,g.textContent=p.message||"Registration failed. Please try again.",m.style.display="block"}}function oe(e,t){const a=document.getElementById(e),s=document.getElementById(`${e.replace("login-","")}-error`);a&&a.classList.add("error"),s&&(s.textContent=t,s.classList.add("show"))}function re(){const e=document.getElementById("login-form");e&&e.addEventListener("submit",ie)}async function ie(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t),s=a.email?.trim()||"",n=a.password||"",o=document.getElementById("login-submit"),r=document.getElementById("login-loading"),i=document.getElementById("login-error"),c=document.getElementById("login-error-text");A(),i.style.display="none";const m=[{field:"login-email",validator:()=>U(s)},{field:"login-password",validator:()=>_(n)}];let g=!0;for(const{field:l,validator:u}of m){const p=u();p.valid||(oe(l,p.message),g=!1)}if(!g)return;const v={email:s,password:n};o.disabled=!0,o.style.display="none",r.style.display="block";try{console.log("Step 1: Logging in...");const l=await $(v);console.log("Logged in! Token:",l.accessToken?"Yes":"No"),console.log("Step 2: Saving auth data..."),R(l),console.log("Auth data saved!"),console.log("Step 3: Creating API key...");const u=await D(l.accessToken);console.log("API key created:",u),console.log("Step 4: Saving API key..."),O(u),console.log("API key saved!"),console.log("Login complete!"),S("/")}catch(l){r.style.display="none",o.style.display="block",o.disabled=!1,console.error("Login error:",l),c.textContent=l.message||"Login failed. Please try again.",i.style.display="block"}}async function ce(e,t=1){const a=new URLSearchParams({q:e,_author:"true",_comments:"true",_reactions:"true",limit:"12",page:t.toString()}),s=await C(`/social/posts/search?${a}`);return{posts:s.data,meta:s.meta}}function le(){const e=document.getElementById("search-info"),t=ue();t?(e.innerHTML=b.renderSearchInfo(t),e.style.display="flex",document.getElementById("clear-search-btn")?.addEventListener("click",de)):e.style.display="none"}function de(){H("");const e=document.querySelector('#search-form input[name="search"]');e&&(e.value=""),w(),window.scrollTo(0,0)}function me(){const e=document.getElementById("search-form");e?.addEventListener("submit",async t=>{t.preventDefault();const s=new FormData(e).get("search")?.trim()||"";s&&(H(s),await w(),window.scrollTo(0,0))})}let h=1,I="",E=!1;function H(e){I=e,h=1}function ue(){return I}async function pe(e=1){const t=new URLSearchParams({_author:"true",_comments:"true",_reactions:"true",limit:"12",page:e.toString()}),a=await C(`/social/posts?${t}`);return{posts:a.data,meta:a.meta}}function fe(e){const t=document.getElementById("feed");if(!e||e.length===0){t.innerHTML=b.renderEmptyState();return}t.innerHTML=e.map(a=>b.renderPostCard(a)).join("")}function ge(e){const t=document.getElementById("prev-page-btn"),a=document.getElementById("next-page-btn"),s=document.getElementById("page-info");s&&(s.textContent=`Page ${e.currentPage} of ${e.pageCount}`),t&&(t.disabled=e.isFirstPage),a&&(a.disabled=e.isLastPage)}function ye(){const e=document.getElementById("prev-page-btn"),t=document.getElementById("next-page-btn");e?.addEventListener("click",async()=>{!E&&!e.disabled&&(h--,await w(),window.scrollTo(0,0))}),t?.addEventListener("click",async()=>{!E&&!t.disabled&&(h++,await w(),window.scrollTo(0,0))})}function T(e){const t=document.getElementById("feed-loading"),a=document.getElementById("feed");e?(t.style.display="block",a.style.display="none"):(t.style.display="none",a.style.display="block")}async function w(){if(!E){E=!0,T(!0);try{const{posts:e,meta:t}=I?await ce(I,h):await pe(h);fe(e),ge(t),le()}catch(e){console.error("Failed to load posts:",e),document.getElementById("feed").innerHTML=b.renderErrorState()}finally{T(!1),E=!1}}}async function he(){h=1,ye(),await w()}async function ve(e){const t=new URLSearchParams({_author:"true",_comments:"true",_reactions:"true"});return(await C(`/social/posts/${e}?${t}`)).data}function Ee(e){return new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function be(e){return new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}function F(e){return e?.[0]?.toUpperCase()||"?"}function we(e){const t=document.createElement("div");t.className="post-header";const a=document.createElement("div");a.className="post-author";const s=Se(e.author?.avatar?.url,e.author?.name||"Unknown");a.append(s);const n=document.createElement("div");n.className="post-author-info";const o=document.createElement("a");o.href=`/profile/${e.author?.name}`,o.className="post-author-name",o.setAttribute("data-link",""),o.textContent=e.author?.name||"Unknown";const r=document.createElement("span");return r.className="post-date",r.textContent=Ee(e.created),n.append(o,r),a.append(n),t.append(a),t}function Se(e,t){if(e){const s=document.createElement("img");return s.src=e,s.alt=t,s.className="post-author-avatar",s}const a=document.createElement("div");return a.className="post-author-avatar-placeholder",a.textContent=F(t),a}function Ie(e,t){if(!e)return null;const a=document.createElement("img");return a.src=e,a.alt=t,a.className="post-image",a}function Le(e){const t=document.createElement("div");t.className="post-body";const a=document.createElement("h1");a.className="post-title",a.textContent=e.title||"Untitled";const s=document.createElement("p");return s.className="post-text",s.textContent=e.body||"",t.append(a,s),t}function Pe(e){if(!e||e.length===0)return null;const t=document.createElement("div");return t.className="post-tags",e.forEach(a=>{const s=document.createElement("span");s.className="post-tag",s.textContent=`#${a}`,t.append(s)}),t}function Be(e){const t=document.createElement("div");t.className="post-stats";const a=document.createElement("span");a.className="post-stat",a.textContent=`♡ ${e._count?.reactions||0} reactions`;const s=document.createElement("span");return s.className="post-stat",s.textContent=`💬 ${e._count?.comments||0} comments`,t.append(a,s),t}function Ce(e){const t=document.createElement("div");t.className="post-comments";const a=document.createElement("h2");a.textContent="Comments",t.append(a);const s=document.createElement("div");if(s.id="comments-list",!e||e.length===0){const n=document.createElement("p");n.className="comments-empty",n.textContent="No comments yet. Be the first to comment!",s.append(n)}else e.forEach(n=>{const o=ke(n);s.append(o)});return t.append(s),t}function ke(e){const t=document.createElement("div");t.className="comment";const a=document.createElement("div");a.className="comment-header";const s=Ae(e.author?.avatar?.url,e.author?.name||"Anonymous");a.append(s);const n=document.createElement("div");n.className="comment-info";const o=document.createElement("a");o.href=`/profile/${e.author?.name}`,o.className="comment-author",o.setAttribute("data-link",""),o.textContent=e.author?.name||"Anonymous";const r=document.createElement("span");r.className="comment-date",r.textContent=be(e.created),n.append(o,r),a.append(n);const i=document.createElement("p");return i.className="comment-body",i.textContent=e.body||"",t.append(a,i),t}function Ae(e,t){if(e){const s=document.createElement("img");return s.src=e,s.alt=t,s.className="comment-avatar",s}const a=document.createElement("div");return a.className="comment-avatar-placeholder",a.textContent=F(t),a}function xe(){const e=document.createElement("div");e.className="post-error";const t=document.createElement("p");t.textContent="Could not load post. It may have been deleted or you don't have permission to view it.";const a=document.createElement("a");return a.href="/",a.className="btn-secondary",a.setAttribute("data-link",""),a.textContent="Back to Feed",e.append(t,a),e}function N(e){const t=document.getElementById("post-loading"),a=document.getElementById("post-content");!t||!a||(e?(t.style.display="block",a.style.display="none"):(t.style.display="none",a.style.display="block"))}function Te(e){const t=document.getElementById("post-content");if(!t)return;t.innerHTML="";const a=we(e);t.append(a);const s=Ie(e.media?.url,e.title);s&&t.append(s);const n=Le(e);t.append(n);const o=Pe(e.tags);o&&t.append(o);const r=Be(e);t.append(r);const i=Ce(e.comments);t.append(i)}function Ne(){const e=document.getElementById("post-content");if(!e)return;e.innerHTML="";const t=xe();e.append(t)}async function Re(e){N(!0);try{const t=await ve(e);Te(t)}catch(t){console.error("Failed to load post:",t),Ne()}finally{N(!1)}}async function Oe(e){await Re(e)}function Me(e){return!e||e.trim()===""?{valid:!1,message:"Title is required"}:e.length>100?{valid:!1,message:"Title must be 100 characters or less"}:{valid:!0,message:""}}function $e(e){if(!e||e.trim()==="")return{valid:!0,message:""};try{return new URL(e),{valid:!0,message:""}}catch{return{valid:!1,message:"Please enter a valid URL"}}}function De(e,t){const a=document.getElementById(e),s=document.getElementById(`${e.replace("post-","")}-error`);a&&a.classList.add("error"),s&&(s.textContent=t,s.classList.add("show"))}async function Ue(e){e.preventDefault();const t=new FormData(e.target),a=Object.fromEntries(t),s=a.title?.trim()||"",n=a.body?.trim()||"",o=a.tags?.trim()||"",r=a.media?.trim()||"",i=document.getElementById("create-post-submit"),c=document.getElementById("create-post-loading"),m=document.getElementById("create-post-success"),g=document.getElementById("create-post-error"),v=document.getElementById("create-post-error-text");A(),g.style.display="none";const l=[{field:"post-title",validator:()=>Me(s)},{field:"post-media",validator:()=>$e(r)}];let u=!0;for(const{field:d,validator:q}of l){const x=q();x.valid||(De(d,x.message),u=!1)}if(!u)return;const p=o?o.split(",").map(d=>d.trim()).filter(d=>d):[],L={title:s,body:n||void 0,tags:p.length>0?p:void 0,media:r?{url:r}:void 0};i.disabled=!0,i.style.display="none",c.style.display="block";try{await ee(L),c.style.display="none",m.style.display="block",setTimeout(()=>S("/"),2e3)}catch(d){c.style.display="none",i.style.display="block",i.disabled=!1,console.error("Create post error:",d),v.textContent=d.message||"Failed to create post. Please try again.",g.style.display="block"}}function _e(){const e=document.getElementById("create-post-form");e&&e.addEventListener("submit",Ue)}const He=["/","/post/:id","/profile/:name","/create"],Fe=e=>new RegExp("^"+e.replace(/\//g,"\\/").replace(/:\w+/g,"(.+)")+"$"),qe=e=>{const t=e.result.slice(1),a=Array.from(e.route.path.matchAll(/:(\w+)/g)).map(s=>s[1]);return Object.fromEntries(a.map((s,n)=>[s,t[n]]))},S=e=>{history.pushState(null,null,e),P()},P=async()=>{let a=[{path:"/",view:b},{path:"/login",view:K},{path:"/register",view:j},{path:"/post/:id",view:G},{path:"/profile/:name",view:V},{path:"/create",view:z}].map(r=>({route:r,result:location.pathname.match(Fe(r.path))})).find(r=>r.result!==null);if(a||(a={route:{path:location.pathname,view:Y},result:[location.pathname]}),He.includes(a.route.path)&&!Z()){S("/login");return}const s=qe(a),n=new a.route.view(s),o=document.querySelector("#app");o.innerHTML=await n.getHtml(),a.route.path==="/"&&(he(),me()),a.route.path==="/post/:id"&&Oe(s.id),a.route.path==="/create"&&_e(),a.route.path==="/register"&&se(),a.route.path==="/login"&&re()};document.addEventListener("DOMContentLoaded",()=>{console.log("App initialized!"),document.body.addEventListener("click",e=>{e.target.matches("[data-link]")&&(e.preventDefault(),S(e.target.href))}),window.addEventListener("popstate",P),P()});
