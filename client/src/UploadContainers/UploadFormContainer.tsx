import UploadForm from "../components/UploadForm";
import useUploadForm from "./useUploadForm"

const UploadFormContainer = () => {
    const state = useUploadForm();

    // return(
    //     <UploadForm
    //     {...state}
    //     onChangeFiles = {state.handleChangeFiles}
    //     onSubmit = {state.handleSubmit}
    //     >
    //         <PreviewPart previewImageList={state.previewFilesLists}/>
                        
    //     </UploadForm>
    // );
};
export default UploadFormContainer;