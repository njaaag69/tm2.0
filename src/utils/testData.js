// Test data for development
export const TEST_CREDENTIALS = {
  SUPER_ADMIN: {
    email: 'superadmin@njagua.com',
    password: 'SuperAdmin@123',
    role: 'super_admin',
    name: 'System Administrator',
    company: 'Njagua Properties Ltd',
  },
  ADMIN: {
    email: 'admin@njagua.com',
    password: 'Admin@123',
    role: 'admin',
    name: 'John Doe',
    company: 'Njagua Properties Ltd',
  },
  USER: {
    email: 'user@njagua.com',
    password: 'User@123',
    role: 'user',
    name: 'Jane Smith',
    company: 'Njagua Properties Ltd',
  },
}

export const TEST_2FA_SECRET = 'JBSWY3DPEHPK3PXP'

export const TEST_COMPANIES = [
  {
    id: '1',
    name: 'Njagua Properties Ltd',
    address: 'Nairobi, Kenya',
    phone: '+254 700 000000',
    email: 'info@njagua.com',
  },
  {
    id: '2',
    name: 'ABC Property Management',
    address: 'Mombasa, Kenya',
    phone: '+254 711 111111',
    email: 'info@abc.com',
  },
]

export const TEST_PROPERTIES = [
  {
    id: '1',
    name: 'Sunshine Apartments',
    address: 'Kilimani, Nairobi',
    units: 10,
    occupiedUnits: 8,
    landlordName: 'James Kamau',
    landlordPhone: '+254 722 111111',
  },
  {
    id: '2',
    name: 'Green View Heights',
    address: 'Westlands, Nairobi',
    units: 15,
    occupiedUnits: 12,
    landlordName: 'Sarah Ochieng',
    landlordPhone: '+254 733 222222',
  },
]

export const TEST_TENANTS = [
  {
    id: '1',
    propertyId: '1',
    name: 'Alice Wanjiku',
    phone: '+254 700 123456',
    unitNumber: '1A',
    houseType: '2 Bedroom',
    depositReceiptNumber: 'DEP001',
    rentAmount: 35000,
    rentReceiptNumber: 'RENT001',
    balance: 0,
    balanceType: 'BF',
  },
  {
    id: '2',
    propertyId: '1',
    name: 'Bob Maina',
    phone: '+254 711 234567',
    unitNumber: '2B',
    houseType: '3 Bedroom',
    depositReceiptNumber: 'DEP002',
    rentAmount: 45000,
    rentReceiptNumber: 'RENT002',
    balance: 5000,
    balanceType: 'CD',
  },
]

// Add this data to Redux store during development
export const initializeTestData = (store) => {
  if (process.env.NODE_ENV === 'development') {
    store.dispatch({ type: 'company/setCompanies', payload: TEST_COMPANIES })
    store.dispatch({ type: 'company/setCurrentCompany', payload: TEST_COMPANIES[0] })
    store.dispatch({ type: 'properties/setProperties', payload: TEST_PROPERTIES })
    store.dispatch({ type: 'tenants/setTenants', payload: TEST_TENANTS })
  }
}