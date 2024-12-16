import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  imports:[FormsModule,CommonModule],
  styleUrls: ['./context-menu.component.css'],
})
export class ContextMenuComponent implements OnInit  {
  menuItems: string[] = []; // Menu items to display
  @Input() menuPosition = "{ x: 0, y: 0 };" // Position of the menu
  position = {x:0,y:0};

  ngOnInit() {
    this.position = JSON.parse(this.menuPosition);
    console.log(this.position);
  }

  // Get menu items based on context
  private getMenuItemsForContext(contextType: string): string[] {
    switch (contextType) {
      case 'button1':
        return ['Build Path', 'Project Properties'];
      case 'textbox1':
        return ['Rename', 'Copy', 'Paste'];
      default:
        return ['Default Option'];
    }
  }
}
