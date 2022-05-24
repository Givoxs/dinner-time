import React from 'react';


function Feedback(){

    return(
        <>
            <footer>
                <div className="form-container">
                    <h2>Contactformulier</h2>

                    <form>
                        <input
                            type="text"
                            placeholder="Typ hier jouw bericht"
                            name="message"
                        />
                    </form>

                    <button className="feedback-button" type="submit">
                        Send Message
                    </button>
                </div>
            </footer>
    </>
    )
}

export default Feedback