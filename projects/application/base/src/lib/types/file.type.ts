/**
 * Enum representing various file MIME types.
 *
 * @enum {string}
 * @property {string} IMAGE - Represents image files.
 * @property {string} VIDEO - Represents video files.
 * @property {string} AUDIO - Represents audio files.
 * @property {string} DOCUMENT - Represents document files.
 * @property {string} ARCHIVE - Represents archive files.
 * @property {string} FONT - Represents font files.
 * @property {string} G_CODE - Represents G-code files.
 * @property {string} MODEL - Represents model files.
 * @property {string} TEXT - Represents text files.
 * @property {string} OTHER - Represents other types of files.
 */
export enum FileMimeType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  ARCHIVE = 'archive',
  FONT = 'font',
  G_CODE = 'gcode',
  MODEL = 'model',
  TEXT = 'text',
  OTHER = 'other',
}
/**
 * Enum representing different upload types.
 *
 * @enum {number}
 * @property {number} UPLOAD_FILE - Uploads an image or other files without updating the user's avatar.
 * @property {number} UPLOAD_AVATAR - Uploads an avatar and updates the user's contact picture.
 */
export enum UploadType {
  UPLOAD_FILE = 0, // Uploads an image or other files without updating the user's avatar
  UPLOAD_AVATAR = 1, // Uploads an avatar and updates the user's contact picture
}
