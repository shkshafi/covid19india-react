import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';

// TODO(slightlyoff): factor out common JSON parsing & caching of this file
const DATA_URL = 'https://api.covid19india.org/website_data.json';

function FAQ(props) {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    getFAQs();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getFAQs = () => {
    fetch(DATA_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFaq(data.faq);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="FAQ">
      <Helmet>
        <title>About - covid19Hyd</title>
        <meta
          name="title"
          content="Coronavirus Outbreak in Hyderabad: Latest Map and Case Count"
        />
      </Helmet>
      {/* {faq.map((faq, index) => { */}
        return (
          <div
            // key={index}
            className="faq fadeInUp"
            style={{animationDelay: `0.1s`}}
          >
            {/* <h2 className="question">{faq.question}</h2>
            <h2
              className="answer"
              dangerouslySetInnerHTML={{__html: faq.answer}}
            ></h2> */}

            <h2 className="question">Are you Official?</h2>
            <h2 className="answer">No.</h2>
            <br />
            <h2 className="question">What are your sources? How is the data gathered for this project?</h2>
            <h2 className="answer">We are using API's and project source code provided as open source by covid19india.org</h2>
            <br />
            <h2 className="question">Who are you?</h2>
            <h2 className="answer">I am a security consultant with keen interest in web developement, I've recently learned to create apps using ReactJS, hence created dashboard for city where I live in.</h2>


          </div>
        );
      )}
    </div>
  );
    }

export default FAQ;
