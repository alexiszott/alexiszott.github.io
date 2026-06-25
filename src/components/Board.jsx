import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ROWS = 6;
const COLS = 6;
const COOLDOWN = 1000;

export default function Board() {
  const boardRef = useRef(null);
  const tilesRef = useRef([]);
  const blocksRef = useRef(null);
  const isFlippedRef = useRef(false);
  const lastEnterTimesRef = useRef(new Array(ROWS * COLS).fill(0));
  const [numBlocks, setNumBlocks] = useState(0);

  useEffect(() => {
    const BLOCK_SIZE = 50;
    const calculateBlocks = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const numCols = Math.ceil(screenWidth / BLOCK_SIZE);
      const numRow = Math.ceil(screenHeight / BLOCK_SIZE);
      setNumBlocks(numCols * numRow);
    };

    calculateBlocks();
    window.addEventListener("resize", calculateBlocks);
    return () => {
      window.removeEventListener("resize", calculateBlocks);
    };
  }, []);

  useEffect(() => {
    let timeoutId;
    let time = 5000;

    const startFlipTimer = () => {
      timeoutId = setTimeout(() => {
        isFlippedRef.current = !isFlippedRef.current;
        const currentFlipped = isFlippedRef.current;

        // Filter out any null/undefined references
        const activeTiles = tilesRef.current.filter(Boolean);

        gsap.to(activeTiles, {
          rotateX: currentFlipped ? 180 : 0,
          duration: 1,
          stagger: {
            amount: 0.5,
            from: "random",
          },
          ease: "power2.inOut",
        });

        time = Math.floor(Math.random() * (20000 - 10000) + 10000);
        startFlipTimer();
      }, time);
    };

    startFlipTimer();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleMouseEnter = (index) => {
    const currentTime = Date.now();
    if (currentTime - lastEnterTimesRef.current[index] > COOLDOWN) {
      lastEnterTimesRef.current[index] = currentTime;

      let tiltY;
      if (index % 6 === 0) {
        tiltY = -40;
      } else if (index % 6 === 5) {
        tiltY = 40;
      } else if (index % 6 === 1) {
        tiltY = -20;
      } else if (index % 6 === 4) {
        tiltY = 20;
      } else if (index % 6 === 2) {
        tiltY = -10;
      } else {
        tiltY = 10;
      }

      const tile = tilesRef.current[index];
      if (tile) {
        const isFlipped = isFlippedRef.current;
        gsap
          .timeline()
          .set(tile, { rotateX: isFlipped ? 180 : 0, rotateY: 0 })
          .to(tile, {
            rotateX: isFlipped ? 450 : 270,
            rotateY: tiltY,
            duration: 0.5,
            ease: "power2.out",
          })
          .to(
            tile,
            {
              rotateX: isFlipped ? 540 : 360,
              rotateY: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.25"
          );
      }
    }
  };

  const rows = [];
  for (let r = 0; r < ROWS; r++) {
    const cols = [];
    for (let c = 0; c < COLS; c++) {
      cols.push({ row: r, col: c });
    }
    rows.push(cols);
  }

  return (
    <section className="board" ref={boardRef}>
      <div className="chromatic-aberration"></div>
      
      {rows.map((rowTiles, rIndex) => (
        <div className="row-tile" key={rIndex}>
          {rowTiles.map((tileInfo, cIndex) => {
            const tileIndex = rIndex * COLS + cIndex;
            const bgPosition = `${tileInfo.col * 20}% ${tileInfo.row * 20}%`;
            return (
              <div
                className="tile"
                key={cIndex}
                ref={(el) => (tilesRef.current[tileIndex] = el)}
                onMouseEnter={() => handleMouseEnter(tileIndex)}
              >
                <div
                  className="tile-face tile-front rounded-lg"
                  style={{ backgroundPosition: bgPosition }}
                ></div>
                <div
                  className="tile-face tile-back rounded-lg"
                  style={{ backgroundPosition: bgPosition }}
                ></div>
              </div>
            );
          })}
        </div>
      ))}

      <div className="blocks-container">
        <div className="blocks" ref={blocksRef}>
          {Array.from({ length: numBlocks }).map((_, i) => (
            <div className="block" key={i} data-index={i}></div>
          ))}
        </div>
      </div>
    </section>
  );
}
