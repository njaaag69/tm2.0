import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Plus, Search, Edit, Trash2, FileText, Download } from 'lucide-react'
import { addProperty, deleteProperty } from '../store/slices/propertySlice'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

export function Properties() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'))
  const [showStatementModal, setShowStatementModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [newProperty, setNewProperty] = useState({
    name: '',
    address: '',
    units: '',
    landlordName: '',
    landlordPhone: '',
  })

  const dispatch = useDispatch()
  const properties = useSelector((state) => state.properties.properties)
  const tenants = useSelector((state) => state.tenants.tenants)

  // Auto-update balances on the 1st of each month
  useEffect(() => {
    const now = new Date()
    if (now.getDate() === 1) {
      // Update balances (BF → CD)
      // This would typically be handled by your backend
      console.log('Updating monthly balances...')
    }
  }, [])

  const handleAddProperty = (e) => {
    e.preventDefault()
    const property = {
      id: Date.now(),
      ...newProperty,
      units: parseInt(newProperty.units),
      occupiedUnits: 0,
    }
    dispatch(addProperty(property))
    setNewProperty({
      name: '',
      address: '',
      units: '',
      landlordName: '',
      landlordPhone: '',
    })
    setShowAddModal(false)
    toast.success('Property added successfully')
  }

  const handleDeleteProperty = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      dispatch(deleteProperty(id))
      toast.success('Property deleted successfully')
    }
  }

  const getPropertyTenants = (propertyId) => {
    return tenants
      .filter(tenant => tenant.propertyId === propertyId)
      .sort((a, b) => parseInt(a.unitNumber) - parseInt(b.unitNumber))
  }

  const generateStatement = (property) => {
    // In a real app, this would generate a PDF or Excel file
    const statement = {
      property,
      tenants: getPropertyTenants(property.id),
      month: selectedMonth,
      generatedAt: new Date().toISOString()
    }
    console.log('Generating statement:', statement)
    toast.success('Statement generated successfully')
    setShowStatementModal(false)
  }

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.landlordName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Properties
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Property
        </button>
      </div>

      <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search properties..."
          className="ml-2 flex-1 bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {property.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {property.address}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Landlord:</span> {property.landlordName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Phone:</span> {property.landlordPhone}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Units:</span> {property.occupiedUnits}/{property.units}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedProperty(property)
                      setShowStatementModal(true)
                    }}
                    className="text-primary-600 hover:text-primary-900"
                    title="Generate Statement"
                  >
                    <FileText className="h-5 w-5" />
                  </button>
                  <button
                    className="text-primary-600 hover:text-primary-900"
                    onClick={() => {/* TODO: Implement edit */}}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteProperty(property.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit #
                      </th>
                      <th className="px-3 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tenant
                      </th>
                      <th className="px-3 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-3 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        House Type
                      </th>
                      <th className="px-3 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deposit Receipt
                      </th>
                      <th className="px-3 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rent Amount
                      </th>
                      <th className="px-3 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rent Receipt
                      </th>
                      <th className="px-3 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {getPropertyTenants(property.id).map((tenant) => (
                      <tr key={tenant.id}>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {tenant.unitNumber}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {tenant.name}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {tenant.phone}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {tenant.houseType}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {tenant.depositReceiptNumber}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          KES {tenant.rentAmount.toLocaleString()}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {tenant.rentReceiptNumber}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          KES {tenant.balance.toLocaleString()}
                          <span className="text-xs text-gray-500 ml-1">
                            ({tenant.balanceType})
                          </span>
                        </td>
                      </tr>
                    ))}
                    {getPropertyTenants(property.id).length === 0 && (
                      <tr>
                        <td colSpan="8" className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          No tenants found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-medium mb-4">Add New Property</h2>
            <form onSubmit={handleAddProperty}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property Name
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 input"
                    value={newProperty.name}
                    onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 input"
                    value={newProperty.address}
                    onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Number of Units
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="mt-1 input"
                    value={newProperty.units}
                    onChange={(e) => setNewProperty({ ...newProperty, units: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Landlord Name
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 input"
                    value={newProperty.landlordName}
                    onChange={(e) => setNewProperty({ ...newProperty, landlordName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Landlord Phone
                  </label>
                  <input
                    type="tel"
                    required
                    className="mt-1 input"
                    value={newProperty.landlordPhone}
                    onChange={(e) => setNewProperty({ ...newProperty, landlordPhone: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Statement Modal */}
      {showStatementModal && selectedProperty && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-medium mb-4">Generate Statement</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Month
                </label>
                <input
                  type="month"
                  className="mt-1 input"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowStatementModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => generateStatement(selectedProperty)}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Generate Statement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}