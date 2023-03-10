import React from 'react';
import './footer.css';
import playStore from '../../../images/playstore.png';
import appStore from "../../../images/Appstore.png";

const Footer = () => {
    return (
        <footer id="footer">
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR AP4</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt='playStore' />
                <img src={appStore} alt="appStore" />
            </div>

            <div className='midFooter'>
                <h1>ECOMMERCE.</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 20223 &copy; MeSanjeevKushwaha</p>
            </div>

            <div className='rightFooter'>
                <h4>Follow us</h4>
                <a href='http://instagram.com'>Instagram</a>
                <a href='http://youtube.com'>Youtube</a>
                <a href='http://facebook.com'>Facebook</a>
            </div>
        </footer>
    )
}

export default Footer