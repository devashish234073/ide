import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-explorer',
  templateUrl: './project-explorer.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./project-explorer.component.css'],
})
export class ProjectExplorerComponent implements OnInit {
  
  @Output() notifyRightClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyFileOpen: EventEmitter<any> = new EventEmitter<any>();

  projectStructure:any[] = [];

  ngOnInit(): void {
    this.addDummyProjects();
  }
  addDummyProjects() {
    this.addProject({
      name: 'Project 1',
      type: 'folder',
      children: [
        { name: 'src', type: 'folder' , children: [
          { name: 'main', type: 'folder' , children: [
            { name: 'java', type: 'folder' , children: [
              { name: 'com', type: 'folder' , children: [
                { name: 'hello', type: 'folder' , children: [
                  { name: 'Main.java', type: 'file' , content: `
package com.hello;

  public class Main {
    public static void main(String[] args) {
    System.out.println("Hello");
  }
}
                    `}
                ]}
              ]}
            ]}
          ]}
        ]}
      ],
      open: false
    });
    this.addProject({
      name: 'Project 2',
      type: 'folder',
      children: [
        { name: "src", type: "folder", children: [
          { name: 'index.html', type: 'file' },
          { name: 'app.js', type: 'file' },
          { name: 'style.css', type: 'file' }
        ]}
      ],
      open: false
    });
  }

  addProject(project:any) {
    this.projectStructure.push(project);
  }

  fileOpen(file:any) {
    console.log("file clicked",file);
    this.notifyFileOpen.emit(file);
  }

  onRightClick(event: MouseEvent, contextType: string): void {
    let obj = {menuPosition: { x: event.clientX, y: event.clientY }, contextType: contextType};
    this.notifyRightClick.emit(obj);
  }

  toggleFolder(folder: any) {
    folder.open = !folder.open;
  }
}
