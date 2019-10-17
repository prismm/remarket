# remarket

Welcome to the Remarket repository. Remarket is a two-sided marketplace* app with built-in networks, where students can affiliate with their school network, and buy and sell things to each other. 

To learn more about the features of Remarket, read through our FAQ -- https://www.reuse.market/about -- or play around with the app itself -- https://www.reuse.market/

This application was coded 100% by Priya Murthy. It was launched in September 2017. At its peak, it had 800+ active users, predominantly students at NYU Law School (Priya's alma mater).

This fullstack javascript application relies on the following tech stack: React, React-Redux, Express, Sequelize (PostgreSQL), Node. It accomplishes routing using React Router. It transpiles and bundles using Babel and Webpack. It sends emails to users upon user actions (signup, post, edit, delete, etc.) using Nodemailer.  

Remarket uses Heroku scheduler to do regular database maintenance and to inform users when their posts are about to expire. It keeps track of time using Moment. It accomplishes user image uploads with a custom component (browser/components/ImgUpload.jsx) that uploads the image directly to AWS S3, and then saves the returned AWS links to the database. It uses AWS Lambda to generate thumbnails of images upon upload.

Remarket uses OAuth and Passort to allow users to log in or sign up using their Google or Facebook accounts. It uses Open Graph tags to control content upon Facebook sharing of posts. 

Remarket uses Segment Analytics to collect data and keep track of multiple user flows.

The Remarket UI implements principles of material design using opensource React component libraries including react-md and react-toolbox. The look and feel of the app, as well as its turning logo, are the vision of its creator.  

As a production application with real users, Remarket took the following measures to meet its users' expectations for data security and privacy:
--> it keeps user info 'sanitized,' never handles passwords or emails on the front-end or stores in logs, keeps private info off of req/res headers;
--> it uses express middleware to require that users be logged in, in order to access any other user's email or sensitive info;
--> it uses express middleware to check that all requests for data come from authorized domains;
--> it uses Helmet to set HTTP response headers;
--> it maintains a valid SSL certificate / uses HTTPS.

*What is a two-sided marketplace? https://en.wikipedia.org/wiki/Two-sided_market

*Why was this created? When markets are more efficient at allocating goods, less waste is generated. I found existing secondhand marketplaces to be inefficient -- the larger ones were too clunky, took too much of a cut, or lacked trust, while the ones within networks used outdated technology like email listservs. I wanted to create a solution.

*What could be done better?
Probably a lot of things. This was the first live app I ever built, and I only learned to code a few months before creating it. I did not have the guidance of a more senior developer to oversee the app's development, instead relying on documentation and the wisdom of the internet whenever I was in a jam. Some solutions here are hack-y. Remarket could be more secure, for instance by using tokens to prevent CSRF attacks, or in probably countless other ways I'm not aware of. Things broke occasionally, and occasionally things broke silently. This was a serious passion project for me and my devotion to it taught me a lot about coding that would have been hard to learn if I cared any less. Thanks for reading.
