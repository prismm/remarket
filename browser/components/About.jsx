/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router';

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
                <div style={{'font-family': 'avenir'}} ><span className="about-question">What is remarket? </span>This website is a marketplace and classifieds site for NYU & Columbia.
                    The goal of remarket is to improve the efficiency and trust-level of secondhand transactions -- in other words, to make it
                    safer & easier to find, buy, sell, and give away stuff, so that less stuff in our communities gets thrown away and more gets reused.</div>
                <div className="center">
                <img alt="furniture on the curb" style={{'max-width': '450px'}} className='about-img' src="/imgs/furnitureoncurb.jpg" />
                <div className='about-caption'>This furniture is headed to a landfill. Currently, 4% of landfill waste (9 million tons per year) is furniture waste; when people throw away usable furniture, it increases demand for new furniture which leads to greater material consumption and deforestation.</div>
                </div>
                <div style={{'font-family': 'avenir'}} >In addition to items free & for sale, you can publish housing posts, jobs/opportunities, and events.</div>
                <div style={{'font-family': 'avenir'}} ><span className="about-question">How does it work? </span>Remarket users may affiliate with NYU or Columbia or both; we verify these affiliations
                    through the user's network email address domain (nyu.edu or columbia.edu). To view posts belonging to either network,
                    toggle the 'NYU' and 'Columbia' buttons in the header. <span className="nyu-selected">NYU posts are purple</span> and <span className="columbia-selected">Columbia posts are blue</span>.
                    All posts are flagged with their author's affiliations, and you can find a user's affiliations by clicking on their name and viewing their profile.  </div>
                <div className="about-note" style={{'font-family': 'avenir'}} >Remarket is free to use and your information privacy/security is important to us.
                    Remarket is not sponsored by, endorsed by, or affiliated with NYU or Columbia University in any way
                    (except that <a href="https://www.reuse.market/user/13">its creator</a> is an alumna of both 👻).</div>
                </div>
            </div>
        </div>
    )
}
