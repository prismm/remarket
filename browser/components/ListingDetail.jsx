/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Breadcrumbs from './Breadcrumbs.jsx';
import spinner from '../HOC/Spinner.jsx'
import { clearCurrentListing_dispatch } from '../actions/listing';
import Button from 'react-md/lib/Buttons/Button'; 
import TimeAgo from './TimeAgo.jsx';
import {ExpiresIn} from './TimeLeft.jsx';
import {NetworkAvatar} from './Avatars.jsx';
import CreateListing from '../containers/CreateListing.jsx'


/*------------------- ListingDetail component ----------------------*/

class ListingDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit: props.currentListing.editStatus || false
        }
        this.onEditClick = this.onEditClick.bind(this);
        this.onPublishClick = this.onPublishClick.bind(this);
    }

    componentWillUnmount(){
        return this.props.clearCurrentListing();
    }

    onEditClick(){
        this.setState({edit: true});
    }

    onPublishClick(){
        this.setState({edit: false});
        browserHistory.push(`/listings/${this.props.currentListing.id}`)
    }


    render(){
        const isItMyListing = this.props.currentListing.authorId === this.props.user.id;
        const wasItEdited = this.props.currentListing.createdAt !== this.props.currentListing.updatedAt;
        const shouldRenderDetail = this.props.currentListing && !this.state.edit;
        const shouldRenderForm = isItMyListing && this.props.currentListing && this.state.edit;
        
        return (
            <div>
            {shouldRenderDetail && (
                <div className="md-grid listing-detail-container">
                <Breadcrumbs currentListing={this.props.currentListing} />
                <div className="md-cell md-cell--10 currentListing md-grid">
                    <div className="listing-images md-cell md-cell--5">
                        <img className="item-img" src={ this.props.currentListing.imageUrl } />
                    </div>
                    <div className="md-cell md-cell--1" />
                    <div className="listing-body md-cell md-cell--5">
                    <div className="item-descr">
                        <h3 className="selected-item-name">{this.props.currentListing.name}</h3>
                        <h3 className="selected-item-category">{this.props.currentListing.category}</h3>
                        {isItMyListing ?
                            <Button
                                raised
                                primary
                                label="edit this listing"
                                className="my-listing-button edit-listing-button"
                                onClick={this.onEditClick}
                            />
                            :
                            <h5 className="selected-item-author">listed by <Link to={`/user/${this.props.currentListing.author.id}`}>{this.props.currentListing.author.userId}</Link></h5>
                        }
                        <p className="listing-detail-timestamp">Created on {this.props.currentListing.created} </p><TimeAgo time={this.props.currentListing.createdAt} />
                        {wasItEdited ? <div className="modified-timestamp"><p className="listing-detail-timestamp">Updated on {this.props.currentListing.modified}</p><TimeAgo time={this.props.currentListing.updatedAt} /></div>
                            :
                            null
                        }
                        { (this.props.currentListing.networks && this.props.currentListing.networks.length) ?
                            this.props.currentListing.networks.map(
                                network => <NetworkAvatar key={network.id} network={network.name} tooltipLabel={network.name} tooltipPosition="top" />
                                )
                            :
                            null
                        }

                        <p className="selected-item-descr">{this.props.currentListing.description}</p>
                        <ExpiresIn time={this.props.currentListing.expirationDate} expiry={this.props.currentListing.expiresIn} />
                    </div>
                    {this.props.currentListing.askingPrice ?
                        <div className="price">
                            <p>floor price: {this.props.currentListing.floorPrice}</p>
                            <p>asking price: {this.props.currentListing.askingPrice}</p>
                        </div>
                        :
                        null
                    }
                    </div>
                </div>
                </div>)
            }
            {shouldRenderForm && (
                <CreateListing currentListing={this.props.currentListing} onPublishClick={this.onPublishClick} />
                )
            }
            </div>
        )
    }
}

ListingDetail.propTypes = {
  currentListing: PropTypes.object,
  clearCurrentListing: PropTypes.func.isRequired,
  user: PropTypes.object
};

/*------------------- ListingDetail Container ----------------------*/
const mapStateToProps = ({user, listing, network}) => ({
        currentListing: listing.currentListing,
        user: user,
        network: network
    });

const mapDispatchToProps = dispatch => {
    return {
        clearCurrentListing: () => dispatch(clearCurrentListing_dispatch())
    }
}

const ListingDetailWithSpinner =  spinner('currentListing')(ListingDetail);

export default connect(mapStateToProps, mapDispatchToProps)(ListingDetailWithSpinner);
