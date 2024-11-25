import { useSelector, useDispatch } from 'react-redux'
import { setCurrentCompany } from '../store/slices/companySlice'

export function CompanySelector() {
  const dispatch = useDispatch()
  const { companies, currentCompany } = useSelector((state) => state.company)

  return (
    <div className="relative">
      <select
        value={currentCompany?.id || ''}
        onChange={(e) => {
          const company = companies.find(c => c.id === e.target.value)
          dispatch(setCurrentCompany(company))
        }}
        className="input pr-10"
      >
        <option value="">Select Company</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
    </div>
  )
}