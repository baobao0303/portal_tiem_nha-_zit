import { InputSignal } from '@angular/core';
import { FileBO } from '@application/messages';

/**
 * Abstract class representing a file message.
 *
 * @abstract
 */
export abstract class AbstractFileMessage {
  /**
   * The file object.
   *
   * @abstract
   * @type {InputSignal<FileBO>}
   */
  public abstract readonly file: InputSignal<FileBO>;

  /**
   * Retrieves the file path.
   *
   * @returns {string} The path of the file.
   */
  public getFilePath(): string {
    return this.file().path;
  }

  /**
   * Retrieves the file name.
   *
   * @returns {string} The name of the file.
   */
  public getFileName(): string {
    return this.file().name;
  }

  /**
   * Retrieves the file size.
   *
   * @returns {number} The size of the file in bytes.
   */
  public getFileSize(): number {
    return this.file().size;
  }

  /**
   * Retrieves the MIME type of the file.
   *
   * @returns {string} The MIME type of the file.
   */
  public getMimeType(): string {
    return this.file().mimeType;
  }

  /**
   * Retrieves the file extension.
   *
   * @returns {string} The extension of the file.
   */
  public getFileExtension(): string {
    return this.file().extension;
  }

  /**
   * Retrieves the download link for the file.
   *
   * @returns {string} The download link of the file.
   */
  public getDownloadLink(): string {
    return this.file().downloadLink;
  }
}
