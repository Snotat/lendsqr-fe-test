import React, { useState } from 'react'
import styles from './Signin.module.scss';
import logo from '../../assets/images/logo.png'
import sign_ill from '../../assets/images/sign_ill_trimmed_bgremoved.png'
import lendsqrlogo from '../../assets/images/lendsqr.png'

interface SignInput {
  email: string;
  password: string;
}
const SignIn = () => {

const [signInput,setSignInput] = useState<SignInput>({
    email:'',
    password:""
})
const [showPassword, setShowPassword] = useState<Boolean>(false)
const signIn = ()=>{

}
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
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
signIn()
}
  return (
 <div className={styles.signin}>
      <div className={styles.signin_left}>
       <div className={styles.signin_logo} >
        <img src={logo} alt="" />
        <img src={lendsqrlogo} alt="" />
       </div >   
       <div className={styles.signin_ill}>
          <img src={sign_ill} alt="" />
        </div>
      </div>
      <div className={styles.signin_right}>
          <div className={styles.signin_logo} >
        <img src={logo} alt="" />
        <img src={lendsqrlogo} alt="" />
       </div > 
  <form id='signin' onSubmit={handleSubmit} className={styles.signin_form}>
  <div className={styles.signin_header}>Welcome!</div>
  <p>Enter details to login.</p>
  <div className={styles.signin_input_sec}><input
      type="email"
      name="email"
      value={signInput.email}
      onChange={handleInput}
      placeholder="Email"
    /><div className={styles.password_input_sec}>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={signInput.password}
        onChange={handleInput}
        placeholder="Password"
      />
      <div className={styles.show_password} onClick={toggleHide}>
        {showPassword ? 'HIDE' : 'SHOW'}
      </div>
    </div>
    <button type="button" className={styles.forget_text}>FORGOT PASSWORD?</button>
  </div>
  <button type="submit" className={styles.signin_button}>LOG IN</button>
</form>

      </div>
    </div>
  )
}

export default SignIn