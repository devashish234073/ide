import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-explorer',
  templateUrl: './project-explorer.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./project-explorer.component.css'],
})
export class ProjectExplorerComponent {
  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();

  onRightClick(event: MouseEvent, contextType: string): void {
    event.preventDefault();
    let obj = {menuPosition: { x: event.clientX, y: event.clientY }, contextType: contextType};
    this.notifyParent.emit(JSON.stringify(obj));
  }

  projectStructure = [
    {
      name: 'Project 1',
      type: 'folder',
      children: [
        { name: 'file1.txt', type: 'file' },
        { name: 'file2.java', type: 'file' },
      ],
      open: false
    },
    {
      name: 'Project 2',
      type: 'folder',
      children: [
        { name: 'index.html', type: 'file' },
        { name: 'app.js', type: 'file' },
        { name: 'style.css', type: 'file' },
      ],
      open: false
    },
  ];

  toggleFolder(folder: any) {
    folder.open = !folder.open;
  }
}
