/* ROUTES FOR PATH '/api/networks' BELOW */

const express = require('express');
const router = require('express').Router();
const model = require('../db');
const db = model.db;
const Listing = model.Listing;
const User = model.User;


// a route for GET: /api/networks/${networkId} to return a network