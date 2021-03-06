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
import Project from '../components/Project'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'

function Projects() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const navigate = useNavigate()

  useEffect(() => {
      
    const fetchUserProjects = async () => {
      const projectsRef = collection(db, 'projects')

      const q = query(
        projectsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let projects = []

      querySnap.forEach((doc) => {
        return projects.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setProjects(projects)
      setLoading(false)
    }

    fetchUserProjects()
  }, [auth.currentUser.uid])

  const onDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'projects', projectId))
      const updatedProjects = projects.filter(
        (project) => project.id !== projectId
      )
      setProjects(updatedProjects)
      toast.success('Successfully deleted project')
    }
  }

//   const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)
    return (
        <div className='profile'>
            <header className='profileHeader'>
        <p className='pageHeader'>Projects</p>
      </header>
      <main>
      <Link to='/create-project' className='createListing'>
          {/* <img src={homeIcon} alt='home' /> */}
          <p>Add a new Project</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>

        {!loading && projects?.length > 0 && (
          <>
            <p className='listingText'>Your Projects</p>
            <ul className='listingsList'>
              {projects.map((project) => (
                <Project
                  key={project.id}
                  project={project.data}
                  id={project.id}
                  onDelete={() => onDelete(project.id)}
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

export default Projects
