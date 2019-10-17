# remarket

Welcome to the Remarket repository. This is a two-sided marketplace app with built-in networks, where students can affiliate with their school network, and buy and sell things to each other. 

This application was coded 100% by Priya Murthy. It was launched in September 2017. At its peak, it had 800 active users, predominantly students at NYU Law School (Priya's alma mater).

This fullstack javascript application relies on the following tech stack: React, React-Redux, Express, Sequelize (PostgreSQL), Node. It accomplishes routing using React Router. It transpiles and bundles using Babel and Webpack. It sends emails to users upon user actions (signup, post, edit, delete, etc.) using Nodemailer.  

Remarket uses Heroku scheduler to do regular database maintenance and to inform users when their posts are about to expire. It keeps track of time using Moment. It accomplishes user image uploads with a custom component (*/browser/components/ImgUpload.jsx) that uploads the image directly to AWS S3, and then saves the returned AWS links to the database. It uses AWS Lambda to generate thumbnails of images upon upload.

The Remarket UI implements principles of material design using opensource component libraries including react-md and react-toolbox. 

As a production application with real users, Remarket took the following measures to meet its users' expectations for data security and privacy:
--> it keeps user info 'sanitized,' never handles passwords or emails on the front-end or stores in logs, keeps private info off of req/res headers;
--> it uses express middleware to require that users be logged in, in order to access any other user's email or sensitive info;
--> it uses express middleware to check that all requests for data come from authorized domains;
--> it uses Helmet to set HTTP response headers;
--> it has a valid SSL certificate / uses HTTPS.

