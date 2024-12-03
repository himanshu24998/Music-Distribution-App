import "./AboutUs.css";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div>
      <div className="hero-section">
        <h1>Empowering Creators, Enabling Collaboration</h1>
        <p>Your Destination for Music Sharing, Licensing, and Inspiration</p>
        <Link to={"/dashboard/home"} className="btn btn-primary mt-3">
          Get Started
        </Link>
      </div>

      <div className="container my-5">
        <div className="section">
          <h2>Our Mission</h2>
          <p>
            We aim to create a safe, collaborative, and secure space for
            musicians to upload, license, and share their creations, helping the
            next generation of artists reach their full potential.
          </p>
        </div>

        <div className="section bg-light">
          <h2>Our Story</h2>
          <p>
            Our platform was born out of a love for music and a passion for
            creative collaboration. We wanted to give every artist a voice and a
            space to share their craft in a copyright-friendly environment.
          </p>
        </div>

        <div className="section">
          <h2>How It Works</h2>
          <ul className="list-unstyled">
            <li>
              <strong>Upload</strong>: Easily upload your tracks, beats, or
              samples.
            </li>
            <li>
              <strong>Share</strong>: Connect with other creators, share music,
              and gain feedback.
            </li>
            <li>
              <strong>License</strong>: Receive digital licenses for your work
              to ensure copyright protection.
            </li>
            <li>
              <strong>Purchase & Collaborate</strong>: Buy samples, collaborate,
              and expand your music library.
            </li>
          </ul>
        </div>

        <div className="section bg-light">
          <h2>Meet Our Team</h2>
          <div className="row">
            <div className="col-md-4 team-member">
              <img src="team-member-1.jpg" alt="Team Member 1" />
              <h5 className="mt-3">Himanshu Singhal</h5>
              <p>Founder & CEO</p>
            </div>
            <div className="col-md-4 team-member">
              <img src="team-member-2.jpg" alt="Team Member 2" />
              <h5 className="mt-3">Himanshu Singhal</h5>
              <p>Lead Developer</p>
            </div>
            <div className="col-md-4 team-member">
              <img src="team-member-3.jpg" alt="Team Member 3" />
              <h5 className="mt-3">Himanshu Singhal</h5>
              <p>Content Manager</p>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Why Choose Us?</h2>
          <ul className="list-unstyled">
            <li>
              <strong>Secure Licensing</strong>: Every track is protected with
              secure licensing.
            </li>
            <li>
              <strong>Community Focused</strong>: Connect and collaborate with a
              supportive community of creators.
            </li>
            <li>
              <strong>User-Friendly</strong>: Upload, share, and license music
              effortlessly.
            </li>
            <li>
              <strong>Support Team</strong>: Dedicated support to assist you
              every step of the way.
            </li>
          </ul>
        </div>

        <div className="section bg-light">
          <h2>What Creators Are Saying</h2>
          <blockquote className="blockquote testimonial">
            <p>
              "This platform has changed the way I share and protect my music!"
            </p>
            <footer className="blockquote-footer">
              DJ Rock, <cite title="Source Title">Music Producer</cite>
            </footer>
          </blockquote>
        </div>

        <div className="section">
          <h2>Get in Touch</h2>
          <p>
            We’re here to help. Have questions or feedback? Reach out to us
            anytime!
          </p>
          <Link
            to="/dashboard/help-and-support"
            className="btn btn-outline-primary"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
