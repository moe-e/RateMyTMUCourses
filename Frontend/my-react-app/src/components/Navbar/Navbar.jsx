import './Navbar.css'
import moonPicture from '../../assets/moonPic.webp'
import homePicture from '../../assets/tmu.png'

function Navbar (){
    return (
        <div className='header'>
            <button className='homeButton'><img className='image' src={homePicture} alt="Home"/></button>

            <div className="tab-options">
                <h1 className="option">Home</h1>
                <h1 className="option">Explore</h1>
                <h1 className="option">About</h1>
            </div>

            <div className='rightSide'>
                <button className='darkMode'><img className='image' src={moonPicture} alt="Button"/></button>
                <button className= 'login'>Log in &#8680;</button>
            </div>
            



            

            

            

        </div>
    )
}
export default Navbar