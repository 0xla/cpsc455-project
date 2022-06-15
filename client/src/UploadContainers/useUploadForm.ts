import { MAX_UPLOAD_IMAGE_AMOUNTS, UPLOAD_URI } from "../config";
import useDragDropFiles from "../UploadLib/useDragDropFiles";


const uploadSuccess = (e: any) => {
    window.alert("Upload Success!");
};
const uploadFailed = (e: any) => {
    window.alert("Upload failed: ${e.message}");
};

const useUploadForm = () => {
    const uploadAndPreviewFilesState = useUploadAndPreviewFiles({
        uploadApiUrl: UPLOAD_URI,
        maxUploadFileAmount: MAX_UPLOAD_IMAGE_AMOUNTS,
        uploadSuccess,
        uploadFailed
    });

    const dragDropFilesState= useDragDropFiles({
        //onSetDropFils: uploadAndPreviewFilesState.handleAddFiles
    });

    return {
        //...uploadAndPreviewFilesState,
        //...dragDropFilesState
    };
};

export default useUploadForm;