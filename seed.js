const Promise = require('bluebird');
const models = require('./server/db');
const db = models.db;
const Listing = models.Listing;
const User = models.User;
const Comment = models.Comment;
const Offer = models.Offer;
const Network = models.Network;
const Token = models.Token;
const Photo = models.Photo;
const Message = models.Message;
const NetworkAffiliation = models.network_affiliations;
const ListingNetworks = models.listing_networks;

const users = [
    { confirmed: true, name: 'Geoff', email: 'Geoff@gmail.com', password: 'hello', isAdmin: false },
    { confirmed: true, name: 'Joon', email: 'Joon@gmail.com', password: 'password', isAdmin: false },
    { confirmed: true, name: 'Kate Bush', email: 'Kate.Bush@gmail.com', password: 'testpw', isAdmin: false },
    { confirmed: true, name: 'Mike', email: 'mike@gmail.com', password: 'hello', isAdmin: false },
    { confirmed: true, name: 'Matt', email: 'matt@gmail.com', password: 'password', isAdmin: false },
    { confirmed: true, name: 'Eli', email: 'eli@gmail.com', password: 'testpw', isAdmin: false },
    { confirmed: true, name: 'Jason', email: 'jason@gmail.com', password: 'hello', isAdmin: false },
    { confirmed: true, name: 'Priya', email: 'priya@gmail.com', password: 'testpw', isAdmin: false },
    { confirmed: true, name: 'Grant', email: 'grant@fullstack.com', password: 'deadoralive', isAdmin: true },
    { confirmed: true, name: 'Candice', email: 'candice@fullstack.com', password: 'deadoralive', isAdmin: true }
]

const listings = [
    { location: 'Philadelphia', authorId: 1, networkId: 1, name: 'IKEA Dresser', category: 'for sale', description: 'Where the black bear is searching for roots or honey, where the beaver pats the mud with his paddle-shaped tail; Over the growing sugar, over the yellow-flower\'d cotton plant, over the rice in its low moist field, Over the sharp-peak\'d farm house, with its scallop\'d scum and slender shoots from the gutters, Over the western persimmon, over the long-leav\'d corn, over the delicate blue-flower flax,', imageUrl: 'https://hulshofschmidt.files.wordpress.com/2011/12/jk-rowling-harry-potter.jpg', inventoryId: 1, categoryId: 2 },
    { location: 'Philadelphia', authorId: 2, networkId: 1, name: 'Queen-size mattress', category: 'for sale', description: 'Where the she-whale swims with her calf and never forsakes it, Where the steam-ship trails hind-ways its long pennant of smoke, Where the fin of the shark cuts like a black chip out of the water,Where the half-burn\'d brig is riding on unknown currents,', imageUrl: 'http://thehill.com/sites/default/files/obama%20waving.jpg', inventoryId: 2, categoryId: 2 },
    { location: 'New York', authorId: 3, networkId: 1, name: 'West Elm Velvet Couch', category: 'for sale', description: 'Failing to fetch me at first keep encouraged, Missing me one place search another, I stop somewhere waiting for you.', imageUrl: 'https://pbs.twimg.com/profile_images/616002132/dz.jpg', inventoryId: 3, categoryId: 1 },
    { location: 'New York', authorId: 4, networkId: 1, name: 'TV Stand', category: 'for sale', description: 'I celebrate myself, and sing myself, And what I assume you shall assume, For every atom belonging to me as good belongs to you.', imageUrl: 'http://www.americaslibrary.gov/assets/aa/king/aa_king_subj_e.jpg', inventoryId: 4, categoryId: 1 },
    { location: 'New York', authorId: 5, networkId: 1, name: 'TRIBE fixed bike', category: 'for sale', description: 'Reader, I married him.  A quiet wedding we had:  he and I, the parson and clerk, were alone present.  When we got back from church, I went into the kitchen of the manor-house, where Mary was cooking the dinner and John cleaning the knives, and I said -', imageUrl: 'http://sm.askmen.com/t/askmen_me/gallery/f/frank-underwood-quotes/frank-underwood-quotes_j7z8.640.jpg', inventoryId: 5, categoryId: 2 },
    { location: 'New York', authorId: 6, networkId: 1, name: 'two folding chairs', category: 'for sale', description: 'She was explaining to me that I had won nothing, that in the world there is nothing to win, that her life was full of varied and foolish adventures as much as mine, and that time simply slipped away without any meaning, and it was good just to see each other every so often to hear the mad sound of the brain of one echo in the mad sound of the brain of the other.', imageUrl: 'http://www.trbimg.com/img-5898dbc4/turbine/la-et-sean-spicer-20170206', inventoryId: 6, categoryId: 1 },
    { location: 'Boston/Cambridge', authorId: 7, networkId: 1, name: 'Bed with rolling frame', category: 'for sale', description: 'At that moment I knew what the plebs were, much more clearly than when, years earlier, she had asked me. The plebs were us. The plebs were that fight for food and wine, that quarrel over who should be served first and better, that dirty floor on which the waiters clattered back and forth, those increasingly vulgar toasts. The plebs were my mother, who had drunk wine and now was leaning against my father’s shoulder, while he, serious, laughed, his mouth gaping, at the sexual allusions of the metal dealer. They were all laughing, even Lila, with the expression of one who has a role and will play it to the utmost.', imageUrl: 'https://cloud.fullstackacademy.com/geoff.jpg?mtime=20170205092855', inventoryId: 7, categoryId: 2 },
    { location: 'New York', authorId: 8, networkId: 1, name: 'Framed MOMA print', category: 'for sale', description: 'Things that are too large, such as cloud formations, river deltas, constellations, we reduce. At length we bring it within the scope of our senses and we stabilize it with fixer. When it has been fixed we call it knowledge. Throughout our childhood and teenage years, we strive to attain the correct distance to objects and phenomena. We read, we learn, we experience, we make adjustments. Then one day we reach the point where all the necessary distances have been set, all the necessary systems have been put in place. That is when time begins to pick up speed.', imageUrl: 'https://ca.slack-edge.com/T024FPYBQ-U5080RTHT-19ddf8ffeabc-1024', inventoryId: 8, categoryId: 2 },
    { location: 'New York', authorId: 9, networkId: 1, name: 'New iPhone 6 plus Wallet case', category: 'for sale', description: 'Where the she-whale swims with her calf and never forsakes it, Where the steam-ship trails hind-ways its long pennant of smoke, Where the fin of the shark cuts like a black chip out of the water,Where the half-burn\'d brig is riding on unknown currents,', imageUrl: 'http://thehill.com/sites/default/files/obama%20waving.jpg', inventoryId: 2, categoryId: 2 },
    { location: 'New York', authorId: 10, networkId: 1, name: 'Target threshold stroage settee bench', category: 'for sale', description: 'Failing to fetch me at first keep encouraged, Missing me one place search another, I stop somewhere waiting for you.', imageUrl: 'https://pbs.twimg.com/profile_images/616002132/dz.jpg', inventoryId: 3, categoryId: 1 },
    { location: 'New York', authorId: 10, networkId: 1, name: 'White linen sofa', category: 'for sale', description: 'I celebrate myself, and sing myself, And what I assume you shall assume, For every atom belonging to me as good belongs to you.', imageUrl: 'http://www.americaslibrary.gov/assets/aa/king/aa_king_subj_e.jpg', inventoryId: 4, categoryId: 1 },
    { location: 'New York', authorId: 9, networkId: 2, name: 'Bookstand/Bookshelf', category: 'for sale', description: 'Reader, I married him.  A quiet wedding we had:  he and I, the parson and clerk, were alone present.  When we got back from church, I went into the kitchen of the manor-house, where Mary was cooking the dinner and John cleaning the knives, and I said -', imageUrl: 'http://sm.askmen.com/t/askmen_me/gallery/f/frank-underwood-quotes/frank-underwood-quotes_j7z8.640.jpg', inventoryId: 5, categoryId: 2 },
    { location: 'Philadelphia', authorId: 8, networkId: 2, name: 'CB2 peekabo acrylic console', category: 'for sale', description: 'She was explaining to me that I had won nothing, that in the world there is nothing to win, that her life was full of varied and foolish adventures as much as mine, and that time simply slipped away without any meaning, and it was good just to see each other every so often to hear the mad sound of the brain of one echo in the mad sound of the brain of the other.', imageUrl: 'http://www.trbimg.com/img-5898dbc4/turbine/la-et-sean-spicer-20170206', inventoryId: 6, categoryId: 1 },
    { location: 'Philadelphia', authorId: 7, networkId: 2, name: 'stainless steel wall shelves', category: 'for sale', description: 'At that moment I knew what the plebs were, much more clearly than when, years earlier, she had asked me. The plebs were us. The plebs were that fight for food and wine, that quarrel over who should be served first and better, that dirty floor on which the waiters clattered back and forth, those increasingly vulgar toasts. The plebs were my mother, who had drunk wine and now was leaning against my father’s shoulder, while he, serious, laughed, his mouth gaping, at the sexual allusions of the metal dealer. They were all laughing, even Lila, with the expression of one who has a role and will play it to the utmost.', imageUrl: 'https://cloud.fullstackacademy.com/geoff.jpg?mtime=20170205092855', inventoryId: 7, categoryId: 2 },
    { location: 'Boston/Cambridge', authorId: 6, networkId: 2, name: 'Midcentury Modern Table for Sale', category: 'for sale', description: 'Things that are too large, such as cloud formations, river deltas, constellations, we reduce. At length we bring it within the scope of our senses and we stabilize it with fixer. When it has been fixed we call it knowledge. Throughout our childhood and teenage years, we strive to attain the correct distance to objects and phenomena. We read, we learn, we experience, we make adjustments. Then one day we reach the point where all the necessary distances have been set, all the necessary systems have been put in place. That is when time begins to pick up speed.', imageUrl: 'https://ca.slack-edge.com/T024FPYBQ-U5080RTHT-19ddf8ffeabc-1024', inventoryId: 8, categoryId: 2 },
    { location: 'Boston/Cambridge', authorId: 5, networkId: 2, name: 'Canon PIXMA printer', category: 'for sale', description: 'Most of the luxuries, and many of the so-called comforts of life, are not only not indispensable, but positive hindrances to the elevation of mankind. With respect to luxuries and comforts, the wisest have ever lived a more simple and meagre life than the poor. The ancient philosophers, Chinese, Hindoo, Persian, and Greek, were a class than which none has been poorer in outward riches, none so rich in inward. ', imageUrl: 'http://thecatholiccatalogue.com/wp-content/uploads/2015/09/maxresdefault-1.jpg', inventoryId: 9, categoryId: 1 },
    { location: 'Boston/Cambridge', authorId: 4, networkId: 2, name: 'Large mirror', category: 'for sale', description: ' I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/William_Shakespeare_1609.jpg', inventoryId: 10, categoryId: 1 },
    { location: 'Philadelphia', authorId: 3, networkId: 2, name: '6 month sublet -- sunny room in Greenpoint', category: 'housing', description: 'Things that are too large, such as cloud formations, river deltas, constellations, we reduce. At length we bring it within the scope of our senses and we stabilize it with fixer. When it has been fixed we call it knowledge. Throughout our childhood and teenage years, we strive to attain the correct distance to objects and phenomena. We read, we learn, we experience, we make adjustments. Then one day we reach the point where all the necessary distances have been set, all the necessary systems have been put in place. That is when time begins to pick up speed.', imageUrl: 'https://ca.slack-edge.com/T024FPYBQ-U5080RTHT-19ddf8ffeabc-1024', inventoryId: 8, categoryId: 2 },
    { location: 'Philadelphia', authorId: 2, networkId: 2, name: '1bed/1bath E65th btwn 5th&Madison', category: 'housing', description: 'Where the she-whale swims with her calf and never forsakes it, Where the steam-ship trails hind-ways its long pennant of smoke, Where the fin of the shark cuts like a black chip out of the water,Where the half-burn\'d brig is riding on unknown currents,', imageUrl: 'http://thehill.com/sites/default/files/obama%20waving.jpg', inventoryId: 2, categoryId: 2 },
    { location: 'Philadelphia', authorId: 1, networkId: 1, name: 'I am looking for a room - Brooklyn / Manhattan', category: 'housing', description: 'Failing to fetch me at first keep encouraged, Missing me one place search another, I stop somewhere waiting for you.', imageUrl: 'https://pbs.twimg.com/profile_images/616002132/dz.jpg', inventoryId: 3, categoryId: 1 },
    { location: 'Philadelphia', authorId: 1, networkId: 1, name: 'Greenpoint 1 BR Available February 1', category: 'housing', description: 'I celebrate myself, and sing myself, And what I assume you shall assume, For every atom belonging to me as good belongs to you.', imageUrl: 'http://www.americaslibrary.gov/assets/aa/king/aa_king_subj_e.jpg', inventoryId: 4, categoryId: 1 },
    { location: 'Boston/Cambridge', authorId: 2, networkId: 1, name: 'BR/1BA Apartment for Rent in Astoria/LIC - $2,000/month', category: 'housing', description: 'Reader, I married him.  A quiet wedding we had:  he and I, the parson and clerk, were alone present.  When we got back from church, I went into the kitchen of the manor-house, where Mary was cooking the dinner and John cleaning the knives, and I said -', imageUrl: 'http://sm.askmen.com/t/askmen_me/gallery/f/frank-underwood-quotes/frank-underwood-quotes_j7z8.640.jpg', inventoryId: 5, categoryId: 2 },
    { location: 'Boston/Cambridge', authorId: 3, networkId: 1, name: 'Community post', category: 'community', description: 'She was explaining to me that I had won nothing, that in the world there is nothing to win, that her life was full of varied and foolish adventures as much as mine, and that time simply slipped away without any meaning, and it was good just to see each other every so often to hear the mad sound of the brain of one echo in the mad sound of the brain of the other.', imageUrl: 'http://www.trbimg.com/img-5898dbc4/turbine/la-et-sean-spicer-20170206', inventoryId: 6, categoryId: 1 },
    { location: 'Boston/Cambridge', authorId: 4, networkId: 1, name: 'Community post', category: 'community', description: 'At that moment I knew what the plebs were, much more clearly than when, years earlier, she had asked me. The plebs were us. The plebs were that fight for food and wine, that quarrel over who should be served first and better, that dirty floor on which the waiters clattered back and forth, those increasingly vulgar toasts. The plebs were my mother, who had drunk wine and now was leaning against my father’s shoulder, while he, serious, laughed, his mouth gaping, at the sexual allusions of the metal dealer. They were all laughing, even Lila, with the expression of one who has a role and will play it to the utmost.', imageUrl: 'https://cloud.fullstackacademy.com/geoff.jpg?mtime=20170205092855', inventoryId: 7, categoryId: 2 },
    { location: 'Boston/Cambridge', authorId: 5, networkId: 1, name: 'Community post', category: 'community', description: 'Things that are too large, such as cloud formations, river deltas, constellations, we reduce. At length we bring it within the scope of our senses and we stabilize it with fixer. When it has been fixed we call it knowledge. Throughout our childhood and teenage years, we strive to attain the correct distance to objects and phenomena. We read, we learn, we experience, we make adjustments. Then one day we reach the point where all the necessary distances have been set, all the necessary systems have been put in place. That is when time begins to pick up speed.', imageUrl: 'https://ca.slack-edge.com/T024FPYBQ-U5080RTHT-19ddf8ffeabc-1024', inventoryId: 8, categoryId: 2 },
    { location: 'Boston/Cambridge', authorId: 6, networkId: 1, name: 'Community post', category: 'community', description: 'Most of the luxuries, and many of the so-called comforts of life, are not only not indispensable, but positive hindrances to the elevation of mankind. With respect to luxuries and comforts, the wisest have ever lived a more simple and meagre life than the poor. The ancient philosophers, Chinese, Hindoo, Persian, and Greek, were a class than which none has been poorer in outward riches, none so rich in inward. ', imageUrl: 'http://thecatholiccatalogue.com/wp-content/uploads/2015/09/maxresdefault-1.jpg', inventoryId: 9, categoryId: 1 },
]

const networks = [
    { id: 2, name: 'NYU', location: 'New York' },
    { id: 1, name: 'Columbia', location: 'New York' }
    // { name: 'UPenn', location: 'Philadelphia' },
    // { name: 'Harvard', location: 'Boston/Cambridge' },
    // { name: 'MIT', location: 'Boston/Cambridge' },
    // { name: 'Yale', location: 'New Haven' },
    // { name: 'Princeton', location: 'Princeton' }
]

const networkAffiliations = [
    { confirmed: true, userId: 1, networkId: 1 },
    { confirmed: true, userId: 2, networkId: 1 },
    { confirmed: true, userId: 3, networkId: 1 },
    { confirmed: true, userId: 4, networkId: 1 },
    { confirmed: true, userId: 1, networkId: 2 },
    { confirmed: true, userId: 2, networkId: 2 },
    { confirmed: true, userId: 4, networkId: 2 },
    { confirmed: true, userId: 8, networkId: 2 }
]

const offers = [];

const comments = [];

const tokens = [];

const photos = [];

const messages = [];

const listingNetworks = [
    // { listingId: 2, networkId: 1 },
    // { listingId: 4, networkId: 1 },
    // { listingId: 8, networkId: 1 },
    // { listingId: 1, networkId: 2 },
    // { listingId: 3, networkId: 2 },
    // { listingId: 4, networkId: 2 },
    // { listingId: 8, networkId: 2 }
];

function createUsers() {
    return Promise.map(users, function(user) {
        return User.create(user);
    })
}

function createOffers() {
    return Promise.map(offers, function(offer) {
        return Offer.create(offer);
    })
}

function createNetworks() {
    return Promise.map(networks, function(network) {
        return Network.create(network);
    })
}

function createAffiliations() {
    return Promise.map(networkAffiliations, function(affiliation) {
        return NetworkAffiliation.create(affiliation);
    })
}

function createListings() {
    return Promise.map(listings, function(listing) {
        return Listing.create(listing);
    })
}

function createListingNetworks() {
    return Promise.map(listingNetworks, function(connection) {
        return ListingNetworks.create(connection);
    })
}

function createComments() {
    return Promise.map(comments, function(comment) {
        return Comment.create(comment);
    })
}

function createTokens() {
    return Promise.map(tokens, function(token) {
        return Token.create(token);
    })
}

function createPhotos() {
    return Promise.map(photos, function(photo) {
        return Photo.create(photo);
    })
}

function createMessages() {
    return Promise.map(messages, function(message) {
        return Message.create(message);
    })
}

function seed() {
    console.log('...creating networks...');
    return createNetworks()
        .then(function() {
            console.log('...creating users...');
            return createUsers();
        })
        .then(function() {
            console.log('...creating affiliations...');
            return createAffiliations();
        })
        .then(function() {
            console.log('...creating listings...');
            return createListings();
        })
        .then(function() {
            console.log('...creating offers...');
            return createOffers()
        })
        .then(function() {
            console.log('...creating comments...');
            return createComments()
        })
        .then(function() {
            console.log('...creating photos...');
            return createPhotos()
        })
        .then(function() {
            console.log('...creating tokens...');
            return createTokens()
        })
        .then(function() {
            console.log('...creating listing-network connections...');
            return createListingNetworks()
        })
        .then(function() {
            console.log('...creating messages...');
            return createMessages()
        })
        .catch(console.error)
}

console.log('Syncing database');

db.sync({ force: true })
    .then(function() {
        console.log('Dropped old data, now seeding');
        return seed();
    })
    .then(function() {
        console.log('Seeding successful');
    }, function(err) {
        console.error('Error while seeding');
        console.error(err.stack);
    })
    .finally(function() {
        db.close();
        return null;
    });