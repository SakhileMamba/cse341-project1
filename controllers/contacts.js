const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const results = await mongodb.getDb().db().collection('contacts').find();
  results.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const results = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
  results.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(user);
  if (response.acknowledged === true) {
    res.send(response.insertedId);
  } else {
    res.status(500).json({
      message: response.error || 'Some error occurred while creating the contact.'
    });
  }
};

const updateContact = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: id }, user);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({
      message: response.error || 'Some error occurred while creating the contact.'
    });
  }
};

const deleteContact = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: id });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({
      message: response.error || 'Some error occurred while deleting the contact.'
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
