import multer from 'multer';
import { createPost } from '../controllers/postController.js';

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Routes
app.use("/api/posts", upload.fields([{ name: 'img' }, { name: 'video' }]), postRoutes);
