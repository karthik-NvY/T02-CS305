import React, { useState, useRef } from "react";
import "./Template1edit.css";
import hero from "../../Assets/hero.png";
// import aboutus1 from "../../Assets/aboutus1.png";
import aboutus2 from "../../Assets/aboutus2.png";
import event1 from "../../Assets/event1.png";
import event2 from "../../Assets/event2.png";
import event3 from "../../Assets/event3.png";
import event4 from "../../Assets/event4.png";
import contactus from "../../Assets/contactus.png";
import logopic from "../../Assets/logo_big.png";
import axios from "axios";

const Template1edit = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [logo, setLogo] = useState(logopic);
  const [ngoName, setNgoName] = useState("NGO name");
  const [aboutUsText, setAboutUsText] = useState(
    "Welcome to our website! We are a team of passionate individuals who and engaging. We are committed to delivering value to our users and helping them achieve their goals. Our team consists of experienced professionals who are experts in their respective fields. We have a diverse range of skills and expertise, allowing us to create a wide variety of content that caters to the needs of our users.We are constantly striving to improve and grow, and we welcome any feedback or suggestions from our users. Thank you for choosing to be a part of our community."
  );
  //   const [aboutUsImage1, setAboutUsImage1] = useState(aboutus1);
  const [aboutUsImage2, setAboutUsImage2] = useState(aboutus2);
  const [recentEvents, setRecentEvents] = useState([
    { id: 1, image: event1, description: "Description for Event 1" },
    { id: 2, image: event2, description: "Description for Event 2" },
    { id: 3, image: event3, description: "Description for Event 3" },
    { id: 4, image: event4, description: "Description for Event 4" },
  ]);
  const [email, setEmail] = useState("2021csb1137@iitrpr.ac.in");
  const [phoneNumber, setPhoneNumber] = useState("+91 8985618658");
  const [contactImage, setContactImage] = useState(contactus);

  const logoRef = useRef(null);
  //   const aboutUsImage1Ref = useRef(null);
  const aboutUsImage2Ref = useRef(null);
  const contactImageRef = useRef(null);

  //   useEffect(() => {
  //     // Function to send data to backend whenever inputs change
  //     sendDataToBackend();
  //   }, [
  //     logo,
  //     ngoName,
  //     aboutUsText,
  //     //aboutUsImage1,
  //     aboutUsImage2,
  //     recentEvents,
  //     email,
  //     phoneNumber,
  //     contactImage,
  //   ]);

  const sendDataToBackend = async () => {
    // Prepare data object to send to backend
    // const data = {
    //   logo,
    //   ngoName,
    //   aboutUsText,
    //   aboutUsImage1,
    //   //aboutUsImage2,
    //   recentEvents,
    //   email,
    //   phoneNumber,
    //   contactImage,
    // };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/templates/storetemplate`,
        {
          token,
          logo,
          ngoName,
          aboutUsText,
          aboutUsImage2,
          recentEvents,
          email,
          phoneNumber,
          contactImage,
        },
        { withCredentials: true }
      );
      console.log("Success:", response.data);
      // navigate("/Verification");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // axios
  //   .post("/template1", data)
  //   .then((response) => {
  //     console.log("Success:", response.data);
  //     // Handle success response from backend
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //     // Handle error
  //   });

  const handlePublish = () => {
    sendDataToBackend();
  };

  const handleLogoChange = (event) => {
    try {
      setLogo(URL.createObjectURL(event.target.files[0]));
    } catch (error) {
      console.error("Error creating object URL:", error);
    }
  };

  const handleLogoClick = (event) => {
    logoRef.current.click();
  };

  const handleNgoNameChange = (event) => {
    const value = event.target.value;
    const maxLength = 34;
    if (value.length <= maxLength) {
      setNgoName(value); // Update the input value state
    }
  };

  const handleAboutUsTextChange = (event) => {
    setAboutUsText(event.target.value);
  };

  //   const handleAboutUsImage1Change = (event) => {
  //     setAboutUsImage1(URL.createObjectURL(event.target.files[0]));
  //   };

  //   const handleAboutUsImage1Click = () => {
  //     aboutUsImage1Ref.current.click();
  //   };

  const handleAboutUsImage2Change = (event) => {
    setAboutUsImage2(URL.createObjectURL(event.target.files[0]));
  };

  const handleAboutUsImage2Click = () => {
    aboutUsImage2Ref.current.click();
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: recentEvents.length + 1,
      image: null,
      description: "",
    };
    setRecentEvents([...recentEvents, newEvent]);
  };

  const handleDeleteEvent = (id) => {
    setRecentEvents(recentEvents.filter((event) => event.id !== id));
  };

  const handleEventImageChange = (id, file) => {
    setRecentEvents(
      recentEvents.map((event) => {
        if (event.id === id) {
          return { ...event, image: URL.createObjectURL(file) };
        }
        return event;
      })
    );
  };

  const handleEventDescriptionChange = (id, description) => {
    setRecentEvents(
      recentEvents.map((event) => {
        if (event.id === id) {
          return { ...event, description };
        }
        return event;
      })
    );
  };

  // const handleEmailClick = () => {
  //   window.location.href = mailto:${email};
  // };

  // const handlePhoneClick = () => {
  //   window.location.href = tel:${phoneNumber};
  // };

  const handleContactImageClick = () => {
    contactImageRef.current.click();
  };

  const handleImageChange = (event) => {
    setContactImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div className="temp1">
      {" "}
      <header>
        <div className="logo">
          <div className="logopic" onClick={handleLogoClick}>
            {logo && <img src={logo} alt=" Logo" />}

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              ref={logoRef}
              className="Image-1"
            />
          </div>
          <div className="name">
            <textarea
              type="text"
              value={ngoName}
              onChange={handleNgoNameChange}
              className="name-text"
            />
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#Home">Home</a>
            </li>
            <li>
              <a href="#AboutUs">About Us</a>
            </li>
            <li>
              <a href="#Events">Recent Events</a>
            </li>
            <li>
              <a href="#ContactUs">Contact Us</a>
            </li>
          </ul>
        </nav>
      </header>
      <section id="Home" className="hero-section">
        <div className="image-slider-container">
          <div className="image-slider">
            <img src={hero} alt="opening face" />
          </div>
        </div>
      </section>
      <section id="AboutUs" className="about-section">
        <div className="about-content">
          <div className="about-heading">
            <h2>ABOUT US</h2>
          </div>

          <div className="about-text">
            <textarea
              type="text"
              value={aboutUsText}
              onChange={handleAboutUsTextChange}
              className="about-textarea"
            />
          </div>
        </div>
        <div className="about-images">
          {/* <div className="image-1" onClick={handleAboutUsImage1Click}>
            {aboutUsImage1 && <img src={aboutUsImage1} alt=" About us 1 Pic" />}

            <input
              type="file"
              accept="image/*"
              onChange={handleAboutUsImage1Change}
              ref={aboutUsImage1Ref}
              className="Image-2"
            />
          </div> */}
          <div className="image-2" onClick={handleAboutUsImage2Click}>
            {aboutUsImage2 && <img src={aboutUsImage2} alt=" About us 2 Pic" />}

            <input
              type="file"
              accept="image/*"
              onChange={handleAboutUsImage2Change}
              ref={aboutUsImage2Ref}
              className="Image-3"
            />
          </div>
        </div>
      </section>
      <section id="Events" className="events-section">
        <h2 className="event-heading"> RECENT EVENTS</h2>
        <div className="event-container">
          {recentEvents.map((event) => (
            <div key={event.id} className="event">
              {event.image && (
                <img
                  src={event.image}
                  alt={`Event ${event.id}`}
                  className="event-image"
                />
              )}
              <div className="event-description">
                <textarea
                  type="text"
                  value={event.description}
                  onChange={(e) =>
                    handleEventDescriptionChange(event.id, e.target.value)
                  }
                />
              </div>

              <div className="event-actions">
                <button onClick={() => handleDeleteEvent(event.id)}>
                  Delete Event
                </button>
                <input
                  type="file"
                  onChange={(e) =>
                    handleEventImageChange(event.id, e.target.files[0])
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <button className="add-button" onClick={handleAddEvent}>
          Add Event
        </button>
      </section>
      <footer id="ContactUs" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <div className="image-container" onClick={handleContactImageClick}>
              {contactImage && <img src={contactImage} alt="Contact Pic" />}

              <input
                id="contactImageInput"
                type="file"
                onChange={handleImageChange}
                ref={contactImageRef}
                className="Image-4"
              />
            </div>

            <div className="connect-text">
              <h2>Connect With Us</h2>
            </div>
          </div>
          <div className="contact-details">
            <textarea
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // onClick={handleEmailClick}
            />
            <textarea
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              // onClick={handlePhoneClick}
            />
          </div>
          <div className="contact-buttons">
            <button className="volunteer-button">Volunteer</button>
            <button className="donor-button">Donor</button>
          </div>
          <button className="publish-button" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Template1edit;
