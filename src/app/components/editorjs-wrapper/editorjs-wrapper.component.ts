import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { EditorJsContentBlock } from 'src/app/data-models/editorJsBlock';

@Component({
  selector: 'app-editorjs-wrapper',
  templateUrl: './editorjs-wrapper.component.html',
  styleUrls: ['./editorjs-wrapper.component.scss']
})
export class EditorjsWrapperComponent implements OnChanges {
  @Input() jsonInput: any;
  contentItems: EditorJsContentBlock [] = [];

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
      console.log(this.jsonInput.blocks);
      console.log(this.contentItems);

    }

  }

  buildContentData(data: any, type: string){
    if(type === 'paragraph' || type === 'header'){
      return data.text;
    }
    console.log(type);

    console.log(data);
    return undefined;
  }

}
