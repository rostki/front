import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'


function Project({ project, id, onEdit, onDelete }) {
  return (
    <li className='categoryListing'>
      <Link
        to={'/projects'}
        className='categoryListingLink'
      >
        <img
          src={project.imgUrls[0]}
          alt={project.name}
          className='categoryListingImg'
        />
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{project.address}</p>
          <p className='categoryListingName'>{project.name}</p>
        </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231, 76,60)'
          onClick={() => onDelete(project.id, project.name)}
        />
      )}

      {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}
    </li>
  )
}

export default Project
