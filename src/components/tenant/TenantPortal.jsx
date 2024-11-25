import { useState } from 'react';
import { motion } from 'framer-motion';
import { MaintenanceRequest } from '../maintenance/MaintenanceRequest';
import { MaintenanceTracker } from '../maintenance/MaintenanceTracker';
import {
  Home,
  FileText,
  CreditCard,
  MessageSquare,
  Bell,
  Settings,
} from 'lucide-react';

export function TenantPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'maintenance', name: 'Maintenance', icon: FileText },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-md
                    ${activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }
                  `}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-6">
                {activeTab === 'maintenance' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium">Submit Maintenance Request</h2>
                    <MaintenanceRequest />
                    <div className="mt-8">
                      <MaintenanceTracker />
                    </div>
                  </div>
                )}
                {/* Add other tab content components */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}