import React, { Component } from 'react';
import { connect } from 'react-redux';

/*----------------------- MyOffers Component ---------------------------*/
class MyOffers extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return (
        <div>
            <h3>My Offers</h3>
            <h4 className="coming-soon">Coming soon.</h4>
        </div>
        )
    }
}

MyOffers.propTypes = {
  };

/*---------------------------------Container------------------------------------*/
const mapState = ({user, listing}) => ({
    currentListing: listing.currentListing,
    user: user
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(MyOffers);
