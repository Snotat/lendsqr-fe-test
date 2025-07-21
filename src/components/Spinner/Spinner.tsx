import styles from './Spinner.module.scss'

export const Spinner = () => {
  return (
   <div style={{width:'100%', height:'100%', display:"flex", alignSelf:'center',alignItems:"center", justifyContent:'center'}}> <div className={styles.loader_spinner}></div></div>
  )
}