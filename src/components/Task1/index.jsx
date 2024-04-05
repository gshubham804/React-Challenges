import { useRef, useState, useEffect } from "react";
import "./style.css";

import {
  FaArrowAltCircleUp,
  FaArrowCircleRight,
  FaArrowCircleDown,
  FaArrowAltCircleLeft,
} from "react-icons/fa";

const Task1 = () => {
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [circleSize] = useState({ width: 24, height: 24 });
  const circleRef = useRef();
  const boundaryRef = useRef();
  const outerBoundaryRef = useRef();

  const handleArrow = (direction) => {
    const outerBoundary = outerBoundaryRef.current.getBoundingClientRect();
    const circleRect = circleRef.current.getBoundingClientRect();
    switch (direction) {
      case "up":
        if (outerBoundary.top < circleRect.top - 10)
          setCirclePosition((prev) => ({ ...prev, y: prev.y - 10 }));
        break;

      case "down":
        if (outerBoundary.bottom > circleRect.bottom + 10)
          setCirclePosition((prev) => ({ ...prev, y: prev.y + 10 }));
        break;

      case "left":
        if (outerBoundary.left < circleRect.left - 10)
          setCirclePosition((prev) => ({ ...prev, x: prev.x - 10 }));
        break;

      case "right":
        if (outerBoundary.right > circleRect.right + 10)
          setCirclePosition((prev) => ({ ...prev, x: prev.x + 10 }));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const boundaryRect = boundaryRef.current.getBoundingClientRect();
    const circleRect = circleRef.current.getBoundingClientRect();

    const isCircleInsideBoundary =
      circleRect.top >= boundaryRect.top &&
      circleRect.left >= boundaryRect.left &&
      circleRect.bottom <= boundaryRect.bottom &&
      circleRect.right <= boundaryRect.right;

    if (isCircleInsideBoundary) {
      alert("Circle is completely inside the boundary");
    }
  }, [circlePosition]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          handleArrow("up");
          break;
        case "ArrowDown":
          handleArrow("down");
          break;
        case "ArrowLeft":
          handleArrow("left");
          break;
        case "ArrowRight":
          handleArrow("right");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [circlePosition]);

  return (
    <>
      <div className="first-cont">
        <div className="first-cont-inner-cont" ref={outerBoundaryRef}>
          <span
            className="first-cont-inner-cont-circle"
            ref={circleRef}
            style={{
              top: `${circlePosition.y}px`,
              left: `${circlePosition.x}px`,
              width: `${circleSize.width}px`,
              height: `${circleSize.height}px`,
            }}
          ></span>

          <div className="circle-boundary" ref={boundaryRef}></div>
        </div>
      </div>
      <div className="outer-container">
        <div className="second-cont">
          <FaArrowAltCircleUp size={24} onClick={() => handleArrow("up")} />
          <div className="second-cont-middle-col">
            <FaArrowAltCircleLeft
              size={24}
              onClick={() => handleArrow("left")}
            />
            <FaArrowCircleRight
              size={24}
              onClick={() => handleArrow("right")}
            />
          </div>
          <FaArrowCircleDown size={24} onClick={() => handleArrow("down")} />
        </div>
      </div>
    </>
  );
};

export default Task1;
