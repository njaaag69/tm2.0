import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function TwoFactorSetup({ secret, onVerify }) {
  const [code, setCode] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (code.length !== 6) {
      toast.error('Please enter a valid 6-digit code')
      return
    }
    onVerify(code)
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Set Up Two-Factor Authentication</h2>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Scan this QR code with your authenticator app (e.g., Google Authenticator)
        </p>
        
        <div className="flex justify-center mb-4">
          <QRCodeSVG value={secret} size={200} />
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>Can't scan the code? Enter this key manually:</p>
          <code className="block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded">
            {secret}
          </code>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Verification Code
          </label>
          <input
            type="text"
            maxLength={6}
            className="input"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit code"
            required
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn w-full"
        >
          Verify and Enable 2FA
        </motion.button>
      </form>
    </div>
  )
}