gsap.registerPlugin(ScrollTrigger);

// ===============================
// CURSOR FOLLOW
// ===============================
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
    });
});

// ===============================
// 3D PARALLAX LAYERS
// ===============================
document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;

    gsap.to(".hero", { x: x, y: y, duration: 0.6 });
    gsap.to(".grid", { x: x / 2, y: y / 2 });
    gsap.to(".panel", { x: x * 1.5, y: y * 1.5 });
});

// ===============================
// MAGNETIC BUTTON
// ===============================
const magnet = document.querySelector(".magnetic");

magnet.addEventListener("mousemove", (e) => {
    const rect = magnet.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(magnet, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
    });
});

magnet.addEventListener("mouseleave", () => {
    gsap.to(magnet, { x: 0, y: 0, duration: 0.4 });
});

// ===============================
// SPLIT TEXT INTRO
// ===============================
const split = new SplitType(".title", { types: "chars" });

gsap.from(".char", {
    opacity: 0,
    y: 80,
    rotateX: -90,
    stagger: 0.03,
    duration: 1.2,
});

// ===============================
// BOOT SEQUENCE INTRO
// ===============================
const boot = gsap.timeline();

boot.from(".logo", { y: -20, opacity: 0, duration: 0.6 })
    .from(".menu a", { y: -10, opacity: 0, stagger: 0.1 })
    .from(".desc", { opacity: 0, y: 20 })
    .from(".cta", { scale: 0.8, opacity: 0 });

gsap.fromTo(".panel", { scale: 0, opacity: 0, duration: 1, stagger: 0.2 }, { scale: 1, opacity: 1 });

// ===============================
// SCROLL TIMELINE
// ===============================
gsap.to(".hero", {
    scale: 1.2,
    opacity: 0,
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
    },
});

// ===============================
// PANEL ANIMATION LOOP
// ===============================
gsap.to(".panel", {
    y: 10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.2,
});

// ===============================
// MODAL DATA
// ===============================
const data = {
    p1: "SYSTEM ONLINE\nAll core nodes are stable.\nLatency: 12ms\nStatus: OK",
    p2: "NODE ANALYSIS\nMemory allocation balanced.\nCPU load: 34%\nNetwork: secure",
    p3: "REALTIME METRICS\nFPS stable at 60\nRender pipeline optimized\nNo anomalies detected",
};

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".modal-overlay");
const modalText = document.querySelector(".modal-text");
const closeBtn = document.querySelector(".close");

// ===============================
// OPEN MODAL
// ===============================
document.querySelectorAll(".panel").forEach((panel) => {
    panel.addEventListener("click", () => {
        const key = panel.classList[1];

        modalText.innerText = data[key] || "NO DATA AVAILABLE";

        gsap.to(overlay, {
            opacity: 1,
            pointerEvents: "all",
            duration: 0.4,
        });

        gsap.to(modal, {
            opacity: 1,
            scale: 1,
            pointerEvents: "all",
            duration: 0.5,
            ease: "power3.out",
        });

        // small depth effect
        gsap.to(".hero, .header", {
            scale: 0.98,
            filter: "blur(2px)",
            duration: 0.4,
        });
    });
});

// ===============================
// CLOSE MODAL FUNCTION
// ===============================
function closeModal() {
    gsap.to(overlay, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
    });

    gsap.to(modal, {
        opacity: 0,
        scale: 0.8,
        pointerEvents: "none",
        duration: 0.3,
    });

    gsap.to(".hero, .header", {
        scale: 1,
        filter: "blur(0px)",
        duration: 0.3,
    });
}

// click close
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// ESC key
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

// drops
const drops = document.querySelectorAll(".drop");
const svg = document.querySelector(".ink-lines");

// init random positions
drops.forEach((drop) => {
    gsap.set(drop, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0.5 + Math.random(),
        opacity: 0.3 + Math.random() * 0.4,
    });

    animateDrop(drop);
});

function animateDrop(drop) {
    const duration = 6 + Math.random() * 8;

    gsap.to(drop, {
        x: "+=" + (Math.random() * 250 - 125),
        y: "+=" + (Math.random() * 250 - 125),
        duration: duration,
        ease: "sine.inOut",
        onComplete: () => animateDrop(drop),
    });

    gsap.to(drop, {
        scale: 0.8 + Math.random() * 1.2,
        duration: duration / 2,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
    });
}

// ===============================
// NETWORK CONNECTION SYSTEM
// ===============================
function drawLines() {
    svg.innerHTML = "";

    const points = [];

    drops.forEach((d) => {
        const rect = d.getBoundingClientRect();
        points.push({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        });
    });

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const a = points[i];
            const b = points[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // only connect near nodes
            if (dist < 220) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

                line.setAttribute("x1", a.x);
                line.setAttribute("y1", a.y);
                line.setAttribute("x2", b.x);
                line.setAttribute("y2", b.y);

                // fade based on distance
                const opacity = 1 - dist / 220;

                line.setAttribute("stroke", `rgba(0,0,0,${opacity * 0.3})`);

                svg.appendChild(line);
            }
        }
    }

    requestAnimationFrame(drawLines);
}

drawLines();
