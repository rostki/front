import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'
import { ReactComponent as CustomersIcon } from '../assets/svg/customersIcon.svg'
import { ReactComponent as ProjectsIcon } from '../assets/svg/projectsIcon.svg'
import { ReactComponent as HomeIcon } from '../assets/svg/homeIcon.svg'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          {/* added icon */}
        <li className='navbarListItem' onClick={() => navigate('/customers ')}>
            <CustomersIcon
              fill={pathMatchRoute('/customers') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/customers')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Customers
            </p>
          </li>
              {/* end added icon */}
              <li className='navbarListItem' onClick={() => navigate('/projects ')}>
            <ProjectsIcon
              fill={pathMatchRoute('/projects') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/projects')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Projects
            </p>
          </li>

          <li className='navbarListItem' onClick={() => navigate('/jobs ')}>
            <HomeIcon
              fill={pathMatchRoute('/jobs') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/jobs')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Jobs
            </p>
          </li>
          {/* <li className='navbarListItem' onClick={() => navigate('/')}>
            <ExploreIcon
              fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Explore
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/offers')}>
            <OfferIcon
              fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/offers')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Offers
            </p>
          </li> */}
          <li className='navbarListItem' onClick={() => navigate('/profile')}>
            <PersonOutlineIcon
              fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar
