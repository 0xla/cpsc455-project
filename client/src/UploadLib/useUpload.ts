import { ChangeEvent, useCallback, useState } from "react";
import Fetch, { FetchOption } from "./Fetch";


export interface UseUploadOptions extends FetchOption {
    maxUploadFileAmount?: number;
    overMaxUploadFileMessage: string;
    onSetFiles?: (fileList: FileList)=> any;}



const useUpload =(options:UseUploadOptions) =>{
    const {
        maxUploadFileAmount = Infinity,
        overMaxUploadFileMessage,
        onSetFiles
    } =options;
    const [fileList,setFiles]=useState<FileList| null>(null);

    const handlePushFileList = useCallback((_files:FileList)=> {
        setFiles((files)=>{
            if(!files) {
                return _files;
            } else {
                return [...files,..._files] as any;
            }
        });
    },[]);


    const handleAddFiles =useCallback(
        (_files:FileList) =>{
            const fileListAmount = fileList ? fileList.length:0;
            const isOverUploadLimite =
            _files.length + fileListAmount > maxUploadFileAmount;

            if (isOverUploadLimite) {
                window.alert(overMaxUploadFileMessage);
                onSetFiles && onSetFiles(_files);
            }
        },
        [
            fileList,
            handlePushFileList,
            maxUploadFileAmount,
            onSetFiles,
            overMaxUploadFileMessage

        ]
    );

    const handleChangeFiles= useCallback(
        (e: ChangeEvent<HTMLInputElement>) =>{
            const {files} =e.target;
            if (files){
                handleAddFiles(files);
            }

        },[handleAddFiles]
    );


    const handleUpload = useCallback (
        (request: RequestInit) =>
        Fetch({
            ...options,
            request
        }),
        [options]
    );

    return {
        fileList,setFiles,
        handleAddFiles,
        handleChangeFiles,
        handleUpload
    }




};
export default useUpload;