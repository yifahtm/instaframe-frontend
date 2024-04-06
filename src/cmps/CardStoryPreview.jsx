/* eslint-disable react/prop-types */
// import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
// import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'
// import Typography from '@mui/material/Typography'
// import { Link } from 'react-router-dom'

// export function CardStoryPreview({ story, user, onRemoveStory }) {
//   const { name, inStock, price, img, _id } = story
//   return (
//     <Card sx={{ maxWidth: 220 }}>
//       <div className="story-preview">
//         <CardMedia component="img" src={img} height="250" />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {name}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {inStock ? 'In stock' : 'Not in stock'}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {price + '$'}
//           </Typography>
//         </CardContent>

//         <CardActions>
//           <div className="editing-story">
//             <div className="editing-story-btn">
//               {user && user.isAdmin && (
//                 <>
//                   <Link to={`/story/edit/${_id}`}>
//                     <button size="small">Edit</button>
//                   </Link>
//                   <button size="small" onClick={() => onRemoveStory(_id)}>
//                     Delete
//                   </button>
//                 </>
//               )}
//               <Link to={`/story/details/${_id}`}>
//                 <button className='learn-btn' size="small">Learn More</button>
//               </Link>
//             </div>
//           </div>
//         </CardActions>
//       </div>
//     </Card>
//   )
// }
