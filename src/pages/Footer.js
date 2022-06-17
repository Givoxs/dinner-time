import React, {useState} from 'react';

function Footer() {

    const [thanks, setThanks] = useState(false);

    return (
        <>
            <footer>
                <div className="form-container">
                    <h2>Contactform</h2>

                    <form>
                        <input
                            type="text"
                            placeholder="Emailaddress"
                            name="email"
                        />
                        <input
                            type="text"
                            placeholder="What do you want to share?"
                            name="message"
                        />
                    </form>
                    <button className="feedback-button" type="button" onClick={() => setThanks(true)}>
                        Send Message
                    </button>

                    {thanks === true && <p>Thanks for your feedback!</p>}

                </div>
            </footer>
        </>
    );
}

export default Footer;