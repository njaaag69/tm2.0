import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Upload, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

export function MaintenanceRequest() {
  const [request, setRequest] = useState({
    title: '',
    description: '',
    priority: 'medium',
    images: [],
    category: '',
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setRequest(prev => ({
        ...prev,
        images: [
          ...prev.images,
          ...acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          }))
        ]
      }));
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement submission logic
    console.log('Submitting maintenance request:', request);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Issue Title
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={request.title}
            onChange={(e) => setRequest({ ...request, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={request.category}
            onChange={(e) => setRequest({ ...request, category: e.target.value })}
          >
            <option value="">Select a category</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="hvac">HVAC</option>
            <option value="appliance">Appliance</option>
            <option value="structural">Structural</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={request.description}
            onChange={(e) => setRequest({ ...request, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {['low', 'medium', 'high'].map((priority) => (
              <button
                key={priority}
                type="button"
                className={`
                  flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium
                  ${request.priority === priority
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 bg-white text-gray-700'
                  }
                `}
                onClick={() => setRequest({ ...request, priority })}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                {priority === 'high' && <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload Images
          </label>
          <div
            {...getRootProps()}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
          >
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <input {...getInputProps()} />
                <p className="pl-1">Drag and drop images or click to select files</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB each</p>
            </div>
          </div>
          {request.images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {request.images.map((file) => (
                <div key={file.name} className="relative">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="h-24 w-full object-cover rounded-md"
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                    onClick={() => {
                      setRequest(prev => ({
                        ...prev,
                        images: prev.images.filter(f => f !== file)
                      }));
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}