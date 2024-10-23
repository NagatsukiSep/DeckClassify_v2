'use client'

import React, { useState, useCallback, useRef } from 'react'
import { Upload, X, CheckCircle, FileChartPie } from 'lucide-react'
import { ExtractOption } from '../ExtractOption';

interface FileUploaderProps {
  handleSubmit: (columns: string[]) => void;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DeckUploader: React.FC<FileUploaderProps> = ({ handleSubmit, handleFileChange }) => {
  const [file, setFile] = useState<File>()
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);
  const [extractColumns, setExtractColumns] = useState<string[]>([]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }, [])

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFile(selectedFiles[0])
      handleFileChange?.(e)
    }
  }, [])

  const removeFile = () => {
    setFile(undefined)
    setIsSubmitting(false)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
          }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">ファイルをドラッグ&ドロップするか、クリックしてアップロード</p>
        <input
          type="file"
          onChange={onFileSelect}
          className="hidden"
          id="fileInput"
          ref={inputRef}
        />
        <label
          htmlFor="fileInput"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          ファイルを選択
        </label>
      </div>

      {file !== undefined && (
        <div className="mt-6">
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />

              <span className="text-sm font-medium text-gray-900">{file.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => removeFile()} className="text-red-500 hover:text-red-700">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <ExtractOption setExtractColumns={setExtractColumns} />

      {file !== undefined && (
        <div className="mt-6">
          <button
            onClick={() => { setIsSubmitting(true); handleSubmit(extractColumns) }}
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${!isSubmitting
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300`}
          >
            <FileChartPie className="h-5 w-5 mr-2" />
            {isSubmitting ? '分類中...' : '分類'}
          </button>
        </div>
      )}
    </div>
  )
}
