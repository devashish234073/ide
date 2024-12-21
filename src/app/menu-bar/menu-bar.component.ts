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
    this.pupulateProjects();
  }

  async pupulateProjects() {
    let resp:any = await this.apiCallService.makeGetCall("/api/listProjects");
    if(!resp.error) {
      console.log("resp",resp);
      for(let i=0;i<resp.projects.length;i++) {
        let projectName = resp.projects[i];
        console.log("projectName",projectName);
        let projectDetails:any = await this.apiCallService.makeGetCall("/api/getProject/"+projectName);
        if(!projectDetails.error) {
          console.log("projectDetails",projectDetails);
        }
      }
    }
  }

  toggleFolderSelection() {
    this.folderSelectorOpen = !this.folderSelectorOpen;
  }
}
