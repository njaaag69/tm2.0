import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function Dashboard() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [stats, setStats] = useState({
    totalProperties: 25,
    totalTenants: 45,
    occupancyRate: 85,
    monthlyRevenue: 250000,
    yearlyGrowth: 12.5,
    pendingMaintenance: 8,
    upcomingRenewals: 5,
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [150000, 180000, 170000, 200000, 250000, 230000],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: [80000, 95000, 87000, 110000, 120000, 115000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const occupancyData = {
    labels: ['Occupied', 'Vacant'],
    datasets: [{
      data: [85, 15],
      backgroundColor: ['rgb(34, 197, 94)', 'rgb(239, 68, 68)'],
    }],
  };

  const maintenanceData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [{
      data: [8, 5, 12],
      backgroundColor: ['rgb(239, 68, 68)', 'rgb(234, 179, 8)', 'rgb(34, 197, 94)'],
    }],
  };

  const events = [
    { title: 'Rent Due - Unit 101', date: '2024-03-01', color: '#ef4444' },
    { title: 'Maintenance - Unit 205', date: '2024-03-05', color: '#f59e0b' },
    { title: 'Lease Renewal - Unit 304', date: '2024-03-15', color: '#3b82f6' },
  ];

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `KES ${value.toLocaleString()}`
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="space-y-6" ref={ref}>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Properties</p>
              <h3 className="text-2xl font-bold mt-1">
                <CountUp end={stats.totalProperties} duration={2} />
              </h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+5.2%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Tenants</p>
              <h3 className="text-2xl font-bold mt-1">
                <CountUp end={stats.totalTenants} duration={2} />
              </h3>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <Users className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+3.1%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Revenue</p>
              <h3 className="text-2xl font-bold mt-1">
                KES <CountUp end={stats.monthlyRevenue} duration={2} separator="," />
              </h3>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+8.4%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Occupancy Rate</p>
              <h3 className="text-2xl font-bold mt-1">
                <CountUp end={stats.occupancyRate} duration={2} />%
              </h3>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-500">-1.2%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Revenue vs Expenses</h3>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="input"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="h-80">
            <Line data={revenueData} options={lineChartOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-6">Property Overview</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Occupancy Status</h4>
              <Doughnut data={occupancyData} options={doughnutOptions} />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Maintenance Status</h4>
              <Doughnut data={maintenanceData} options={doughnutOptions} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Calendar and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-6">Upcoming Events</h3>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            height={400}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek'
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-6">Alerts & Tasks</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  {stats.pendingMaintenance} Maintenance Requests
                </p>
                <p className="text-xs text-red-600 dark:text-red-300">
                  Require immediate attention
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Calendar className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  {stats.upcomingRenewals} Lease Renewals
                </p>
                <p className="text-xs text-yellow-600 dark:text-yellow-300">
                  Due in the next 30 days
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  {stats.yearlyGrowth}% Growth
                </p>
                <p className="text-xs text-green-600 dark:text-green-300">
                  Year over year increase
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}