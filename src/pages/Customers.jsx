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

function Customers() {
    return (
        <>
        <div>
            <h1>Customers</h1>
        </div>

            <CustomerItem />
        </>
    )
}

export default Customers
