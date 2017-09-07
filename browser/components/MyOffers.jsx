import React, { Component } from 'react';
import { connect } from 'react-redux';
// import FontIcon from 'react-md/lib/FontIcons';


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
const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(MyOffers);
