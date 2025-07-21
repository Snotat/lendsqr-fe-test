 "use client"

import React, { useEffect, useState } from 'react'
import styles from './Signin.module.scss';
import logo from '../../assets/images/logo.png'
import sign_ill from '../../assets/images/sign_ill_trimmed_bgremoved.png'
import lendsqrlogo from '../../assets/images/lendsqr.png'
import { Spinner } from '../../components/Spinner/Spinner';
import { toast } from 'sonner';
import {motion} from 'framer-motion'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { BiSolidErrorCircle } from 'react-icons/bi';
import failure from '../../assets/audio/fails.mp3'
import successful from '../../assets/audio/successes.mp3'
import { useNavigate } from 'react-router-dom';
interface SignInput {
  email: string;
  password: string;
}
const SignIn = () => {

    const fail = new Audio(failure);
    const success = new Audio(successful);
const [signInput,setSignInput] = useState<SignInput>({
    email:'',
    password:""
})
const [inputComplete, setInputComplete] = useState<boolean>(true)
const [showPassword, setShowPassword] = useState<Boolean>(false)
const [loading, setLoading] = useState(false)
const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
  setSignInput(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};
const toggleHide =(e:React.MouseEvent<HTMLDivElement>)=>{
setShowPassword(!showPassword)
}
let navigate = useNavigate()
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if(!loading && inputComplete){
  setLoading(true)
  let loadTime = setTimeout(()=>{
setLoading(false)
success.play()
setSignInput({
  email:"", password:""
})
toast('Success! You would be redirected to your dashboard.', { icon: <IoCheckmarkDoneCircle className='success_icon' style={{ width: '45px', height: "45px", fontWeight: '650', color: "#17b621", paddingRight: '20px' }} /> }
                )
                navigate('/dashboard')
  }, 3000)
   return () => {
      clearTimeout(loadTime);
    };
} else {
  fail.play()
  if(!emailRegex.test(signInput.email)){
toast('Please, Fill in a Proper Email Address', { icon: <BiSolidErrorCircle className='error_icon' style={{ width: '45px', height: "45px", fontWeight: '650', color: '#b01010', paddingRight: '20px' }} /> })
  }else if(signInput.password.length<6){
toast('Please, Fill in a Password of 6 or more Characters', { icon: <BiSolidErrorCircle className='error_icon' style={{ width: '45px', height: "45px", fontWeight: '650', color: '#b01010', paddingRight: '20px' }} /> })
  }
}
}
const checkInput =()=>{
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if(emailRegex.test(signInput.email) &&signInput.password.length>5){
setInputComplete(true)
}else{
  setInputComplete(false)
}
}
useEffect(()=>{
checkInput()
},[signInput])
  return (
 <div className={styles.signin}>
      <div className={styles.signin_left}>
       <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }} viewport={{ amount: 0, once: true }} className={styles.signin_logo} >
        <img src={logo} className={styles.main_logo} alt="main logo - lendsqr" />
        <img src={lendsqrlogo} alt="logo text - lendsqr" />
       </motion.div >   
       <div className={styles.signin_ill}>
          <motion.img   initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }} src={sign_ill} alt="" />
        </div>
      </div>
      <div className={styles.signin_right}>
          <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }} viewport={{ amount: 0, once: true }}  className={styles.signin_logo} >
        <img src={logo} className={styles.main_logo} alt="main logo - lendsqr" />
        <img src={lendsqrlogo} alt="" />
       </motion.div > 
  <form id='signin' onSubmit={handleSubmit} className={styles.signin_form}>
  <motion.div  initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              rotate: [0, -5, 5, -5, 5, -5, 5, -5, 5,-5, 5, 0]
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              delay: 0.5,
              type: "tween"
            }}  className={styles.signin_header}>Welcome!</motion.div>
  <p>Enter details to login.</p>
  <div className={styles.signin_input_sec}><input
      type="email"
      name="email"
        autoComplete='off'
      value={signInput.email}
      onChange={handleInput}
      placeholder="Email"
    /><div className={styles.password_input_sec}>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={signInput.password}
        onChange={handleInput}
        autoComplete='off'
        placeholder="Password"
      />
      <div className={styles.show_password} onClick={toggleHide}>
        {showPassword ? 'HIDE' : 'SHOW'}
      </div>
    </div>
    <button type="button" className={styles.forget_text}>FORGOT PASSWORD?</button>
  </div>
  <button type="submit" style={{cursor:loading ?'wait':(inputComplete?'pointer':'not-allowed')}} className={styles.signin_button}>{loading?<Spinner />:'LOG IN'}</button>
</form>

      </div>
    </div>
  )
}

export default SignIn