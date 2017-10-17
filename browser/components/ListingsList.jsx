import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import Dropdown from 'react-toolbox/lib/dropdown';

import Listing from './Listing.jsx';
import spinner from '../HOC/Spinner.jsx';
import Loader from '../HOC/Loader.jsx';
import ListingListMenu from './ListingListMenu.jsx'


/*------------------- ListingsList component ----------------------*/

class ListingsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            waiting: !props.listings.length,
            subcategory: props.subcategory || null,
            listings: props.listings
        }
        this.handleSubcategoryChange = this.handleSubcategoryChange.bind(this);
    }

    componentDidMount(){
        this.timeout = setTimeout(() => {
            this.timeout = null;
            this.setState({waiting: false});
          }, 4000);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.listings.length !== this.props.listings.length){
            this.setState({waiting: false})
        }
    }

    componentWillUnmount(){
        if (this.timeout) {
            clearTimeout(this.timeout);
          }
    }

    handleSubcategoryChange(value){
        const catUrl = this.props.category === 'for sale' ? 'for-sale' : this.props.category;
        const subcatUrl = value ? value : '';
        browserHistory.push(`/${catUrl}/${subcatUrl}`);
        this.setState({subcategory: value})
    }

    render(){
        let {listings, category, currentNetwork, classNames, menuSubcategories} = this.props;
        // let listings = this.props.listings;
        const catUrl = category === 'for sale' ? 'for-sale' : category;
        const catName = category === 'for sale' ? 'free & for sale' : category;
        const subcategories = this.props.subcategories ? this.props.subcategories : null;
        //filtering by network
        if (currentNetwork && currentNetwork.id) listings = listings.filter(listing => listing.networks.some(network => network.id === currentNetwork.id));
        //filtering by subcategory
        if (this.state.subcategory) listings = listings.filter(listing => listing.subcategory === this.state.subcategory)
        return (
            <div className={classNames}>
                <h2 className="category-header"><Link to={`/${catUrl}`}>{catName}</Link></h2>
                {menuSubcategories ? <ListingListMenu category={category} menuSubcategories={menuSubcategories} /> : null }
                {subcategories ?
                    <Dropdown
                        auto
                        allowBlank={true}
                        label="subcategory"
                        className="subcategory-dropdown"
                        onChange={this.handleSubcategoryChange}
                        source={subcategories}
                        value={this.state.subcategory}
                    />
                    :
                    null}
                { listings && !this.state.waiting ?
                    listings.map(listing => <div key={listing.id}><Listing listing={listing} /></div>)
                    :
                    <Loader loadingText="" /> //will occur if !listings (won't happen since listings is []) or if this.state.waiting (will happen when component mounts for 4 seconds or until component receives new listings)
                }
                { !listings.length && !this.state.waiting ?
                    <div className="no-posts">No posts to display</div> //will occur if there are no listings and 4 seconds have elapsed since mounting
                    :
                    null
                }
            </div>
        )}
}

ListingsList.propTypes = {
    category: PropTypes.string,
    listings: PropTypes.array,
    currentNetwork: PropTypes.object
};


/*------------------- Container ----------------------*/

const mapState = state => ({
    currentNetwork: state.network.currentNetwork
  });

const ListingsListWithSpinner = spinner('listings')(ListingsList);
export default connect(mapState)(ListingsListWithSpinner);
