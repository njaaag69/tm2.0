import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertTriangle, Tool } from 'lucide-react';

export function MaintenanceTracker() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: 'Leaking Faucet',
      status: 'pending',
      priority: 'medium',
      created: '2024-03-10T10:00:00',
      updated: '2024-03-10T10:00:00',
      category: 'plumbing',
      unit: '101',
    },
    // Add more sample requests
  ]);

  const [filter, setFilter] = useState('all');

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    inProgress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusIcons = {
    pending: Clock,
    inProgress: Tool,
    completed: CheckCircle,
    cancelled: AlertTriangle,
  };

  const filteredRequests = requests.filter(request => 
    filter === 'all' ? true : request.status === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Maintenance Requests</h2>
        <div className="flex space-x-2">
          {Object.keys(statusColors).map(status => (
            <button
              key={status}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === status ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'all' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((request, index) => {
          const StatusIcon = statusIcons[request.status];
          return (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <StatusIcon className={`h-5 w-5 ${statusColors[request.status]}`} />
                  <div>
                    <h3 className="text-sm font-medium">{request.title}</h3>
                    <p className="text-xs text-gray-500">Unit {request.unit}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[request.status]}`}>
                    {request.status}
                  </span>
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => {/* Implement view details */}}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}