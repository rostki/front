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

function Projects() {
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
      </main>
        </div>
    )
}

export default Projects
