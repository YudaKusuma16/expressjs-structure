require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const programmingLanguagesRouter = require('./src/routes/programmingLanguages.route');
const userRouter = require('./src/routes/user.route');
const adminRouter = require('./src/routes/admin.route');

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/programming-languages', programmingLanguagesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);

  // Check if request expects JSON (API routes) or HTML (page routes)
  if (req.path.startsWith('/programming-languages') || req.headers.accept?.includes('application/json')) {
    res.status(statusCode).json({ 'message': err.message });
  } else {
    res.status(statusCode).render('error', {
      error: err.message,
      status: statusCode
    });
  }

  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
