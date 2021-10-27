import React from "react";

const SideBar = () => {
  return (
    <div
      className="flex-shrink-0 ps-3 pb-3 bg-white position-fixed "
      id="sidebar"
    >
      <button
        className="btn btn-sm btn-light float-end d-lg-none mb-3"
        id="sidebar-toggle-btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseContent"
        aria-expanded="true"
        aria-controls="collapseContent"
      >
        <i className="bi bi-list"></i>
      </button>
      <ul className="list-unstyled collapse d-lg-block" id="collapseContent">
        <li className="my-3 ">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#tags-collapse"
            aria-expanded="false"
          >
            Popular Tags
          </button>
          <div className="collapse show" id="tags-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-dark rounded">
                  Covid
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Climate
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  Singapore
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1 ">
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#archives-collapse"
            aria-expanded="false"
          >
            Archives
          </button>
          <div className="collapse show" id="archives-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-dark rounded">
                  October 2021
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  September 2021
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  August 2021
                </a>
              </li>
              <li>
                <a href="#" className="link-dark rounded">
                  July 2021
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="border-top my-3"></li>
      </ul>
    </div>
  );
};

export default SideBar;
