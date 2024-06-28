import { assets } from "../../assets/assets"
import "./AppDownload.css"



const AppDownload = () => {
  return (
      <div className="app-download-container" id="app-download-container">
      <h2>Get the App For Better Experience</h2>
      <div className="download-img">
        <img src={assets.app_store}/>
        <img src={assets.play_store} alt=""/>
      </div>
      
    </div>
  )
}

export default AppDownload
