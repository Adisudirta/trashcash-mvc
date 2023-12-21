import multer from "multer";

const inMemoryStorage = multer.memoryStorage();

const upload = multer({ storage: inMemoryStorage });

export default upload;
