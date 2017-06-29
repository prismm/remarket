/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Radio from 'react-md/lib/SelectionControls/Radio';
import TextField from 'react-md/lib/TextFields';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import Button from 'react-md/lib/Buttons/Button';

import {createListing_dispatch} from '../actions/listing';

/*------------------- CreateListing component ----------------------*/
class CreateListing extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setExpirationDate = this.setExpirationDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
                        category: props.currentListing ? props.currentListing.category : 'for sale',
                        name: props.currentListing ? props.currentListing.name : '',
                        location: props.currentListing ? props.currentListing.location : '',
                        description: props.currentListing ? props.currentListing.description : '',
                        floorPrice: props.currentListing ? props.currentListing.floorPrice : 0,
                        askingPrice: props.currentListing ? props.currentListing.askingPrice : '?',
                        expirationDate: props.currentListing ? props.currentListing.expirationDate : new Date(),
                        authorId: props.user.id
                    };
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        if (!this.state.name || !this.state.description){
            alert("You must complete required fields in order to post -- Thanks!");
            return
        }
        this.props.createListing(this.state);
    }

    setExpirationDate(event){
        this.setState({expirationDate: event})
    }

    render(){
        const category = this.state.category;
        return (
            <div>
                <fieldset onChange={this.handleChange}>
                    <legend className="md-subheading-1">What kind of post?</legend>
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
                </fieldset>
                { category === 'for sale' ?
                    <div className="create-for-sale">
                        <form className="md-grid" onChange={this.handleChange} onSubmit={this.handleSubmit}>
                            <TextField
                                id="name"
                                name="name"
                                value={this.state.name}
                                label="What are you selling?"
                                className="md-cell md-cell--12"
                                required
                            />
                            <TextField
                                id="location"
                                label="Location?"
                                name="location"
                                value={this.state.location}
                                className="location md-cell md-cell--1-phone md-cell--4"
                            />
                            <TextField
                                id="askingPrice"
                                label="Asking Price"
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
                                label="Floor Price"
                                name="floorPrice"
                                value={this.state.floorPrice}
                                type="number"
                                defaultValue={0}
                                step={1.00}
                                min={0}
                                pattern="^\d+(\.|\,)\d{2}"
                                className="price md-cell md-cell--1-phone md-cell--4"
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
                            <DatePicker
                                id="inline"
                                label="Post expiration date?"
                                name="expirationDate"
                                value={this.state.expirationDate}
                                inline
                                className="md-cell date-picker"
                                required
                                onChange={this.setExpirationDate}
                                />
                            <Button flat primary label="Submit" type="submit" className="submit md-cell--12 md-cell--right" />
                        </form>
                    </div>
                    : null}
                { category === 'housing' ?
                    <div className="create-housing">
                        <form className="md-grid" onChange={this.handleChange} onSubmit={this.handleSubmit}>
                            <TextField
                                id="Title"
                                name="name"
                                label="Title for your housing post?"
                                className="md-cell md-cell--12"
                                required
                            />
                            <TextField
                                id="applicationLocation"
                                name="location"
                                label="Location?"
                                className="location md-cell md-cell--1-phone md-cell--4"
                                required
                            />
                            <TextField
                                id="askingPrice"
                                name="askingPrice"
                                label="Price?"
                                className="price md-cell md-cell--1-phone md-cell--8"
                            />
                            <TextField
                                id="description"
                                label="Description"
                                name="description"
                                rows={3}
                                className="md-cell md-cell--12"
                                required
                            />
                            <DatePicker
                                id="inline"
                                name="expirationDate"
                                label="Post expiration date?"
                                inline
                                className="md-cell date-picker"
                                required
                                onChange={this.setExpirationDate}
                                />
                            <Button flat primary label="Submit" type="submit" className="submit md-cell--12 md-cell--right" />
                        </form>
                    </div>
                    : null}
                { category === 'community' ?
                    <div className="create-community">
                        <form className="md-grid" onChange={this.handleChange} onSubmit={this.handleSubmit}>
                            <TextField
                                id="Title"
                                name="name"
                                label="Title for your post?"
                                className="md-cell md-cell--12"
                                required
                            />
                            <TextField
                                id="description"
                                label="Content"
                                name="description"
                                rows={3}
                                className="md-cell md-cell--12"
                                required
                            />
                            <DatePicker
                                id="inline"
                                label="Post expiration date?"
                                name="expirationDate"
                                className="md-cell date-picker"
                                required
                                onChange={this.setExpirationDate}
                                />
                            <Button flat primary label="Submit" type="submit" className="submit md-cell--12 md-cell--right" />
                        </form>
                    </div>
                : null}
            </div>
            )
    }
}

CreateListing.propTypes = {
  user: PropTypes.object.isRequired,
  createListing: PropTypes.func.isRequired,
  currentListing: PropTypes.object
};

/*------------------- Container ----------------------*/

const mapStateToProps = state => {
    return {
        user: state.user,
        userNetworks: state.user.networks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createListing: listing => {
            dispatch(createListing_dispatch(listing))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing);