const express = require('express');
const router = express.Router();
const classModel = require('../models/classModel');
const vectorService = require('../services/vectorService');

router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    const classes = await classModel.getAllClasses(userId);
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
    
    if (deletedClass.user_id) {
      // Background deletion of Pinecone vectors for this user
      vectorService.deleteUserClassEmbeddings(deletedClass.class_code, deletedClass.user_id)
        .catch(err => console.warn(`[ClassRoute] ⚠️ Failed to delete Pinecone embeddings for class ${deletedClass.class_code}:`, err.message));
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
