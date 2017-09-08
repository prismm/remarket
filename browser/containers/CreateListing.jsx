/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Radio from 'react-md/lib/SelectionControls/Radio';
import TextField from 'react-md/lib/TextFields';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import Button from 'react-md/lib/Buttons/Button';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';

import {createListing_dispatch, editListing_dispatch, createListingError_action} from '../actions/listing';
import {forSaleSubcategories, housingSubcategories, communitySubcategories} from '../subcategories'
import {locations} from '../locations'

/*------------------- CreateListing component ----------------------*/
class CreateListing extends Component {
    constructor(props){
        super(props);
        let inTwoWeeks = (d => new Date(d.setDate(d.getDate() + 14)))(new Date);
        this.state = {
                        category: props.currentListing ? props.currentListing.category : 'for sale',
                        name: props.currentListing ? props.currentListing.name : 'A New Post',
                        subcategory: props.currentListing ? props.currentListing.subcategory : '',
                        location: props.currentListing ? props.currentListing.location : '',
                        neighborhood: props.currentListing ? props.currentListing.neighborhood : '',
                        description: props.currentListing ? props.currentListing.description : '',
                        floorPrice: props.currentListing ? props.currentListing.floorPrice : 0,
                        askingPrice: props.currentListing ? props.currentListing.askingPrice : undefined,
                        priceDescriptor: props.currentListing ? props.currentListing.priceDescriptor : '',
                        expirationDate: props.currentListing ? props.currentListing.expirationDate : inTwoWeeks,
                        authorId: props.user.id,
                        error: null
                    };
        this.handleChange = this.handleChange.bind(this);
        this.setExpirationDate = this.setExpirationDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.publishEdits = this.publishEdits.bind(this);
        this.handleSubcategoryChange = this.handleSubcategoryChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleNeighborhoodChange = this.handleNeighborhoodChange.bind(this);
        // this.setError = this.setError.bind(this);
    }

    componentWillUnmount(){
        this.props.clearError();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubcategoryChange(value){
        this.setState({subcategory: value})
    }

    handleLocationChange(value){
        this.setState({location: value})
    }

    handleNeighborhoodChange(name, value){
        this.setState({neighborhood: value})
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.createListing(this.state);
    }

    publishEdits(event){
        event.preventDefault();
        if (this.props.error) return;
        this.props.editListing(this.props.currentListing.id, this.state);
        if (this.props.error) return;
        //async problem -- rerenders listing before it's officially updated //RESOLVED with browserHistory.push?
        this.props.onPublishClick();
    }

    // setError(error){
    //     this.setState(error)
    // }

    setExpirationDate(event){
        let newExpDate = new Date(event).setHours(23, 59);
        console.log(new Date(newExpDate));
        this.setState({expirationDate: new Date(newExpDate)})
    }

    render(){
        const category = this.state.category;
        if (category === 'for sale') this.subcategories = forSaleSubcategories.slice(1);
        if (category === 'housing') this.subcategories = housingSubcategories.slice(1);
        if (category === 'community') this.subcategories = communitySubcategories.slice(1);

        let today = new Date();
        let twoMonthsLater = new Date(new Date().setMonth(today.getMonth() + 2));
        const error = this.props.error;

        return (
            <div className="md-grid create-listing">
            <div className="md-cell md-cell--8">
            <h3 className="content-title-header">{this.state.name}</h3>
                <fieldset className="category-selection" onChange={this.handleChange}>
                    <legend className="md-subheading-1">What kind of post?</legend>
                    <div className="md-grid inner-fieldset">
                    <div className="md-cell--6">
                    <Radio
                        id="category1"
                        inline
                        name="category"
                        value="for sale"
                        label="for sale"
                        checked={category === 'for sale'}
                    />
                    <Radio
                        id="category2"
                        inline
                        name="category"
                        value="housing"
                        label="housing"
                        checked={category === 'housing'}
                    />
                    <Radio
                        id="category3"
                        inline
                        name="category"
                        value="community"
                        label="community"
                        checked={category === 'community'}
                    />
                    </div>
                    <div className="md-cell--6">
                    <Dropdown
                        auto
                        allowBlank={true}
                        label="subcategory"
                        className="subcategory-dropdown create-listing-subcategory-dropdown"
                        onChange={this.handleSubcategoryChange}
                        source={this.subcategories}
                        value={this.state.subcategory}
                    />
                    </div>
                    </div>
                </fieldset>
                { category === 'for sale' ?
                    <div className="create-for-sale">
                    <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                        <fieldset className="name-and-description">
                            <legend className="md-subheading-1">What are you selling?</legend>
                            <div className="md-grid inner-fieldset">
                            <TextField
                                    id="name"
                                    name="name"
                                    value={this.state.name}
                                    maxLength={55}
                                    errorText="Must be no more than 55 characters"
                                    label="Title"
                                    className="create-listing-title md-cell md-cell--12"
                                    required
                                />
                                <TextField
                                    id="description"
                                    label="Description"
                                    name="description"
                                    value={this.state.description}
                                    rows={3}
                                    className="md-cell md-cell--12"
                                    required
                                />
                            </div>
                        </fieldset>
                        <fieldset className="location">
                            <legend className="md-subheading-1">Where?</legend>
                            <div className="md-grid inner-fieldset">
                            <div className="md-cell md-cell--6">
                                <Dropdown
                                    auto
                                    allowBlank={true}
                                    label="location (city)"
                                    className="location-dropdown create-listing-location-dropdown"
                                    onChange={this.handleLocationChange}
                                    source={locations}
                                    value={this.state.location}
                                />
                            </div>
                            <div className="md-cell md-cell--6">
                                    <Input
                                        type="text"
                                        label="more specifically..."
                                        name="neighborhood"
                                        value={this.state.neighborhood}
                                        onChange={this.handleNeighborhoodChange}
                                        maxLength={40}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="price">
                            <legend className="md-subheading-1">For how much?</legend>
                            <div className="md-grid inner-fieldset">
                                <TextField
                                    id="askingPrice"
                                    label="Asking Price ( $ )"
                                    name="askingPrice"
                                    type="number"
                                    value={this.state.askingPrice}
                                    step={1.00}
                                    min={0}
                                    pattern="^\d+(\.|\,)\d{2}"
                                    className="price md-cell md-cell--1-phone md-cell--4"
                                    required
                                />
                                <TextField
                                    id="floorPrice"
                                    label="Floor Price ( $ )"
                                    name="floorPrice"
                                    value={this.state.floorPrice}
                                    type="number"
                                    defaultValue={0}
                                    step={1.00}
                                    min={0}
                                    pattern="^\d+(\.|\,)\d{2}"
                                    className="price md-cell md-cell--1-phone md-cell--4"
                                />
                            </div>
                        </fieldset>
                        <div className="exp-date-picker md-grid md-cell--12">
                            <DatePicker
                                id="inline"
                                label="Post expiration date?"
                                name="expirationDate"
                                minDate={today}
                                maxDate={twoMonthsLater}
                                value={this.state.expirationDate}
                                inline
                                className="md-cell--4 date-picker"
                                required
                                onChange={this.setExpirationDate}
                            />
                        </div>
                        {this.props.currentListing ?
                            <Button
                                raised
                                primary
                                label="Publish Edits"
                                onClick={this.publishEdits}
                                className="submit md-cell--12 md-cell--right"
                                disabled={!this.state.name || !this.state.description || !this.state.askingPrice}
                            />
                            :
                            <Button
                                raised
                                primary
                                label="Publish Post"
                                type="submit"
                                className="submit md-cell--12 md-cell--right"
                                disabled={!this.state.name || !this.state.description || !this.state.askingPrice}
                            />
                        }
                        {   error ?  <div className="response-message">I'm sorry, something went wrong. We are looking into it. Please try again later.</div> : null }
                    </form>
                    </div>
                    : null}
                { category === 'housing' ?
                    <div className="create-housing">
                        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                        <fieldset className="name-and-description">
                            <legend className="md-subheading-1">What are your housing needs?</legend>
                            <div className="md-grid inner-fieldset">
                            <TextField
                                    id="name"
                                    name="name"
                                    value={this.state.name}
                                    maxLength={55}
                                    errorText="Must be no more than 55 characters"
                                    label="Title"
                                    className="create-listing-title md-cell md-cell--12"
                                    required
                                />
                                <TextField
                                    id="description"
                                    label="Description"
                                    name="description"
                                    value={this.state.description}
                                    rows={3}
                                    className="md-cell md-cell--12"
                                    required
                                />
                            </div>
                        </fieldset>
                        <fieldset className="location">
                            <legend className="md-subheading-1">Where?</legend>
                            <div className="md-grid inner-fieldset">
                                <div className="md-cell md-cell--6">
                                    <Dropdown
                                        auto
                                        allowBlank={true}
                                        label="location (city)"
                                        className="location-dropdown create-listing-location-dropdown"
                                        onChange={this.handleLocationChange}
                                        source={locations}
                                        value={this.state.location}
                                    />
                                </div>
                                <div className="md-cell md-cell--6">
                                    <Input
                                        type="text"
                                        label="more specifically..."
                                        name="neighborhood"
                                        value={this.state.neighborhood}
                                        onChange={this.handleNeighborhoodChange}
                                        maxLength={40}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="price">
                        <legend className="md-subheading-1">For how much?</legend>
                        <div className="md-grid inner-fieldset">
                            <TextField
                                id="askingPrice"
                                label="Asking Price ( $ )"
                                name="askingPrice"
                                type="number"
                                value={this.state.askingPrice}
                                step={1.00}
                                min={0}
                                pattern="^\d+(\.|\,)\d{2}"
                                className="price md-cell md-cell--1-phone md-cell--4"                            
                            />
                            <TextField
                                id="priceDescriptor"
                                label="Price Descriptor (e.g., '/month')"
                                name="priceDescriptor"
                                value={this.state.priceDescriptor}
                                className="price md-cell md-cell--1-phone md-cell--4"
                                maxLength={16}
                            />
                        </div>
                    </fieldset>
                        <div className="exp-date-picker md-grid md-cell--12">
                            <DatePicker
                                id="inline"
                                label="Post expiration date?"
                                name="expirationDate"
                                minDate={today}
                                maxDate={twoMonthsLater}
                                value={this.state.expirationDate}
                                inline
                                className="md-cell--4 date-picker"
                                required
                                onChange={this.setExpirationDate}
                            />
                        </div>
                            {this.props.currentListing ?
                                <Button
                                    raised
                                    primary
                                    label="Publish Edits"
                                    onClick={this.publishEdits}
                                    className="submit md-cell--12 md-cell--right"
                                    disabled={!this.state.name || !this.state.description || !this.state.askingPrice}
                                />
                                :
                                <Button
                                    raised
                                    primary
                                    label="Publish Post"
                                    type="submit"
                                    className="submit md-cell--12 md-cell--right"
                                    disabled={!this.state.name || !this.state.description || !this.state.askingPrice}
                                />
                            }
                            {   error ?  <div className="response-message">I'm sorry, something went wrong. We are looking into it. Please try again later.</div> : null }
                        </form>
                    </div>
                    : null}
                { category === 'community' ?
                    <div className="create-community">
                        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                        <fieldset className="name-and-description">
                            <legend className="md-subheading-1">Tell us more...</legend>
                            <div className="md-grid inner-fieldset">
                            <TextField
                                    id="name"
                                    name="name"
                                    value={this.state.name}
                                    maxLength={55}
                                    errorText="Must be no more than 55 characters"
                                    label="Title"
                                    className="create-listing-title md-cell md-cell--12"
                                    required
                                />
                                <TextField
                                    id="description"
                                    label="Description"
                                    name="description"
                                    value={this.state.description}
                                    rows={3}
                                    className="md-cell md-cell--12"
                                    required
                                />
                            </div>
                        </fieldset>
                        <div className="exp-date-picker md-grid md-cell--12">
                            <DatePicker
                                id="inline"
                                label="Post expiration date?"
                                name="expirationDate"
                                minDate={today}
                                maxDate={twoMonthsLater}
                                value={this.state.expirationDate}
                                inline
                                className="md-cell--4 date-picker"
                                required
                                onChange={this.setExpirationDate}
                            />
                        </div>
                            {this.props.currentListing ?
                                <Button
                                    raised
                                    primary
                                    label="Publish Edits"
                                    onClick={this.publishEdits}
                                    className="submit md-cell--12 md-cell--right"
                                    disabled={!this.state.name || !this.state.description}
                                />
                                :
                                <Button
                                    raised
                                    primary
                                    label="Publish Post"
                                    type="submit"
                                    className="submit md-cell--12 md-cell--right"
                                    disabled={!this.state.name || !this.state.description}
                                />
                            }
                            {   error ?  <div className="response-message">I'm sorry, something went wrong. We are looking into it. Please try again later.</div> : null }
                        </form>
                    </div>
                : null}
            </div>
            </div>
            )
    }
}

CreateListing.propTypes = {
  user: PropTypes.object.isRequired,
  createListing: PropTypes.func.isRequired,
  currentListing: PropTypes.object,
  onPublishClick: PropTypes.func
};

/*------------------- Container ----------------------*/

const mapStateToProps = state => {
    return {
        user: state.user,
        userNetworks: state.user.networks,
        error: state.listing.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createListing: listing => {
            dispatch(createListing_dispatch(listing))
        },
        editListing: (listingId, changes) => {
            dispatch(editListing_dispatch(listingId, changes))
        },
        clearError: () => {
            dispatch(createListingError_action(null))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing);
