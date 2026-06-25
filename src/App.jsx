import React, { useState } from "react";
import Board from "./components/Board";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ProjectDetail from "./components/ProjectDetail";
import Footer from "./components/Footer";

export default function App() {
  const [currentProject, setCurrentProject] = useState(null);

  return (
    <>
      <div className="chromatic-background"></div>
      
      {currentProject ? (
        <ProjectDetail
          projectId={currentProject}
          onBack={() => setCurrentProject(null)}
        />
      ) : (
        <>
          <div className="relative w-full">
            <Board />
            <div className="pixelated-blur-bottom"></div>
          </div>
          <About />
          <Projects onSelectProject={setCurrentProject} />
          <Contact />
        </>
      )}
      <Footer />
    </>
  );
}
