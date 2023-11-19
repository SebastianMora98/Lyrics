import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadCoverService } from './services/upload-cover.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoverFile } from './models/CoverFile';

@Component({
  selector: 'app-upload-cover',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload-cover.component.html',
  styleUrl: './upload-cover.component.scss',
})
export class UploadCoverComponent {
  fileForm: FormGroup;
  files: CoverFile[] = [];
  constructor(
    private fb: FormBuilder,
    protected uploadCoverService: UploadCoverService
  ) {
    this.uploadCoverService.filesBase64$.subscribe((files) => {
      this.files = files;
    });

    this.fileForm = this.fb.group({
      fileInput: [''], // Create a form control for the file input
    });
  }

  onFileSelected(event: Event) {
    const selectedFile = (event.target as HTMLInputElement).files?.[0];
    // Handle the selected file (e.g., store it in a variable)
    console.log('Selected file:', selectedFile);
    this.uploadCoverService.addFileColver(selectedFile as File);
  }
}
