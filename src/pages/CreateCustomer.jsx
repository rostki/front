import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import Spinner from '../components/Spinner'

function CreateCustomer() {

    const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: 'cn',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  })

  const {
    companyName,
    firstName,
    lastName,
    phoneNumber,
  } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate('/sign-in')
        }
      })
    }

    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const onSubmit = async (e) =>  {
    e.preventDefault()

    setLoading(true)

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, 'customers'), formDataCopy)
    setLoading(false)
    toast.success('Customer saved')
    navigate(`/customers`)
  } 

  const onMutate = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
  }

  if (loading) {
    return <Spinner />
  }

    return (
        <div className='profile'>
            <header>
                <p className='pageHeader'>Create a new Customer</p>
            </header>
            
            <main>
            <form onSubmit={onSubmit}>

          <label className='formLabel'>Company Name</label>
          <input
            className='formInputName'
            type='text'
            id='companyName'
            value={companyName}
            onChange={onMutate}
            maxLength='32'
            minLength='2'
            required
          />

<label className='formLabel'>First Name</label>
          <input
            className='formInputName'
            type='text'
            id='firstName'
            value={firstName}
            onChange={onMutate}
            maxLength='32'
            minLength='2'
            required
          />

<label className='formLabel'>Last Name</label>
          <input
            className='formInputName'
            type='text'
            id='lastName'
            value={lastName}
            onChange={onMutate}
            maxLength='32'
            minLength='2'
            required
          />

<label className='formLabel'>Phone Number</label>
          <input
            className='formInputName'
            type='text'
            id='phoneNumber'
            value={phoneNumber}
            onChange={onMutate}
            maxLength='32'
            minLength='2'
            required
          />

          <button type='submit' className='primaryButton createListingButton'>
            Create Customer
          </button>
        </form>
            </main>
        </div>
    )
}

export default CreateCustomer
