import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() notifyProjectOpen: EventEmitter<any> = new EventEmitter<any>();
  folderSelectorOpen = false;

  projects = ["No recent projects"];

  constructor(private apiCallService:ApiCallService) {
    this.populateProjects();
  }

  async importProject(projectName:string) {
    console.log("project to import",projectName);
    if(!projectName || projectName == "No recent projects") {
      return;
    }
    console.log("projectName",projectName);
    let projectDetails:any = await this.apiCallService.makeGetCall("/api/getProject/"+projectName);
    if(!projectDetails.error) {
      console.log("projectDetails",projectDetails);
      const processedStructure = this.processProjectStructure(projectName,projectDetails.structure);
      console.log("processedStructure", processedStructure);
      this.notifyProjectOpen.emit({"projectName":projectName,"structure":processedStructure});
    }
  }

  processProjectStructure(projectName:string, structure: any) {
    function processNode(pwd:string, node: any):any {

      return Object.keys(node).map(key => {
        if(node[key]=="file") {
          return { name: key, type: 'file', pwd: pwd };
        }
        return {
          name: key,
          type: 'folder',
          children: processNode(pwd+"/"+key,node[key])
        };
      });
    }

    return processNode(projectName, structure);
  }

  async populateProjects() {
    let resp:any = await this.apiCallService.makeGetCall("/api/listProjects");
    if(!resp.error) {
      console.log("resp",resp);
      this.projects = [];
      for(let i=0;i<resp.projects.length;i++) {
        let projectName = resp.projects[i];
        this.projects.push(projectName);
      }
    }
  }

  toggleFolderSelection() {
    this.folderSelectorOpen = !this.folderSelectorOpen;
  }
}
