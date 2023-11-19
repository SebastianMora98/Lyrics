import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { CoverFile } from '../models/CoverFile';

@Injectable({
  providedIn: 'root',
})
export class UploadCoverService {
  selectedFile: File | undefined;

  filesBase64: BehaviorSubject<CoverFile[]> = new BehaviorSubject<CoverFile[]>(
    []
  );

  constructor() {
    this.loadCoverFilesFromLocalStorage();
  }

  get filesBase64$() {
    return this.filesBase64.asObservable();
  }

  get filesBase64Value() {
    return this.filesBase64.getValue();
  }

  async addFileColver(file: File) {
    this.fileToBase64(file)
      .then((result) => {
        const newCoverFile: CoverFile = {
          name: file.name,
          id: crypto.randomUUID(),
          base64: result as string,
          selected: false,
        };
        this.filesBase64Value.push(newCoverFile);
        this.filesBase64.next(this.filesBase64Value);
        this.updateCoverFilesLocalStorage();
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        console.log('done');
      });
  }

  removeFile(id: string) {
    const newCoverFile = this.filesBase64Value.filter((file) => file.id !== id);
    this.filesBase64.next(newCoverFile);
    this.updateCoverFilesLocalStorage();
  }

  updateCoverFilesLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage?.setItem('files', JSON.stringify(this.filesBase64Value));
    }
  }

  loadCoverFilesFromLocalStorage() {
    const files = localStorage?.getItem('files');
    if (files) {
      this.filesBase64.next(JSON.parse(files));
    }
  }

  setCoverFileSelected(id: string) {
    const newCoverFile = this.filesBase64Value.map((file) => {
      if (file.id === id) {
        file.selected = true;
      } else {
        file.selected = false;
      }
      return file;
    });
    this.filesBase64.next(newCoverFile);
  }

  fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // Resolve the promise with the result
      reader.onerror = (error) => reject(error); // Reject the promise with the error
    });
  }
}
