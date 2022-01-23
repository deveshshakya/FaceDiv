export const particlesOptions = {
  particles: {
    color: { value: "#ffffff" },
    line_linked: {
      color: "#000000",
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      bounce: true,
      direction: "none",
      enable: true,
      out_mode: "out",
      random: false,
      speed: 2,
      straight: false
    },
    number: { density: { enable: true, value_area: 800 }, value: 20 },
    size: {
      anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
      random: true,
      value: 3
    }
  }
}