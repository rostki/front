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
import JobItem from '../components/JobItem'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'

function Jobs() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const navigate = useNavigate()

  useEffect(() => {
      
    const fetchUserJobs = async () => {
      const jobsRef = collection(db, 'jobs')

      const q = query(
        jobsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let jobs = []

      querySnap.forEach((doc) => {
        return jobs.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setJobs(jobs)
      setLoading(false)
    }

    fetchUserJobs()
  }, [auth.currentUser.uid])

  const onDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'jobs', jobId))
      const updatedJobs = jobs.filter(
        (job) => job.id !== jobId
      )
      setJobs(updatedJobs)
      toast.success('Successfully deleted job')
    }
  }

//   const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)
    return (
        <div className='profile'>
            <header className='profileHeader'>
        <p className='pageHeader'>Jobs</p>
      </header>
      <main>
      <Link to='/create-job' className='createListing'>
          {/* <img src={homeIcon} alt='home' /> */}
          <p>Add a new Job</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>

        {!loading && jobs?.length > 0 && (
          <>
            <p className='listingText'>Your Jobs</p>
            <ul className='listingsList'>
              {jobs.map((job) => (
                <JobItem
                  key={job.id}
                  job={job.data}
                  id={job.id}
                  onDelete={() => onDelete(job.id)}
                //   onEdit={() => onEdit(project.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
        </div>
    )
}

export default Jobs
