import React from "react";
import Editor from "../components/editor/editor";

const Home = () => {
  return (
    <div>
      <Editor editable initialDoc={""} />
    </div>
  );
};

export default Home;
