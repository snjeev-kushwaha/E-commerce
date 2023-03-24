// import React, { Fragment } from 'react';
// import { Route, useNavigate, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//     const navigate = useNavigate();
//     const { loading, isAuthenticated } = useSelector((state) => state.user);
//     return (
//         <Fragment>
//             {!loading && (
//                 <Route
//                     {...rest}
//                     render={(props) => {
//                         if (isAuthenticated === false) {
//                             // return <Redirect to="/login" />
//                             return navigate('/login')
//                         }
// if (isAdmin === true && user.role !== "admin") {
//   return navigate('/login')
// }
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
import { useSelector } from 'react-redux';

const Protected = (props, isAdmin) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { Component } = props
  const navigate = useNavigate()

  useEffect(() => {
    const login = localStorage.getItem('token')
    if (!login) {
      navigate('/login')
    }
    if (isAuthenticated === false) {
      return navigate('/login');
    }
    if (isAdmin === true && user.role !== "admin") {
      return navigate('/login')
    }
  })
  return (
    <>
      <Component />
    </>
  )
}
export default Protected