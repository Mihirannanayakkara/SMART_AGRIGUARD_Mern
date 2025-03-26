import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Article from '../Models/Article.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|mp4|webm|ogg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images (jpeg, jpg, png, gif) and Videos (mp4, webm, ogg) Only!'));
    }
  }
});

// Helper function to delete old files
const deleteOldFiles = (oldImage, oldVideo) => {
  if (oldImage) fs.unlink(oldImage, err => {if (err) console.error('Error deleting old image:', err)});
  if (oldVideo) fs.unlink(oldVideo, err => {if (err) console.error('Error deleting old video:', err)});
};

// POST route to create a new article
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    try {
      const { title, content, link } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
  
      // Check if an article with the same title already exists
      let existingArticle = await Article.findOne({ title: title });
  
      if (existingArticle) {
        // If the article exists, update it instead of creating a new one
        const oldImage = existingArticle.image;
        const oldVideo = existingArticle.video;

        existingArticle.content = content;
        existingArticle.link = link;
        if (req.files['image']) {
          existingArticle.image = req.files['image'][0].path;
        }
        if (req.files['video']) {
          existingArticle.video = req.files['video'][0].path;
        }
  
        await existingArticle.save();
        deleteOldFiles(oldImage, oldVideo);
        return res.status(200).json({ message: 'Article updated', article: existingArticle });
      }
  
      // If the article doesn't exist, create a new one
      const newArticle = new Article({
        title,
        content,
        link,
        image: req.files['image'] ? req.files['image'][0].path : null,
        video: req.files['video'] ? req.files['video'][0].path : null,
      });
  
      await newArticle.save();
      res.status(201).json({ message: 'Article created', article: newArticle });
    } catch (error) {
      console.error('Error saving article:', error);
      res.status(500).json({ message: 'Error saving article', error: error.message });
    }
});

// GET route to fetch all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// Update an article
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
  
      const updatedArticle = await Article.findByIdAndUpdate(
        id,
        { title, content, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
  
      if (!updatedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.json(updatedArticle);
    } catch (error) {
      console.error('Error updating article:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });



// DELETE route to delete an article
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    deleteOldFiles(article.image, article.video);
    await Article.deleteOne({ _id: req.params.id });
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;