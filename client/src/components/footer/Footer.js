import React from "react";

import "./Footer.css";

export default () => {
  return (
    <footer className="footer bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} <a href="https://soumya.dev" target="_blank">Soumya Ranjan Mohanty</a>
    </footer>
  );
};
