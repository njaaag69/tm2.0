import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { addTenant, deleteTenant } from '../store/slices/tenantSlice'
import toast from 'react-hot-toast'

export function Tenants() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTenant, setNewTenant] = useState({
    name: '',
    phone: '',
    propertyId: '',
    unitNumber: '',
    rentAmount: '',
    depositAmount: '',
    moveInDate: '',
  })

  const dispatch = useDispatch()
  const tenants = useSelector((state) => state.tenants.tenants)
  const properties = useSelector((state) => state.properties.properties)

  const handleAddTenant = (e) => {
    e.preventDefault()
    const tenant = {
      id: Date.now(),
      ...newTenant,
      rentAmount: parseFloat(newTenant.rentAmount),
      depositAmount: parseFloat(newTenant.depositAmount),
      balance: 0,
    }
    dispatch(addTenant(tenant))
    setNewTenant({
      name: '',
      phone: '',
      propertyId: '',
      unitNumber: '',
      rentAmount: '',
      depositAmount: '',
      moveInDate: '',
    })
    setShowAddModal(false)
    toast.success('Tenant added successfully')
  }

  const handleDeleteTenant = (id) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      dispatch(deleteTenant(id))
      toast.success('Tenant deleted successfully')
    }
  }

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.phone.includes(searchTerm)
  )

  const getPropertyName = (propertyId) => {
    const property = properties.find(p => p.id === propertyId)
    return property ? property.name : 'Unknown Property'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Tenants
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Tenant
        </button>
      </div>

      <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search tenants..."
          className="ml-2 flex-1 bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rent Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTenants.map((tenant) => (
              <tr key={tenant.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {tenant.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {getPropertyName(tenant.propertyId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {tenant.unitNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  KES {tenant.rentAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  KES {tenant.balance.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  <button
                    className="text-primary-600 hover:text-primary-900 mr-3"
                    onClick={() => {/* TODO: Implement edit */}}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteTenant(tenant.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-medium mb-4">Add New Tenant</h2>
            <form onSubmit={handleAddTenant}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 input"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    className="mt-1 input"
                    value={newTenant.phone}
                    onChange={(e) => setNewTenant({ ...newTenant, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property
                  </label>
                  <select
                    required
                    className="mt-1 input"
                    value={newTenant.propertyId}
                    onChange={(e) => setNewTenant({ ...newTenant, propertyId: e.target.value })}
                  >
                    <option value="">Select Property</option>
                    {properties.map((property) => (
                      <option key={property.id} value={property.id}>
                        {property.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Unit Number
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 input"
                    value={newTenant.unitNumber}
                    onChange={(e) => setNewTenant({ ...newTenant, unitNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rent Amount (KES)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 input"
                    value={newTenant.rentAmount}
                    onChange={(e) => setNewTenant({ ...newTenant, rentAmount: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Deposit Amount (KES)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 input"
                    value={newTenant.depositAmount}
                    onChange={(e) => setNewTenant({ ...newTenant, depositAmount: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Move-in Date
                  </label>
                  <input
                    type="date"
                    required
                    className="mt-1 input"
                    value={newTenant.moveInDate}
                    onChange={(e) => setNewTenant({ ...newTenant, moveInDate: e.target.value })}
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
                  Add Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}