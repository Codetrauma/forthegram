// import { React, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addPost } from '../../store/posts';
// import UploadPicture from '../UploadImage/UploadImage';



// const CreatePost = ({ setShowModal }) => {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const post = {
//     }
//     console.log(post);
//     dispatch(addPost(post))
//     setShowModal(false);
//   }


//   return (
//     <div>
//       <UploadPicture />

//         <label>
//         </label>
//         <textarea name="description" id="post" cols="30" rows="10"></textarea>
//       </form>
//     </div>
//   )
// }

// export default CreatePost
