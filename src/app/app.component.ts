import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { EditorComponent } from './editor/editor.component';
import { ProjectExplorerComponent } from './project-explorer/project-explorer.component';
import { CommonModule } from '@angular/common';
import { FolderSelectorComponent } from './folder-selector/folder-selector.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MenuBarComponent, ContextMenuComponent, EditorComponent, ProjectExplorerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isContextMenuVisible = false;
  menuPosition = { x: 0, y: 0 };
  fileOpen:any;
  title = 'ide';

  handleRightClick(event:any) {
    this.menuPosition = event.menuPosition;
    this.isContextMenuVisible = !this.isContextMenuVisible;
  }

  handleFileOpen(event:any) {
    console.log("event received..",event);
    this.fileOpen = event;
  }

  getMenuPosition() {
    return JSON.stringify(this.menuPosition);
  }

  @HostListener('contextmenu')
  preventContextMenu() {
    return false;
  }
}
