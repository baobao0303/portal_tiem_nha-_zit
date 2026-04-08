import { propertyMapper } from '@core/base';

export class UploadFileExplorerRequest {
  @propertyMapper('file', File)
  public file: File = new File([], '');

  @propertyMapper('uploadType', Number)
  public uploadType: number = 0;

  constructor({ file, uploadType }: { file: File; uploadType: number }) {
    this.file = file;
    this.uploadType = uploadType;
  }
  public toFileData(): FormData {
    const fileData = new FormData();
    fileData.append('File', this.file);
    fileData.append('UploadType', this.uploadType!.toString());
    return fileData;
  }
}
