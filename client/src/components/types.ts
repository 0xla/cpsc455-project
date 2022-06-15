import { ReactNode, ReactNodeArray } from "react";
import { ImagePreviewFile } from "../UploadLib/types";
import { DragDropFileBoxProps } from "./DragDropFileBox";

export interface PreviewPartProps {
    previewImageList: ImagePreviewFile[];
  }

  export interface UploadFormProps extends DragDropFileBoxProps {
    
  }