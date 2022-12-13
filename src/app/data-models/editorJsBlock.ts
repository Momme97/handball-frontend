export interface EditorJsContentBlock {
    id: number;
    type: string;
    data: EditorJSTextData | EditorJSListData | EditorJSImageData | EditorJsTableData| undefined;
}
  
export interface EditorJSTextData {
    text: string;
}

export interface EditorJSListData {
    itens: string[];
}

export interface EditorJSImageData {
    caption?: string;
    stretched: boolean;
    file: string;
}

export interface EditorJsTableData {
    content: string[][];
}