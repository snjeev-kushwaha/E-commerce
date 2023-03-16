// import React, { Fragment } from 'react';
// import { Route, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const navigate = useNavigate();
//     const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//     return (
//         <Fragment>
//             {!loading && (
//                 <Route
//                     {...rest}
//                     render={(props) => {
//                         if (!isAuthenticated) {
//                             // return <Redirect to="/login" />
//                             return navigate('/login')
//                         }
//                         return <Component {...props} />
//                     }}
//                 />
//             )}
//         </Fragment>
//     )
// }

// export default ProtectedRoute

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Protected = (props) => {
  const { Component } = props
  const navigate = useNavigate()

  useEffect(() => {
    const login = localStorage.getItem('token')
    if (!login) {
      navigate('/login')
    }
  })
  return (
    <>
      <Component />
    </>
  )
}
export default Protected