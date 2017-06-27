/* eslint-disable camelcase */
import store from '../store.jsx';
import React, { Component } from 'react';
import Radio from 'react-md/lib/SelectionControls/Radio';
import TextField from 'react-md/lib/TextFields';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import Button from 'react-md/lib/Buttons/Button';
import {createListing_dispatch} from '../actions/listing';

export default class CreateListing extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setExpirationDate = this.setExpirationDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
                        category: 'for sale',
                        name: '',
                        location: '',
                        description: '',
                        floorPrice: 0,
                        askingPrice: null,
                        expirationDate: new Date()
                    };
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        console.log(event);
        event.preventDefault();
        console.log("state at submit", this.state)
        store.dispatch(createListing_dispatch(this.state));
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
                                label="What are you selling?"
                                className="md-cell md-cell--12"
                                required
                            />
                            <TextField
                                id="location"
                                label="Location?"
                                name="location"
                                className="location md-cell md-cell--1-phone md-cell--4"
                            />
                            <TextField
                                id="askingPrice"
                                label="Asking Price"
                                name="askingPrice"
                                type="number"
                                defaultValue="?"
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
                                rows={3}
                                className="md-cell md-cell--12"
                                required
                            />
                            <DatePicker
                                id="inline"
                                label="Post expiration date?"
                                name="expirationDate"
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
                                label="Housing Post Title?"
                                className="md-cell md-cell--12"
                                required
                            />
                            <TextField
                                id="applicationLocation"
                                label="Location?"
                                className="location md-cell md-cell--1-phone md-cell--4"
                                required
                            />
                            <TextField
                                id="askingPrice"
                                label="Price?"
                                className="price md-cell md-cell--1-phone md-cell--8"
                            />
                            <TextField
                                id="description"
                                label="Description"
                                rows={3}
                                className="md-cell md-cell--12"
                                required
                            />
                            <DatePicker
                                id="inline"
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
                                label="Post Title?"
                                className="md-cell md-cell--12"
                                required
                            />
                            <TextField
                                id="description"
                                label="Content"
                                rows={3}
                                className="md-cell md-cell--12"
                                required
                            />
                            <DatePicker
                                id="inline"
                                label="Post expiration date?"
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