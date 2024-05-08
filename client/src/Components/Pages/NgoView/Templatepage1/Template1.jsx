import React, { useState, useEffect } from "react";
import "./Template1.css";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { LuListTodo } from "react-icons/lu";
import anime from 'animejs/lib/anime.es.js';


import axios from "axios";

import setAuthHeaders from "../../../Utils/setAuthHeaders";
console.log("wughwhiowfwo")
const Template1 = () => {
  
  
  const [userrole, setrole] = useState("");
  const [aboutus_anim1, setaboutus_anim] = useState(null)
  const [aboutus_heading_anim1, setaboutus_heading_anim] = useState(null)
  const [aboutus_text_anim1, setaboutus_text_anim] = useState(null)
  const navigate = useNavigate();
    const [templateData,setTemplateData]=useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetchTemplateData();
        fetchRole(); // Fetch user profile data when component mounts
      }, []);
      useEffect(() => {  
        setaboutus_heading_anim(anime({
          targets:document.getElementById('about-heading-id1'),
          fontSize:['1%', '300%'],
          duration:2000,
          easing:'easeOutCubic',
          autoplay:false,
        }));
      
        setaboutus_text_anim(anime({
          targets:document.getElementById('about-text-id1'),
          fontSize:['0%', '100%'],
          width:['0%', '100%'],
          duration:2000,
          easing:'easeOutCubic',
          autoplay:false,
        }));
      
        setaboutus_anim(anime({
          targets:document.getElementById('about-section-id1'),
          backgroundImage:['linear-gradient(-90deg, rgba(123, 115, 107, 1) 0px, rgba(214, 207, 200, 1) 100%)',
            'linear-gradient(180deg, rgba(123, 115, 107, 1) 0px, rgba(214, 207, 200, 1) 100%)'],
          duration:4000,
          easing:'linear',
          loop:true,
          autoplay:false
        }));
      },[]);
      
      
      useEffect(() => {
          if (aboutus_heading_anim1) {
            window.addEventListener('scroll', ()=>{
              var scrollstat = (window.scrollY / window.innerHeight);
              aboutus_heading_anim1.seek(scrollstat * aboutus_heading_anim1.duration);
          });   
        }
      }, [aboutus_heading_anim1]);
      
      useEffect(() => {
          if (aboutus_text_anim1) {
            window.addEventListener('scroll', ()=>{
              if (window.scrollY < window.innerHeight){
                var scrollstat = (window.scrollY / window.innerHeight);  
              }
              else{
                var scrollstat = (2*window.innerHeight - window.scrollY)/window.innerHeight  
              }
              aboutus_text_anim1.seek(scrollstat * aboutus_text_anim1.duration);
          });   
        }
      }, [aboutus_text_anim1]);
      
      useEffect(() => {
          if (aboutus_anim1) {
            window.addEventListener('scroll', ()=>{
              // var scrollstat = (window.scrollY-window.innerHeight)/window.innerHeight;
              var scrollstat = (window.scrollY / window.innerHeight);
              aboutus_anim1.seek(scrollstat * aboutus_anim1.duration);
          });   
        }
      }, [aboutus_anim1]);
      
      const fetchTemplateData = async () => {
        try {
          const token = localStorage.getItem("token");
          const ngo_id = localStorage.getItem("ngo_id");
          console.log("hooo", ngo_id)
          setAuthHeaders(token);
          const response = await axios.post(`${apiUrl}/templates/fetchtemplate`, { token, ngo_id }, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          console.log("response down here");
          console.log(response);
          setTemplateData(response.data.template);
          console.log("temp down here");
          console.log(response.data.template.aboutUsText);
         
          
        } catch (error) {
          console.error("Error fetching Template data :", error);
        }
      }
      const handlerole = async (choosed_role) => {
        try{
          const token = localStorage.getItem("token");
          const ngo_id = localStorage.getItem("ngo_id");
          const role = choosed_role;
          const res = await axios.post(
            `${apiUrl}/roles/signupRole`,
            { ngo_id, role },
            { withCredintials: true, headers: {'Authorization': `Bearer ${token}`} }
          );
          console.log(res);
          if(res.status === 201){
            setrole(res.data.userRole.role);
            alert(`Signed up as ${choosed_role}`);
          }
        }
        catch (error){
          console.error("Error storing role:", error);
        }
      };
      const fetchRole = async () => {
        try{
          const token = localStorage.getItem("token");
          const ngo_id = localStorage.getItem("ngo_id");
          const res = await axios.post(
            `${apiUrl}/roles/fetchRole`,
            { ngo_id },
            { withCredintials: true,headers: {'Authorization': `Bearer ${token}`} }
          );
          if(res.status === 200 ){
            setrole(res.data.role.role);
          }
          console.log(res);
        }
        catch (error){
          console.error("Error fetching role:", error);
        }
      }
      const handleAllTasks = () => {
         navigate(`/AllTasks/${userrole}`);
        //navigate("/taskassign");
      };
  return (
      <div className="temp1">
    {templateData && (
      <>
        <header>
          <div className="logo1">
            <div className="logopic1">
              {/* Check if logo exists before rendering */}
              {templateData.logo && <img src={templateData.logo} alt="Logo" className="logo-img1"/>}
            </div>
            <div className="logo-name1">
              {templateData.name}
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
        <div id="Home" className="main-bg1">
          {/* Check if main exists before rendering */}
          {templateData.main && <img src={templateData.main} className="main-bg-image1" alt="Main" />}
          <div className="vision_view1">
            {templateData.visionText}
          </div>
        </div>
        <section className="about-section1" id="about-section-id1">
        <div className="about-content1">
          <div className="about-heading1" id="about-heading-id1">
            <div id="about-heading-id1">
                <h2 >ABOUT US</h2>
            </div>
          </div>
          <div className="about-text1" id="about-textarea-id1">
            <div className="about-textarea1"  id="about-text-id1">
                   {templateData.aboutUsText}
            </div>
          </div>
        </div>
        <div className="about-images1">
          <div className="about-images-11" >
            {<img src={templateData.aboutUsImage} alt="About us 2 Pic" className="about-image-2img1"/>}
          </div>
          <div className="about-images-21" >
            {<img src={templateData.aboutUsImage2} alt="About us 2 Pic" className="about-image-2img1"/>}
          </div>
        </div>
      </section>
      <section id="Events" className="events-section1">
        <h2 className="event-heading1"> RECENT EVENTS</h2>
        <div className="event-container1">
          {templateData.eventImages.length !==0 && (
           templateData.eventImages.map((image, index) => (
            <div key={index} className="event1">
              <div className="event-image1">
                <img
                  src={image} // Assuming each item in eventImages array is a URL string
                  className="event-image-img1"
                  alt={`Event ${index + 1}`}
                />
              </div>
              <div className="event-description1">
                <div className="event-description1-in">
                   {templateData.eventDescriptions[index]}
                </div>
              </div>
            </div>
          ))
          )}
        </div> 
        <div className="event-bottom-text1">
        {templateData.eventBottomText}
        </div>
      </section>
      <footer id="ContactUs" className="contact-section1">
        <div className="contact-container1">
          <div className="contact-info1">
            <div className="image-container1" >
              <img
                src={templateData.contactImage} // Assuming each item in eventImages array is a URL string
              />
            </div>            
          </div>
          <div className="connect-text1">
              <h2>Connect With Us</h2>
          </div>
          <div className="contact-details1">
           {templateData.email && <div className="contact-details-email1">
              <span className="contact-details-email-icon1"><IoIosMail /></span>
              {templateData.email}
            </div>}
           {templateData.phoneNumber && <div className="contact-details-phone1">
              <span className="contact-details-phone-icon1"><FaPhone /></span>
             {templateData.phoneNumber}
            </div>}            
            {templateData.xhandle && <div className="contact-details-x1">
              <span className="contact-details-x-icon1"><FaXTwitter /></span>
              {templateData.xhandle}
            </div>}
            {templateData.instahandle && <div className="contact-details-insta1">
              <span className="contact-details-insta-icon1"><FaInstagram /></span>
              {templateData.instahandle}
            </div>}
          </div>
         {userrole === "" && <div className="contact-buttons1">
            <button className="volunteer-button1" onClick={() => handlerole("volunteer")}>Want to contribute ? Click here to become a Volunteer</button>
            
          </div>
          }
          {/* {userrole === "volunteer" && <div className="contact-buttons1">
            <button className="volunteer-button1" onClick={() => handlerole("volunteer")}>Request to become Executive</button>
            
          </div>
          } */}
          { userrole !== "" && <div className=" list-icon" title="Explore Tasks">
             <LuListTodo  className="icon_list" onClick={handleAllTasks}/>
          </div>}
          
        </div>
      </footer>
        </>
    )}
  </div>
  )
  
}

export default Template1
