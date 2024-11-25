import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Users, FileText, Shield, BarChart3, CreditCard, Calendar, Mail } from 'lucide-react'

export function Landing() {
  const features = [
    {
      icon: Building2,
      title: 'Property Management',
      description: 'Efficiently manage multiple properties with detailed tracking and automated reporting.',
    },
    {
      icon: Users,
      title: 'Tenant Management',
      description: 'Streamline tenant onboarding, rent collection, and maintenance requests in one place.',
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Accept online rent payments, track expenses, and automate financial reporting.',
    },
    {
      icon: Calendar,
      title: 'Maintenance Scheduling',
      description: 'Schedule and track property maintenance, repairs, and inspections effortlessly.',
    },
    {
      icon: Mail,
      title: 'Communication Hub',
      description: 'Built-in messaging system for seamless communication between tenants and property managers.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Make data-driven decisions with comprehensive analytics and financial reporting.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main>
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Professional Property Management</span>
                <span className="block text-primary-600">Made Simple & Efficient</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Transform your property management business with our comprehensive solution. 
                From tenant screening to financial reporting, we provide the tools you need to grow.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                >
                  Start Free Trial
                </Link>
              </div>
              <p className="mt-3 text-sm text-gray-500">No credit card required</p>
            </motion.div>
          </div>
        </div>

        <div className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Everything You Need to Scale Your Property Management Business
              </h2>
              <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                Trusted by property managers worldwide
              </p>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="h-full bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Transform Your Property Management?
              </h3>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}