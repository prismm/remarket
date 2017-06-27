import { connect } from 'react-redux';
import ListingsList from '../components/ListingsList.jsx';

/*----------------------- ListingsList Container ---------------------------*/
const mapStateToProps = ({user, listing, network}) => ({
        listings: listing.listings,
        user: user,
        network: network
    });

export default connect(mapStateToProps)(ListingsList);