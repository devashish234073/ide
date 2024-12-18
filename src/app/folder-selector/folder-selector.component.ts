import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

declare const window: any; // For Electron integration (optional)

@Component({
  selector: 'app-folder-selector',
  templateUrl: './folder-selector.component.html',
  imports:[CommonModule],
  styleUrls: ['./folder-selector.component.css'],
})
export class FolderSelectorComponent {
  folderPath: string | null = null;

  constructor(private http: HttpClient) { }

  selectFolder() {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true; // Allow folder selection
    input.multiple = true; // Optional: Allow multiple folder selections
    input.addEventListener('change', (event: any) => {
      const files = event.target.files;
      if (files.length > 0) {
        const folderPath = files[0].webkitRelativePath.split('/')[0]; // Extract root folder name
        this.folderPath = folderPath;
        console.log('Selected Folder:', folderPath);
  
        // Optional: List all selected files
        const fileList = Array.from(files as FileList).map((file: File) => (file as any).webkitRelativePath);
        console.log('Files:', fileList);
      }
    });
    input.click(); // Trigger the file picker
  }
  
  /*selectFolder() {
    if (window && window.electron) {
      // Electron integration to select folder
      window.electron.selectFolder().then((path: string) => {
        this.folderPath = path;
      });
    } else {
      alert('Folder selection is only supported in Electron.');
    }
  }*/

  sendToBackend() {
    if (this.folderPath) {
      this.http
        .post('http://localhost:3000/api/folder', { path: this.folderPath })
        .subscribe({
          next: (response) => {
            console.log('Folder structure:', response);
          },
          error: (error) => {
            console.error('Error sending folder to backend:', error);
          },
        });
    }
  }
}
