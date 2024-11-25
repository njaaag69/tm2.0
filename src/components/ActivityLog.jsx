import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

export function ActivityLog() {
  const activities = useSelector((state) => state.activity.activities)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Recent Activity
        </h2>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.user}
                </p>
              </div>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(activity.timestamp), 'PPp')}
              </time>
            </div>
          </motion.div>
        ))}

        {activities.length === 0 && (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No recent activity
          </div>
        )}
      </div>
    </div>
  )
}