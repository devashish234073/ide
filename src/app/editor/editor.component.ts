import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;

  ngOnInit() {
    this.loadMonacoEditor();
  }

  loadMonacoEditor() {
    // Check if Monaco is already loaded
    if ((window as any).monaco) {
      this.initializeMonacoEditor();
      return;
    }

    // Load Monaco Editor dynamically
    const script = document.createElement('script');
    script.src = "https://unpkg.com/monaco-editor@latest/min/vs/loader.js";
    script.onload = () => {
      (window as any).require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@latest/min/vs' } });
      (window as any).require(['vs/editor/editor.main'], () => {
        this.initializeMonacoEditor();
      });
    };
    document.body.appendChild(script);
  }

  initializeMonacoEditor() {
    const container = this.editorContainer.nativeElement;

    (window as any).monaco.editor.create(container, {
      value: "// Start coding here...\n",
      language: 'java',
      theme: 'vs-dark',
    });
  }
}
