# MVC Todo App

A full-stack todo app with user accounts. People sign up, log in, and manage their own list of todos. Every todo belongs to the person who created it, so nobody can see or change anyone else's.

**Link to project:** Not deployed yet. See [Run it locally](#run-it-locally) below.

![Demo of the todo app](docs/demo.gif)

## How It's Made:

**Tech used:** Node.js, Express, MongoDB, Mongoose, EJS, Passport, bcrypt, JavaScript, HTML, CSS

I built this to learn how a real server-side app fits together. It follows the MVC pattern, which splits the code by job:

- **Models** describe the data. A `Todo` has an owner, some text and a completed flag. A `User` has an email and a password.
- **Views** are EJS templates that turn data into the HTML the browser shows.
- **Controllers** handle each request: read the form, talk to the database, then render a page or redirect.
- **Routes** match a URL and HTTP method to a controller method.

**How accounts work**

- **Signup:** the controller builds a new `User` and saves it. A Mongoose `pre('save')` hook hashes the password with bcrypt first, so the plain password is never stored. It only hashes when the password is new or changed, so saving an existing user never hashes a hash.
- **Login:** Passport's local strategy finds the user by email and uses `bcrypt.compare` to check the typed password against the stored hash. A wrong email and a wrong password both fail the same way, so the app doesn't reveal which emails have accounts.
- **Sessions:** `express-session` remembers who is logged in. Passport saves only the user's id in the session, then looks the user up again on every request and puts them on `req.user`.
- **Protected pages:** an `ensureAuth` middleware sits in front of the todo routes. Logged-out visitors are redirected to the home page.
- **Private data:** every query that reads, updates or deletes a todo filters on the logged-in user's id. Being logged in isn't enough to touch a todo. It has to be yours.

The delete and complete buttons use `fetch` from `public/js/main.js` to send `DELETE` and `PUT` requests, because a plain HTML form can only send `GET` and `POST`.

**Project structure**

```
config/       Passport setup and the .env file
controllers/  Request handlers (todos and auth)
middleware/   ensureAuth
models/       Todo and User schemas
public/       Client-side JavaScript and CSS
routes/       URL to controller mapping
views/        EJS templates
app.js        Server setup and middleware
```

## Run it locally

1. Install and start MongoDB (on a Mac with Homebrew: `brew services start mongodb-community`)
2. Clone the repo and install the packages:
   ```
   npm install
   ```
3. Create `config/.env` with:
   ```
   PORT=3000
   DB_STRING=mongodb://localhost:27017/mvc-todo
   SESSION_SECRET=replace-this-with-a-long-random-string
   ```
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open `http://localhost:3000`

## Optimizations

What I built in on purpose:

- Passwords are hashed with bcrypt before they reach the database
- Secrets live in `.env`, which is listed in `.gitignore`, never in the code
- Ownership is checked inside the database query, not only at login

What I would improve next:

- Store sessions in MongoDB so users stay logged in after a server restart (they currently live in memory)
- Validate signup input, such as email format and password length
- Show a message when a login fails, instead of reloading the page
- Add CSS to the pages
- Deploy it with a hosted database like MongoDB Atlas

## Lessons Learned:

- **Order matters in Express.** Middleware runs top to bottom. My landing page route didn't redirect logged-in users until I moved it below `passport.session()`, because the session hadn't been read yet.
- **A promise is always truthy.** I forgot `await` on `comparePassword`, which would have let any password log in. Now I check for that whenever a function returns a promise.
- **Callbacks and timing.** My logout crashed because `session.destroy` ran before `req.logout` had finished. Steps that depend on a callback belong inside it.
- **Databases remember.** I removed a field from my schema but still got a duplicate key error, because MongoDB kept the old unique index. I had to drop it by hand in MongoDB Compass.
- **Names that look alike.** A form input name, a schema field and `req.user.id` are three different things. Mixing them up gave me an empty list with no error message.
- **Libraries move on.** Mongoose 9 dropped callbacks, so I rewrote the Passport functions with `async/await` and `try/catch`.