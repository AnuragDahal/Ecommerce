import { Link } from "react-router-dom";
import React from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <>
      <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
