import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Category from './pages/Category'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'
import Contact from './pages/Contact'
import Customers from './pages/Customers'
import Projects from './pages/Projects'
import Jobs from './pages/Jobs'
import Job from './pages/Job'
import CreateJob from './pages/CreateJob'
import CreateCustomer from './pages/CreateCustomer'
import CreateProject from './pages/CreateProject'
import Material from './pages/Material'
import Materials from './pages/Materials'

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path='/materials' element={<Materials />} />
        <Route path='/material/:materialId' element={<Material />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/jobs' element={<PrivateRoute />}>
            <Route path='/jobs' element={<Jobs />} />
          </Route>
          <Route path='/job/:jobId' element={<PrivateRoute />}>
            <Route path='/job/:jobId' element={<Job />} />
          </Route>
          <Route path='/projects' element={<PrivateRoute />}>
            <Route path='/projects' element={<Projects />} />
          </Route>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/create-customer' element={<CreateCustomer />} />
          <Route path='/create-project' element={<CreateProject />} />
          <Route path='/create-job' element={<CreateJob />} />
          <Route path='/edit-listing/:listingId' element={<EditListing />} />
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listing />}
          />
          <Route path='/contact/:landlordId' element={<Contact />} />
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />
    </>
  )
}

export default App
