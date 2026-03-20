import { FileMimeType } from '@application/base';

export class FileHelper {
  // See: https://mimetype.io/all-types
  // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  public static MIME_TYPE_MAP: Record<string, FileMimeType> = {
    // Image
    'image/jpeg': FileMimeType.IMAGE,
    'image/png': FileMimeType.IMAGE,
    'image/gif': FileMimeType.IMAGE,
    'image/webp': FileMimeType.IMAGE,
    'image/svg+xml': FileMimeType.IMAGE,
    'image/tiff': FileMimeType.IMAGE,
    'image/bmp': FileMimeType.IMAGE,
    'image/x-icon': FileMimeType.IMAGE,
    'image/vnd.microsoft.icon': FileMimeType.IMAGE,
    'image/heic': FileMimeType.IMAGE,

    // Video
    'video/mp4': FileMimeType.VIDEO,
    'video/webm': FileMimeType.VIDEO,
    'video/ogg': FileMimeType.VIDEO,
    'video/x-msvideo': FileMimeType.VIDEO,
    'video/quicktime': FileMimeType.VIDEO,
    'video/x-flv': FileMimeType.VIDEO,

    // Audio
    'audio/mpeg': FileMimeType.AUDIO,
    'audio/wav': FileMimeType.AUDIO,
    'audio/ogg': FileMimeType.AUDIO,
    'audio/flac': FileMimeType.AUDIO,
    'audio/aac': FileMimeType.AUDIO,
    'audio/x-wav': FileMimeType.AUDIO,
    'audio/webm': FileMimeType.AUDIO,

    // Documents
    'application/pdf': FileMimeType.DOCUMENT,
    'application/msword': FileMimeType.DOCUMENT,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FileMimeType.DOCUMENT,
    'application/vnd.ms-excel': FileMimeType.DOCUMENT,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FileMimeType.DOCUMENT,
    'application/vnd.ms-powerpoint': FileMimeType.DOCUMENT,
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': FileMimeType.DOCUMENT,
    'text/plain': FileMimeType.TEXT,
    'text/csv': FileMimeType.TEXT,
    'application/rtf': FileMimeType.DOCUMENT,

    // Archives
    'application/zip': FileMimeType.ARCHIVE,
    'application/vnd.rar': FileMimeType.ARCHIVE,
    'application/x-tar': FileMimeType.ARCHIVE,
    'application/gzip': FileMimeType.ARCHIVE,
    'application/x-7z-compressed': FileMimeType.ARCHIVE,
    'application/x-bzip2': FileMimeType.ARCHIVE,

    // Fonts
    'font/ttf': FileMimeType.FONT,
    'font/woff': FileMimeType.FONT,
    'font/woff2': FileMimeType.FONT,
    'application/font-woff': FileMimeType.FONT,

    // 3D Models
    'model/gltf-binary': FileMimeType.MODEL,
    'model/gltf+json': FileMimeType.MODEL,

    // G-Code
    'application/gcode': FileMimeType.G_CODE,

    '': FileMimeType.OTHER,
  };

  /**
   * Retrieves the file type based on the provided MIME type.
   *
   * @param mimeType - The MIME type of the file.
   * @returns The corresponding file type from the MIME type map, or `FileMimeType.OTHER` if the MIME type is not found.
   */
  public static getFileTypeFromMimeType(mimeType: string): FileMimeType {
    return this.MIME_TYPE_MAP[mimeType] || FileMimeType.OTHER;
  }

  /**
   * Retrieves the file extension from a given file name.
   *
   * @param fileName - The name of the file from which to extract the extension.
   * @returns The file extension as a string. If the file name does not contain an extension, an empty string is returned.
   */
  public static getFileExtension(fileName: string): string {
    return fileName.split('.').pop() || '';
  }

  /**
   * Returns the icon filename corresponding to the given file extension.
   *
   * @param value - The file extension for which to get the icon.
   * @returns The filename of the icon corresponding to the given file extension.
   *          If the extension is not recognized, an empty string is returned.
   *
   * @example
   * ```typescript
   * const icon = FileHelper.getIconForExtension('pdf');
   * console.log(icon); // Outputs: 'pdf.png'
   * ```
   */
  public static getIconForExtension(value: string): string {
    const extension = this.getFileExtension(value).toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'pdf.png';
      case 'ppt':
        return 'ppt.png';
      case 'doc':
      case 'docx':
        return 'doc.png';
      case 'xls':
      case 'xlsx':
        return 'excel.png';
      case 'txt':
        return 'txt.png';
      case 'svg':
        return 'svg.png';
      case 'wav':
      case 'mp3':
        return 'audio.png';
      case 'mp4':
      case 'webm':
      case 'ogg':
        return 'video.png';
      case 'zip':
      case 'rar':
      case 'tar':
      case 'gz':
        return 'archive.png';
      case 'ttf':
      case 'woff':
      case 'woff2':
        return 'font.png';
      case 'sql':
        return 'sql.png';
      default:
        return 'file.png';
    }
  }
}
