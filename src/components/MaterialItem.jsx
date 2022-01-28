import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'


function MaterialItem({ material, id, onEdit, onDelete }) {
  return (
    <li className='materialListing'>
      <Link
        to={`/material/${id}`}
        className='categoryListingLink'
      >
        <p className='materialItem' >
              {material.name}
            </p>
        <div className='materialListingDetails'>
          <p className='materialPrice'>{material.base_price}</p>
          </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231, 76,60)'
          // onClick={() => onDelete(material.id, material.name)}
        />
      )}

      {onEdit && <EditIcon className='editIcon' 
      // onClick={() => onEdit(id)} 
      />}
    </li>
  )
}

export default MaterialItem
