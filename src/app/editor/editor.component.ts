import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit,OnChanges {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Input() file: any = "";

  private editorInstance: any;
  private languageMap:any = {
    "java":"java",
    "py":"python",
    "js":"javascript",
    "html":"html",
    "txt":"plain",
    "css":"css"
  };
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

    this.editorInstance = (window as any).monaco.editor.create(container, {
      value: "// Start coding here...\n",
      language: 'java',
      theme: 'vs-dark',
    });
  }

  getFileExtension(filename:String) {
    const lastDotIndex = filename.lastIndexOf('.');
    return lastDotIndex !== -1 ? filename.substring(lastDotIndex + 1) : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['file'] && changes['file'].currentValue) {
      try {
        const newValue = this.file.content;
        const fileName = this.file.name;
        this.updateEditorContent(newValue, fileName);
      } catch (error) {
        console.error('Failed to parse content:', error);
      }
    }
  }

  updateEditorContent(newValue: string, fileName: string) {
    let ext = this.getFileExtension(fileName);
    let newLanguage = this.languageMap[ext]?this.languageMap[ext]:"java";
    if (this.editorInstance) {
      // Update the editor value
      this.editorInstance.setValue(newValue);

      // Update the editor language
      const monaco = (window as any).monaco;
      monaco.editor.setModelLanguage(this.editorInstance.getModel(), newLanguage);
    } else {
      console.error('Editor instance is not initialized.');
    }
  }
}
