const express = require('express');
const router = express.Router();
const classModel = require('../models/classModel');

router.get('/', async (req, res, next) => {
  try {
    const classes = await classModel.getAllClasses();
    res.json(classes);
  } catch (error) { next(error); }
});

router.get('/:code', async (req, res, next) => {
  try {
    const classData = await classModel.getClassByCode(req.params.code);
    res.json(classData);
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const newClass = await classModel.createClass(req.body);
    res.json(newClass);
  } catch (error) { next(error); }
});

router.delete('/:code', async (req, res, next) => {
  try {
    const deletedClass = await classModel.deleteClass(req.params.code);
    if (!deletedClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.json({ message: "Successfully deleted class and all associated data.", class: deletedClass });
  } catch (error) { next(error); }
});

router.delete('/', async (req, res, next) => {
  try {
    await classModel.deleteAllClasses();
    res.json({ message: "Successfully deleted all classes and topics." });
  } catch (error) { next(error); }
});

module.exports = router;
