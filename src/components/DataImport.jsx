import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import * as XLSX from 'xlsx'
import toast from 'react-hot-toast'

export function DataImport({ onImport, template }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet)
          
          onImport(jsonData)
          toast.success('Data imported successfully')
        } catch (error) {
          toast.error('Error processing file')
        }
      }
      
      reader.readAsArrayBuffer(file)
    } catch (error) {
      toast.error('Error reading file')
    }
  }, [onImport])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxFiles: 1
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
            : 'border-gray-300 dark:border-gray-700'
          }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {isDragActive
            ? 'Drop the Excel file here'
            : 'Drag and drop an Excel file here, or click to select'}
        </p>
      </div>

      {template && (
        <div className="text-center">
          <a
            href={template}
            download
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Download import template
          </a>
        </div>
      )}
    </div>
  )
}