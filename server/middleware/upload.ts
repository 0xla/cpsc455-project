import util from "util";
import Multer from "multer";

const maxSize = 3840 * 2160;

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");
let processFileMiddleware = util.promisify(processFile);

export default processFileMiddleware;
