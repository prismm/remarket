import { connect } from 'react-redux';
import ListingDetail from '../components/ListingDetail.jsx';

/*------------------- ListingDetail Container ----------------------*/
const mapStateToProps = ({user, listing, network}) => ({
        currentListing: listing.currentListing,
        user: user,
        network: network
    });

// const mapDispatchToProps = (dispatch) => ({})

const ListingDetailContainer = connect(mapStateToProps)(ListingDetail);

export default ListingDetailContainer;
