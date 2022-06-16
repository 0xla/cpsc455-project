import { ChangeEvent, ReactNode, ReactNodeArray } from "react";
import { Callback, ImagePreviewFile } from "../UploadLib/types";
import { DragDropFileBoxProps } from "./DragDropFileBox";

export interface PreviewPartProps {
    previewImageList: ImagePreviewFile[];
  }

  export interface UploadFormProps extends DragDropFileBoxProps {
    isUploadAvailble?: boolean;
    children? : ReactNode | ReactNodeArray;
    onSubmit: Callback;
    onChangeFiles: (e:ChangeEvent<HTMLInputElement>) => any;    
  }