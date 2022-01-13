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

function CreateProject() {

    const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: 'my project',
    address: '123 first st, San Francisco',
    images: {},

  })

  const {
    name,
    address,
    images,

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

    if (images.length > 6) {
        setLoading(false)
        toast.error('Max 6 images')
        return
      }

      // Store image in firebase
    const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage()
          const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
  
          const storageRef = ref(storage, 'images/' + fileName)
  
          const uploadTask = uploadBytesResumable(storageRef, image)
  
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              console.log('Upload is ' + progress + '% done')
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused')
                  break
                case 'running':
                  console.log('Upload is running')
                  break
                default:
                  break
              }
            },
            (error) => {
              reject(error)
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL)
              })
            }
          )
        })
      }
  
      const imgUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch(() => {
        setLoading(false)
        toast.error('Images not uploaded')
        return
      })
  

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    }

    delete formDataCopy.images


    const docRef = await addDoc(collection(db, 'projects'), formDataCopy)
    setLoading(false)
    toast.success('Project saved')
    navigate(`/projects`)
  } 

  const onMutate = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }

    // Files
    if (e.target.files) {
        setFormData((prevState) => ({
          ...prevState,
          images: e.target.files,
        }))
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
                <p className='pageHeader'>Create a new Project</p>
            </header>
            
            <main>
            <form onSubmit={onSubmit}>

          <label className='formLabel'>Project Name</label>
          <input
            className='formInputName'
            type='text'
            id='name'
            value={name}
            onChange={onMutate}
            maxLength='32'
            minLength='2'
            required
          />

<label className='formLabel'>Project Address</label>
          <input
            className='formInputName'
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            maxLength='32'
            minLength='2'
            required
          />

<label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />

          <button type='submit' className='primaryButton createListingButton'>
            Create Project
          </button>
        </form>
            </main>
        </div>
    )
}

export default CreateProject
