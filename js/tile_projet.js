gsap.registerPlugin(EaselPlugin);
import {domain} from "./domain.js";

const ROWS = 3;
const COLS = 3;
const BLOCK_SIZE = 50;
const COOLDOWN = 1000;
let isFlipped = false;
let index_domain = 0;

function createTiles(row, col) {
    const tile = document.createElement("div");
    tile.className = "tile";

    let domain_title = "";

    if (index_domain >= domain.length) {
        domain_title = "";
    } else {
        domain_title = domain[index_domain].title;
    }

    tile.innerHTML = `
        <div data-domain="${domain_title}" class="tile-face-projet tile-front-projet" ></div>
        <div data-domain="${domain_title}" class="tile-face-projet tile-back-projet" ></div>
    `;

    index_domain++;

    const bgPosition = `${col * 20}% ${row * 20}%`;
    console.log(row + " " + col)
    tile.querySelector(".tile-front-projet").style.backgroundPosition = bgPosition;
    tile.querySelector(".tile-back-projet").style.backgroundPosition = bgPosition;

    return tile;
}

function createBoard() {
    const board = document.querySelector(".board-projet");
    for (let i = 0; i < ROWS; i++) {
        const row = document.createElement("div");
        row.className = "row-tile";
        for (let j = 0; j < COLS; j++) {
            row.appendChild(createTiles(i, j));
        }
        board.appendChild(row);
    }
}

function initializeTileAnimation() {
    const tiles = document.querySelectorAll(".board-projet .tile");
    tiles.forEach((tile, index) => {
        let lastEnterTime = 0;

        tile.addEventListener("mouseenter", () => {
            const currentTime = Date.now();
            if (currentTime - lastEnterTime > COOLDOWN) {
                lastEnterTime = currentTime;
                let tiltY;
                // Ajustement des tilts pour les 3x3
                if (index % 3 === 0) {
                    tiltY = -40;
                } else if (index % 3 === 1) {
                    tiltY = 40;
                } else { // index % 3 === 2
                    tiltY = -20;
                }
                animateTile(tile, tiltY);
            }
        });
    });
}

function animateTile(tile, tiltY) {
    gsap
        .timeline()
        .set(tile, {rotateX: isFlipped ? 180 : 0, rotateY: 0})
        .to(tile, {
            rotateX: isFlipped ? 450 : 270,
            rotateY: tiltY,
            duration: 0.5,
            ease: "power2.out"
        })
        .to(tile, {
            rotateX: isFlipped ? 540 : 360,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.25");
}

function createBlocks() {
    const blocksContainer = document.getElementById("blocks-projet");
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const numCols = Math.ceil(screenWidth / BLOCK_SIZE);
    const numRow = Math.ceil(screenHeight / BLOCK_SIZE);
    const numsBlocks = numCols * numRow;

    for (let i = 0; i < numsBlocks; i++) {
        const block = document.createElement("div");
        block.classList.add("blocks-projet");
        block.dataset.index = i;
        blocksContainer.appendChild(block);
    }

    return {numCols, numsBlocks};
}

export async function initTileProjet() {
    createBoard();
    initializeTileAnimation();
    window.blockInfo = createBlocks();
}
