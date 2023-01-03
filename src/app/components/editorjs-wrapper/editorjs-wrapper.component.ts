import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { EditorJsContentBlock } from 'src/app/data-models/editorJsBlock';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editorjs-wrapper',
  templateUrl: './editorjs-wrapper.component.html',
  styleUrls: ['./editorjs-wrapper.component.scss']
})
export class EditorjsWrapperComponent implements OnChanges {
  @Input() jsonInput: any;
  contentItems: any [] = [];
  strapiUrl: string = environment.strapiUrl

  constructor() { }

  
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.jsonInput) {
      for(let i = 0; i < this.jsonInput.blocks.length; i++) {
        this.contentItems.push({
          id: this.jsonInput.blocks[i].id,
          type: this.jsonInput.blocks[i].type,
          data: this.buildContentData(this.jsonInput.blocks[i].data, this.jsonInput.blocks[i].type)
        });
      }
    }

  }

  buildContentData(data: any, type: string){
    if(type === 'paragraph' || type === 'header'){
      return data.text;
    } 
    else if(type === 'table') {
      return data
    }
    else if(type === 'list') {
      return data.items
    }
    else if(type === 'image') {
      return data
    }
    else if(type === 'warning') {
      return data
    }
    else if(type === 'LinkTool'){
      return data
    }
  }

}
