import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'


function JobItem({ job, id, onEdit, onDelete }) {
  return (
    <li className='categoryListing'>
      <Link
        to={`/job/${id}`}
        className='categoryListingLink'
      >
        <img
          src={job.imgUrls[0]}
          alt={job.name}
          className='categoryListingImg'
        />
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{job.address}</p>
          <p className='categoryListingName'>{job.name}</p>
        </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231, 76,60)'
          onClick={() => onDelete(job.id, job.name)}
        />
      )}

      {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}
    </li>
  )
}

export default JobItem
