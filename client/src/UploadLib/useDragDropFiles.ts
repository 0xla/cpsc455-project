import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export interface UseDragDropFiles {
    onSetDropFiles?: (files: FileList) => void;
  }

  


  const useDragDropFiles = ({ onSetDropFiles }: UseDragDropFiles) => {
    const dropElRef=useRef<HTMLElement>(null);
    const dragCounter =useRef(0);
    //isDragging is forchecking if there are files in the drag set
    const [isDragging, setDrag]= useState(false);
    
    const handleDragIn = useCallback((e: DragEvent)=> {
      stopEventDefault(e);
      dragCounter.current++;
      const isDragIn = checkIsDragIn(e);
      if (isDragIn) {
        setDrag(true);
      }
    },[]);

    const handleDragOut= useCallback((e: DragEvent)=> {
      stopEventDefault(e);
      dragCounter.current--;
      is (dragCounter.current ===0) {
        setDrag(false);
      }
    },[]);

    const handleDrop= useCallback(
      (e:DragEvent)=>{
        stopEventDefault(e);
        setDrag(false);
        const isDragIn = checkIsDragIn(e);
        if (isDragIn && e.dataTransfer){
          onSetDropFiles && onSetDropFiles(e.dataTransfer.files);
          e.dataTransfer?.clearData();
          dragCounter.current = 0;
        }
      },
      [onSetDropFiles]
    );

    const handleDrag=useCallback((e:DragEvent) =>{
      stopEventDefault(e);
    },[]);


    //
    useEffect(()=>{
      if (dropElRef.current) {
        const el = window;
        el.addEventListener("dragenter", handleDragIn);
        el.addEventListener("dragleave",handleDragOut);
        el.addEventListener("dragover",handleDrag);
        el.addEventListener("drop",handleDrop);

        // clear events
        return ()=> {
          el.removeEventListener("dragenter",handleDragIn);
          el.removeEventListener("dragleave",handleDragOut);
          el.removeEventListener("dragover",handleDrag);
          el.removeEventListener("drop",handleDrop);
        };

      }
    },[handleDrag,handleDragIn,handleDragOut,handleDrop]);

    return {
      dropElRef,
      isDragging
    };
    
    };

  export default useDragDropFiles;

const stopEventDefault=(e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  //throw new Error("Function not implemented.");
}

const checkIsDragIn = (e: DragEvent) =>
  e.dataTransfer && e.dataTransfer.items.length > 0;
