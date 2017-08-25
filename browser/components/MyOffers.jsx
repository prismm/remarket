import React, { Component } from 'react';
import { connect } from 'react-redux';

/*----------------------- MyOffers Component ---------------------------*/
class MyOffers extends Component {
    constructor(props){
        super(props);
        this.state = {
            progressFlag: false,
            error: null,
            photos: []
        }
    }

    render(){
        return (
        <div>
            <h3>My Offers</h3>
        </div>
        )
    }
}

MyOffers.propTypes = {
  };

/*---------------------------------Container------------------------------------*/
const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(MyOffers);
