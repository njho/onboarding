import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <ul className="icons">
                    <li><a className="icon fa-fw fa-envelope-o" href="mailto:hi@gifty.link"><span className="label">Email</span></a></li>
                    <li><a className="icon fa-fw fa-instagram" href="https://www.instagram.com/gifty.link/"><span className="label">Instagram</span></a></li>
                    <li><a className="icon fa-fw fa-mobile" href="sms:+15873179991&amp;body=Hi"><span className="label">Phone</span></a></li>
                </ul>
            </footer>
        )
    }
}

export default Footer;
