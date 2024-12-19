import { Component } from '@angular/core';
import { FolderSelectorComponent } from '../folder-selector/folder-selector.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  imports: [FolderSelectorComponent, CommonModule],
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent {
  folderSelectorOpen = false;

  projects = ["No recent projects"];

  toggleFolderSelection() {
    this.folderSelectorOpen = !this.folderSelectorOpen;
  }
}
