import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomerItem from '../components/CustomerItem'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'

function Customers() {
    const auth = getAuth()
  const [loading, setLoading] = useState(true)
    return (
        
        <div className='profile'>
            <header className='profileHeader'>
        <p className='pageHeader'>Customers</p>
      </header>
      <main>
      <Link to='/create-customer' className='createListing'>
          {/* <img src={homeIcon} alt='home' /> */}
          <p>Add a new Customer</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>
      </main>
        </div>

       
    )
}

export default Customers
