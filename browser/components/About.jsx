/* eslint-disable camelcase */
import React from 'react';

/*----------------------- About Component ---------------------------*/
export default function About () {
    const style = {
        fontFamily: 'avenir',
        fontWeight: '500',
        color: '#FC0096'
    }

    return (
        <div className="md-grid">
            <div className="md-cell md-cell--8 about-body">
                <h2 style={style} classNames="category-header about-header">about remarket</h2>
                <div className="about-content">
                    <div style={{'font-family': 'avenir'}} >Hello & welcome to reuse.market, a.k.a. remarket!</div>
                    <div style={{'font-family': 'avenir'}} >
                    <span className="about-question">What is remarket? </span>
                        This website is a marketplace and classifieds site for NYU & Columbia.
                        The goal of remarket is to improve the efficiency and trust-level of secondhand transactions -- in other words, to make it
                        safer & easier to find, buy, sell, and give away stuff, so that less stuff in our communities gets thrown away and more gets reused.
                    </div>
                    <div className="center">
                        <img alt="furniture on the curb" style={{'max-width': '450px'}} className='about-img' src="/imgs/furnitureoncurb.jpg" />
                        <div className='about-caption'>
                            This furniture is headed to a landfill. Currently, 4% of landfill waste (9 million tons per year) is furniture waste; when people throw away usable furniture, it increases demand for new furniture which leads to greater material consumption and deforestation.
                        </div>
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        In addition to items free & for sale, you can publish housing posts, jobs/opportunities, and events.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">Who can use remarket? </span>
                        Anyone can use remarket -- you do not have to be an NYU or Columbia student to sign up or to post. However, without a verified NYU or Columbia email address, you cannot affiliate with either network.
                        All posts are flagged with their author's affiliations, and you can find a user's affiliations by clicking on their name and viewing their profile.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How does it work? </span>
                        After signing up, remarket users may affiliate with NYU or Columbia or both; we verify these affiliations
                        through the user's network email address domain (nyu.edu or columbia.edu). To view posts belonging to either network,
                        toggle the 'NYU' and 'Columbia' buttons in the header. <span className="nyu-selected">NYU posts are purple</span> and <span className="columbia-selected">Columbia posts are blue</span>.
                        All posts are flagged with their author's affiliations, and you can find a user's affiliations by clicking on their name and viewing their profile.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">Does it cost anything to use remarket? </span>
                        No. Remarket is free to use and we do not sell your information (we are not making any money off of you). We intend to be fully transparent about any changes to this policy, if they do occur.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">Who created remarket? </span>
                        Remarket was originally founded as coases.com for NYU by two women alumni of NYU and Columbia. We relaunched as reuse.market, this time for use by both schools, in September 2017.
                    </div>
                </div>
                <h2 style={style} classNames="category-header about-header">using remarket</h2>
                <div className="about-content">
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How do I sign up? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How do I edit my username or bio on remarket? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How do I create a new post? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How do I see all my posts? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How do I edit my post? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How do I add photos to my post? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">Who can view my post? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How will I know if someone is interested in my post? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How can I mark my item as sold or no longer available? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How can I renew my post? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How do I reply to another user's post? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">How do I join a network? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div style={{'font-family': 'avenir'}} >
                        <span className="about-question">Why should I join a network? </span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ante enim.
                        Mauris vitae nunc eget ante commodo varius. Sed nisi orci, rhoncus at sem quis, tincidunt auctor lorem.
                        Cras dignissim metus eros, et fringilla mauris ultricies a. Fusce turpis purus, rhoncus non mauris at, aliquam elementum lacus.
                    </div>
                    <div className="about-note" style={{'font-family': 'avenir'}} >
                        Remarket is free to use and your information privacy and security are important to us.
                        Remarket is not sponsored by, endorsed by, or affiliated with NYU or Columbia University in any way
                        (except that <a href="https://www.reuse.market/user/13">its creator</a> is an alumna of both 👻 ).
                    </div>
                </div>
            </div>
        </div>
    )
}
