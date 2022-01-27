import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { getDoc,
     doc,
     updateDoc,
     collection,
     getDocs,
     query,
     where,
     orderBy,
     deleteDoc, 
    } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { toast } from 'react-toastify'
import Project from '../components/Project'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Job() {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  const [projects, setProjects] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  useEffect(() => {
    const fetchJob= async () => {
      const docRef = doc(db, 'jobs', params.jobId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setJob(docSnap.data())
        setLoading(false)
      }
    }

    fetchJob()

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
  }, [navigate, params.jobId, auth.currentUser.uid])

  if (loading) {
    return <Spinner />
  }


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



  return (
    <main>
      <Helmet>
        <title>{job.name}</title>
      </Helmet>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {job.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${job.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='swiperSlideDiv'
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

      <div className='listingDetails'>
        <p className='listingName'>
          {job.name} - $
        </p>
        <p className='listingLocation'>
            {job.address}</p>

        {/* <p className='listingLocationTitle'>Location</p>

        <div className='leafletContainer'>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[job.geolocation.lat, job.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />

            <Marker
              position={[job.geolocation.lat, job.geolocation.lng]}
            >
              <Popup>{job.location}</Popup>
            </Marker>
          </MapContainer>
        </div> */}
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
      </div>
      
    </main>
  )
}

export default Job

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat
