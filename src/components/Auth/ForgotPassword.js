// import React ,{useRef, useState} from 'react'
// import {Form , Button , Alert} from 'react-bootstrap'
// import ClearIcon from '@material-ui/icons/Clear';
// import { useStore} from "../contexts/store"
// const ForgotPassword = () => {
//   const emailRef =useRef();
//   const [error, setError] = useState('')
//   const [message, setMessage] = useState('')

//   const [loading, setLoading] = useState(false)
//   const updateForm =useStore(state=>state.updateForm);

//   async function handleSubmit(e){
//     e.preventDefault();
    
    
//     try{
//       setMessage('')
//       setError('');
//       setLoading(true);
//       // await resetPassword(emailRef.current.value)
//       setMessage('Check your inbox')
//       updateForm("login")
//     }catch{
//       setLoading(false)
//       setError('Failed to reset password')
//     }
    
//   }
//   return (
//     <>
//       <div className="authentication">
      
//       <div className="card" style={{height:400}}>
        
//             <h2>Forgot Password</h2>
        
//           {error &&<Alert variant="danger">{error}</Alert>}
//           {message && <Alert variant="success">{message}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" ref={emailRef} required     />
//             </Form.Group>
            
            
//             <Button disabled={loading} type="submit" className="w-100">
//               Reset Password
//             </Button>
//           </Form>
          
//                 <p style={{cursor:"pointer"}}onClick={()=>updateForm("login")} >Login</p>
          
//               <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
//                 <span>Already not have an account NCT ?</span>
                
//                     <p style={{padding:0,cursor:"pointer"}} onClick={()=>updateForm("signup")}>Sign Up</p>
                
//               </div>
//               <i className="close-form" onClick={()=>updateForm("")}>
//                 <ClearIcon />
//               </i>
              
//          </div>                       
//     </div>
//     </>
//   )
// }

// export default ForgotPassword
