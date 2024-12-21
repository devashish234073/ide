import { Component } from '@angular/core';
import { FolderSelectorComponent } from '../folder-selector/folder-selector.component';
import { CommonModule } from '@angular/common';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  imports: [FolderSelectorComponent, CommonModule],
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent {
  folderSelectorOpen = false;

  projects = ["No recent projects"];

  constructor(private apiCallService:ApiCallService) {
    this.apiCallService.makePostCall("http://localhost:3000/api",{"hello":"why hello"}).then(resp=>console.log(resp));
    this.apiCallService.makeGetCall("http://localhost:3000/api/listProjects").then(resp=>console.log(resp));
  }

  toggleFolderSelection() {
    this.folderSelectorOpen = !this.folderSelectorOpen;
  }
}
