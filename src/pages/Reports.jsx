import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FileText, Download } from 'lucide-react'
import { format } from 'date-fns'

export function Reports() {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'))
  const [selectedProperty, setSelectedProperty] = useState('')
  
  const properties = useSelector((state) => state.properties.properties)
  const tenants = useSelector((state) => state.tenants.tenants)

  const generateReport = () => {
    // TODO: Implement report generation
    console.log('Generating report for:', selectedMonth, selectedProperty)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Reports
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Month
            </label>
            <input
              type="month"
              className="input"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Property
            </label>
            <select
              className="input"
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
            >
              <option value="">All Properties</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={generateReport}
              className="btn w-full"
            >
              <FileText className="h-5 w-5 mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Reports
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Monthly Statement - March 2024
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Generated on {format(new Date(), 'PP')}
                  </p>
                </div>
              </div>
              <button className="text-primary-600 hover:text-primary-900">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}