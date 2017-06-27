import React, { Component } from 'react';
import { Link } from 'react-router';
import Radio from 'react-md/lib/SelectionControls/Radio';
import TextField from 'react-md/lib/TextFields';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

export default class CreateListing extends Component {
    constructor(props){
        super(props);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
                        category: 'for sale',
                        name: '',
                        description: '',
                        floorPrice: 0,
                        askingPrice: null
                    };
    }

    handleCategoryChange(e) {
        this.setState({ category: e.target.value });
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        const category = this.state.category;
        return (
            <div>
                <fieldset onChange={this.handleCategoryChange}>
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
                        <form className="md-grid">
                            <TextField
                                id="Title"
                                label="What are you selling?"
                                className="md-cell md-cell--12"
                                required
                            />
                            <TextField
                                id="applicationLocation"
                                label="Location?"
                                className="location md-cell md-cell--1-phone md-cell--4"
                            />
                            <TextField
                                id="askingPrice"
                                label="Asking Price"
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
                                />
                        </form>
                    </div>
                    : null}
                { category === 'housing' ?
                    <div className="create-housing">
                        <form className="md-grid">
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
                                />
                        </form> 
                    </div>
                    : null}
                { category === 'community' ?
                    <div className="create-community">
                        <form className="md-grid">
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
                                inline
                                className="md-cell date-picker"
                                required
                                />
                        </form> 
                    </div>
                : null}
            </div>
            )
    }
}