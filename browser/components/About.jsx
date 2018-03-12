/* eslint-disable camelcase */
import React from 'react';
import { ExpansionList, ExpansionPanel } from 'react-md';

/*----------------------- About Component ---------------------------*/
export default function About () {
    return (
        <div className="md-grid">
            <div className="md-cell md-cell--8 about-body">
                <h2 className="category-header about-header">Hello & welcome to reuse.market, a.k.a. remarket!</h2>
                    <div className="about-content">
                    <p>
                    This website is a marketplace and classifieds site for NYU & Columbia created by alumni of both schools. It's secure and totally free to use.
                    </p>
                    <p>
                    The goal of remarket is to improve the efficiency and trust-level of secondhand transactions in our communities -- in other words, to make it safer & easier to find, buy, sell, and give away stuff, so that less stuff gets thrown away and more gets reused. In addition to items free & for sale, you can post & browse through housing, jobs/opportunities, and community events on remarket.
                    </p>
                    <p>
                    Our FAQs are a continual work in progress. If your question is not adequately addressed below, please <a className="color-link" href="https://www.reuse.market/contact">reach out to us</a> and we will do our best to help out.
                    </p>
                    </div>
                <br />
                <h2 className="category-header about-header">About remarket</h2>
                    <div className="about-content">
                        <div>
                        Here are the basics on our site.
                        </div>
                    <div className="faq-expansion-list">
                    <ExpansionList>    
                        <ExpansionPanel label="Who can use remarket?" footer={null}>
                        <div>
                        <p>Anyone can use remarket -- you do not have to be an NYU or Columbia student to sign up or to post. However, without a verified NYU or Columbia email address, you cannot affiliate with either network.
                        All posts are flagged with their author's affiliations, and you can find a user's affiliations by clicking on their name and viewing their profile.
                        </p>
                        </div>
                        </ExpansionPanel>
                        <ExpansionPanel label="How does it work?" footer={null}>
                        <div>
                        <p>After signing up, remarket users may affiliate with NYU or Columbia or both; we verify these affiliations
                        through the user's network email address domain (nyu.edu or columbia.edu).</p><p>To view posts belonging to either network,
                        toggle the 'NYU' and 'Columbia' buttons in the header. <span className="nyu-selected">NYU posts are purple</span> and <span className="columbia-selected">Columbia posts are blue</span>.
                        All posts are flagged with their author's affiliations, and you can find a user's affiliations by clicking on their name and viewing their profile.</p>
                        </div>
                        </ExpansionPanel>
                        <ExpansionPanel label="Does it cost anything to use remarket?" footer={null}>
                        <div>
                        <p>No. Remarket is free to use and we do not sell your information (we are not making any money off of you). We intend to be fully transparent about any changes to this policy, if they do occur.
                        </p>
                        </div>
                        </ExpansionPanel>
                        <ExpansionPanel label="Who created remarket?" footer={null}>
                        <div>
                        <p>Remarket was originally founded as coases.com (named after Ronald Coase, and the NYU Law listserv coases-list) for NYU by two women alumni of NYU and Columbia. We relaunched as www.reuse.market, this time for use by both schools, in September 2017.
                        </p>
                        </div>
                        </ExpansionPanel>
                    </ExpansionList>
                    </div>
                </div>
                <br />
                <h2 className="category-header about-header">On using remarket</h2>
                    <div className="about-content">
                        <div>
                        Here we provide some more detail on the specific functions of remarket.
                        </div>
                        <div className="faq-expansion-list">
                        <ExpansionList>
                            <ExpansionPanel label="How do I sign up?" footer={null}>
                            <div>
                            <p>Click 'Sign Up' in the top right-hand corner. Sign up to use remarket with any valid email address, or through your existing Google or Facebook accounts.
                            Confirm your account by checking your email for a confirmation message from remarket -- follow the link in the email to confirm.
                            </p><p>
                            If you use an @nyu.edu or @columbia.edu email address, you will automatically be joined into your school's network on remarket.
                            If you choose to sign up with another email address, or with your Google or Facebook account, you will always have the opportunity to join your school's network later, through My Account -> My Networks.</p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="How do I edit my username or bio on remarket?" footer={null}>
                            <div>
                            <p>Log in, and then navigate to My Account -> My Profile. Here you can edit your username and bio and update your account information.
                            </p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="How do I create a new post?" footer={null}>
                            <div>
                            <p>Once you’re logged into remarket, click on New Post in the upper righthand corner.</p>
                            <p>
                            This will bring you to a form you can use to create your post. Fill in the form, choose an expiration date for your post, and press Publish Post.
                            Your post will then be published and you will be redirected to the published post, which you can then edit, add photos, or share on Facebook.
                            </p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="How do I see all my posts?" footer={null}>
                            <div>
                            <p>Log in and click on My Account in the upper righthand corner, and then select My Posts from the lefthand menu. All your posts (whether active or archived) will be listed there.
                            </p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="How do I edit my post?" footer={null}>
                            <div>
                            <p>There are two ways to edit your post.</p>
                            <p>First, you can navigate to My Account ->  My Posts -> Edit, which will bring you to a form you can use to edit your post.<br />
                            </p>
                            <p>Second, you can navigate to your post itself; if you’re logged in, you should see an option to edit the post right below the post’s title.
                            </p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="How do I add photos to my post?" footer={null}>
                            <div>
                            <p>Log in and navigate to your post. Click on Add/Manage Photos to add, edit, or delete the photos that display alongside your post.
                            </p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="Who can view my post?" footer={null}>
                            <div>
                            <p>Anyone visiting remarket can view your post. Only logged in users can see your profile or contact you through remarket. Your email address is not exposed to users on the site.
                            </p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="How will I know if someone is interested in my post?" footer={null}>
                            <div>
                            <p>Anyone visiting your post will have the option of messaging you to express interest in your post. For security purposes, we require that users log in or create an account in order to message other users. These messages will go directly to your email inbox, along with a link to the sender's remarket profile so you can see their network affiliations.
                            </p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="How can I mark my item as sold or no longer available?" footer={null}>
                            <div>
                            <p>We encourage you to keep your posts up-to-date and relevant. If your posted item is no longer available, or if your post is no longer relevant, please archive the post by visiting My Account -> My Posts -> Delete.</p><p> (You will then be given the choice of archiving or completely deleting the post; we recommend archiving as it takes the item off the market but saves the post in case you want to revisit or reactivate it in the future.)
                            </p>
                            <p>Your post will automatically archive upon its expiration date.
                            </p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="How can I renew my post?" footer={null}>
                            <div>
                            <p>Log in and navigate to My Account ->  My Posts; there you will see an option to renew your post by selecting a new expiration date in the future.
                            </p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="How do I reply to another user's post?" footer={null}>
                            <div>
                            <p>Log in and navigate to the post. Click the "Message" button under the post's title to message the user.
                            Your message will go directly to that user's email inbox. Their replies to your message will go directly to your email inbox.
                            </p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="How do I join a network?" footer={null}>
                            <div>
                            <p>There are two ways to join a network.</p>

                            <p>You can join a network automatically by signing up for remarket with your network email address -- you@nyu.edu, or you@columbia.edu. Once you confirm your account by verifying your email, you will be joined into your school's network.</p>

                            <p>Alternatively, you can join a network after you've already created an account by logging in and navigating to My Account -> My Networks. Choose your network from the dropdown menu and provide your associated email address (you@nyu.edu, or you@columbia.edu). Then check your network email inbox for a confirmation email, to verify your affiliation.</p>
                            </div>
                            </ExpansionPanel>
                            <ExpansionPanel label="Why should I join a network?" footer={null}>
                            <div>
                            <p>You are not required to be part of a network in order to post or reply to posts on remarket.</p>

                            <p>Nevertheless, we recommend you join your school's networks on remarket so that other users will be able to see that you are within their school's network. Being part of a network increases your trustworthiness and improves your chances of receiving replies from other network members.</p>

                            <p>Remarket can be a more efficient marketplace when all users have joined their networks, because trust leads to greater market efficiency.</p>
                            </div>
                            </ExpansionPanel>
                        </ExpansionList>
                        </div>
                        <div className="about-note">
                            Remarket is free to use and your information privacy and security are important to us.
                            Remarket is not sponsored by, endorsed by, or affiliated with NYU or Columbia University in any way
                            (except that <a href="https://www.reuse.market/user/13">its creator</a> is an alumna of both 👻 ).
                        </div>
                </div>
            </div>
        </div>
    )
}
