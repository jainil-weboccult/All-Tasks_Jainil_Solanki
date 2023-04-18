import React from "react";
import Logo from "../../assets/Logo.svg";

const Navbar = () => {
  
  return (
    <nav>
      <div className={`w-full z-30 py-6 max-w-5/6 flex justify-center`}>
        <div className={``}>
            <div className={``}>
              <img src={Logo} alt="logo" />
            </div>
            <div>
              <ul
                className={`text-white-20 text-font-20 font-bold-50 gap-6`}
              >
                <li>ABOUT</li>
                <li>WHAT I DO</li>
                <li>WORK</li>
                <li>CONTACT</li>
              </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
