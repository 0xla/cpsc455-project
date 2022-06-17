import { UseUploadOptions } from "./useUpload";



export interface UseUploadAndPreviewFilesOptions
extends Omit<UseUploadOptions,"request"|"overMaxUploadFileMessage"> {
    maxUploadFileAmount?:number;
}


const useUploadAndPreviewFiles = (options: UseUploadAndPreviewFilesOptions) => {
    const { maxUploadFileAmount} = options;
    const{
        previewFileList,
        setPreviewFiles,
        handleAddFiles
    } = usePreviewImages();
    
    
    } 