import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const CreatePost = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
    }
    console.log(post);
  }

  
