import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Save } from 'lucide-react'
import toast from 'react-hot-toast'

export function Settings() {
  const [settings, setSettings] = useState({
    companyName: 'Njagua Property Management',
    email: 'info@njagua.com',
    phone: '+254 700 000000',
    address: 'Nairobi, Kenya',
    commissionRate: '10',
    darkMode: false,
  })

  const handleSave = (e) => {
    e.preventDefault()
    // TODO: Implement settings update
    toast.success('Settings saved successfully')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Settings
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company Name
              </label>
              <input
                type="text"
                className="mt-1 input"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                className="mt-1 input"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <input
                type="tel"
                className="mt-1 input"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <input
                type="text"
                className="mt-1 input"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Commission Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                className="mt-1 input"
                value={settings.commissionRate}
                onChange={(e) => setSettings({ ...settings, commissionRate: e.target.value })}
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={settings.darkMode}
                    onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                  />
                  <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                    settings.darkMode ? 'transform translate-x-6' : ''
                  }`}></div>
                </div>
                <div className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dark Mode
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn">
              <Save className="h-5 w-5 mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}