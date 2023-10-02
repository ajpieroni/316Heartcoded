import React, { useState, useEffect } from "react";
import PersonTab from "../components/PersonTab";
import "./AboutUs.css";
import Image from "../assets/new-team-photo.jpeg";
import { useMediaQuery } from "@mui/material";


const AboutUs = () => {
  const [showStaffMembers, setShowStaffMembers] = useState(false);
  const toggleStaffMembers = () => {
    setShowStaffMembers(!showStaffMembers);
  };

  const [showTeam, setShowTeam] = useState(false);
  const toggleTeam = () => {
    setShowTeam(!showTeam);
  };

  const [showSponsors, setShowSponsors] = useState(false);
  const toggleSponsors = () => {
    setShowSponsors(!showSponsors);
  };

  const isMobile = useMediaQuery("(max-width: 600px)");

  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const showDescription = () => {
    console.log('showDescription function called');
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div className={`AboutUs ${isMobile ? "mobile" : ""}`}>
      <div className="about-wrapper">
        <h1 className="page-title">About Us</h1>
        <div
          tabIndex="0"
          role="region"
          aria-label="Mail Staff"
          className={`mail-staff ${isMobile ? "toggleable" : ""} ${
            showStaffMembers ? "active" : ""
          }`}
          onClick={toggleStaffMembers}
          aria-expanded={showStaffMembers}
        >
          <h2>Mail Staff</h2>
          {(!isMobile || showStaffMembers ) && (
            <div className="members">
              <div className="mission-statement">
                <p>
                  The Campus Mail Services (CMS) mission is to provide
                  exceptional mail services to all Duke University and Health
                  System patrons. With over 379 years of combined mail
                  experience and years of service at Duke, Campus Mail Services
                  staff prides itself on providing expedient delivery and
                  courteous mail services to students, faculty and staff within
                  the Duke community.
                </p>
                <p>
                  The CMS department acts as the liaison between many internal
                  departments and organizations within the Duke network. We
                  strive to build good working relationships and incorporate
                  best mailing practices to ensure efficient and accurate
                  handling of U.S. Postal Service mail, packages, and Duke
                  inter-campus mail.
                </p>
              </div>
              <p>
                Reach out with questions or comments at{" "}
                <a href="#">dukepostoffice@duke.edu</a>.
              </p>
              <p>
                Find more information about the mail center{" "}
                <a href="https://postoffice.duke.edu/">here.</a>
              </p>
              {/* <PersonTab personName={staff1} description={sdesc1} />
              <PersonTab personName='Ria Kapoor' description="Ria is a placeholder!"/>
              <PersonTab personName='Biruk Amene' description="Biruk is also a placeholder!"/>
              <PersonTab />
              <PersonTab />
              <PersonTab /> */}
            </div>
          )}
        </div>
        <div
          tabIndex="0"
          role="region"
          aria-label="Developer Team"
          aria-describedby="Developer Team, Click to Expand"
          className={`dev-team ${isMobile ? "toggleable" : ""} ${
            showTeam ? "active" : ""
          }`}
          onClick={toggleTeam}
        >
          <h2>Development Team</h2>
          {(!isMobile || showTeam || isDescriptionVisible) && (
            <>
              <div id="student-team">
                {/* TODO: add photo :) */}
                <div id="new-team-photo">
                  {/* <img src = {Image} alt = "Duke students standing in the Allen Board Room" className="team-photo"/> */}
                </div>
                <p id="team-desc">
                  The 2023 Code+ Campus Mail Package Pickup Team (from left to
                  right): Bea Radtke, Eileen Cai, Biruk Amene, Aaron Diefes,
                  Alex Pieroni, Ria Kapoor.
                </p>
              </div>
              <h3>Team Leads</h3>
              <div id="team-leads">
                <PersonTab personName="Harry Thakkar" />
                <PersonTab personName="Maulik Parikh" />
              </div>

              <div id ="maulik-photo"> </div>

              <button id="project-button" onClick={showDescription}>
                Read About the Project
              </button>
              {isDescriptionVisible && (
                <p id="toggled">
                  <a href="https://codeplus.duke.edu/projects/campus-mail-package-pickup">A team of students</a> collaborated with the Office of Information
                  Technology and Campus Mail Services to develop a web app
                  called the Package Pickup Hub. The app aims to solve the
                  problem of long lines at the Student Mailbox Center by
                  providing an efficient solution for students to collect their
                  packages. The Package Pickup Hub offers students access to
                  their mail information, including their box number and a list
                  of currently available packages for pickup. Additionally, it
                  enables students to select a preferred time for package
                  pickup, streamlining the process and reducing waiting times.
                  Duke Campus Mailbox Services sought an IT solution to address
                  the increased stress on staff and capacity following the
                  COVID-19 pandemic, which led to a significant rise in the
                  handling of parcels for students. The team's solution involves
                  creating a student portal that seamlessly integrates with the
                  Package Training system from DPO (presumably a package
                  delivery organization). Through this portal, students can
                  easily schedule their pickup time from a list of available
                  slots, further optimizing the package collection process.
                </p>
              )}
            </>
          )}
        </div>
        <div
          tabIndex="0"
          aria-label="Our Sponsors"
          role="region"
          className={`sponsors ${isMobile ? "toggleable" : ""} ${
            showSponsors ? "active" : ""
          }`}
          onClick={toggleSponsors}
        >
          <h2>Our Sponsors</h2>
          {(!isMobile || showSponsors) && (
            <div id="logos">
              <div className="sponsor-placeholder"></div>
              <div className="sponsor-placeholder"></div>
              <div className="sponsor-placeholder"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
