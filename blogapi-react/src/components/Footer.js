import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="d-flex fixed-bottom justify-content-between pt-3 border-top bg-light">
        <div className="container">
          <div className="d-flex  justify-content-between">
            <small>© 2021 Blog Site, Inc. All rights reserved.</small>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
