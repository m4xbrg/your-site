import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Correct cross-platform repo root resolution
const root = fileURLToPath(new URL("..", import.meta.url));
const contentDir = path.join(root, "src", "content");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeFileIfMissing(p, content) {
  if (fs.existsSync(p)) return;
  fs.writeFileSync(p, content, "utf8");
  console.log("Created", p);
}

// 1. Physics subject
function subjectFrontmatter() {
  return `---
title: Physics
order: 2
description: The study of physical quantities, interactions, and laws governing systems across scales.
---
`;
}

// 2. Macro-courses
const physicsMacroCourses = [
  {
    id: "physics-foundations",
    title: "Foundations of Physical Modelling",
    description:
      "Physical quantities, units, dimensions, vectors, fields, symmetries, and modelling principles.",
    order: 1,
  },
  {
    id: "physics-mechanics",
    title: "Classical Mechanics",
    description:
      "Kinematics, forces, energy, momentum, rotational motion, oscillations, and Lagrangian structure.",
    order: 2,
  },
  {
    id: "physics-waves",
    title: "Waves, Oscillations & Fourier Structure",
    description:
      "Simple harmonic motion, wave equations, interference, and Fourier analysis of signals.",
    order: 3,
  },
  {
    id: "physics-thermodynamics",
    title: "Thermodynamics & Statistical Structure",
    description:
      "Thermodynamic variables, laws, entropy, and microscopic statistical models.",
    order: 4,
  },
  {
    id: "physics-electricity-magnetism",
    title: "Electromagnetism",
    description:
      "Electrostatics, potentials, magnetostatics, Maxwell’s equations, and electromagnetic waves.",
    order: 5,
  },
  {
    id: "physics-optics",
    title: "Optics",
    description:
      "Geometric optics, wave optics, diffraction, interference, and polarization.",
    order: 6,
  },
  {
    id: "physics-modern",
    title: "Modern Foundations",
    description:
      "Special relativity, origins of quantum theory, and atomic/subatomic structure.",
    order: 7,
  },
  {
    id: "physics-quantum",
    title: "Quantum Mechanics",
    description:
      "Quantum states, operators, dynamics, angular momentum, and measurement.",
    order: 8,
  },
  {
    id: "physics-relativity",
    title: "Relativistic Physics",
    description:
      "Special relativity, tensor calculus for physics, and curved spacetime and gravity.",
    order: 9,
  },
];

// 3. Courses
const physicsCourses = [
  // Foundations
  {
    id: "physics-foundations-quantities-units",
    macroId: "physics-foundations",
    title: "Physical Quantities, Units & Dimensions",
    description:
      "Quantities, units, dimensions, and dimensional analysis as the basis of physical modelling.",
    order: 1,
  },
  {
    id: "physics-foundations-vectors-geometry",
    macroId: "physics-foundations",
    title: "Vectors, Fields & Spatial Structure",
    description:
      "Vector quantities, fields, coordinate systems, and geometric structure in space.",
    order: 2,
  },
  {
    id: "physics-foundations-symmetries",
    macroId: "physics-foundations",
    title: "Symmetries & Conservation Principles",
    description:
      "Symmetries in physical systems and their relation to conserved quantities.",
    order: 3,
  },
  {
    id: "physics-foundations-modelling",
    macroId: "physics-foundations",
    title: "Physical Modelling & Approximation Methods",
    description:
      "Idealization, approximation, and modelling strategies in physical theory.",
    order: 4,
  },

  // Mechanics
  {
    id: "physics-mechanics-kinematics",
    macroId: "physics-mechanics",
    title: "Kinematics of Particles & Systems",
    description:
      "Position, velocity, acceleration, and trajectories for particles and rigid bodies.",
    order: 1,
  },
  {
    id: "physics-mechanics-newtonian",
    macroId: "physics-mechanics",
    title: "Newtonian Dynamics",
    description:
      "Newton’s laws, forces, and equations of motion for particles and systems.",
    order: 2,
  },
  {
    id: "physics-mechanics-energy-momentum",
    macroId: "physics-mechanics",
    title: "Work, Energy, Momentum & Impulse",
    description:
      "Work–energy relations, kinetic and potential energy, momentum, and impulse.",
    order: 3,
  },
  {
    id: "physics-mechanics-rotation",
    macroId: "physics-mechanics",
    title: "Rotational Motion & Angular Momentum",
    description:
      "Rotational kinematics, torque, rotational dynamics, and angular momentum.",
    order: 4,
  },
  {
    id: "physics-mechanics-oscillations",
    macroId: "physics-mechanics",
    title: "Oscillations & Mechanical Resonance",
    description:
      "Simple harmonic motion, damped and driven oscillations, and resonance.",
    order: 5,
  },
  {
    id: "physics-mechanics-lagrangian",
    macroId: "physics-mechanics",
    title: "Lagrangian & Variational Mechanics",
    description:
      "Principle of least action, generalized coordinates, and Lagrange’s equations.",
    order: 6,
  },

  // Waves
  {
    id: "physics-waves-shm",
    macroId: "physics-waves",
    title: "Simple Harmonic Motion",
    description:
      "Oscillatory systems, linear restoring forces, and harmonic solutions.",
    order: 1,
  },
  {
    id: "physics-waves-wave-equation",
    macroId: "physics-waves",
    title: "Wave Equation & Propagation",
    description:
      "Wave equations, solutions, propagation in one and higher dimensions.",
    order: 2,
  },
  {
    id: "physics-waves-interference",
    macroId: "physics-waves",
    title: "Interference & Superposition",
    description:
      "Superposition of waves, interference patterns, and standing waves.",
    order: 3,
  },
  {
    id: "physics-waves-fourier",
    macroId: "physics-waves",
    title: "Fourier Analysis & Spectral Decomposition",
    description:
      "Fourier series and transforms as representations of signals and waves.",
    order: 4,
  },

  // Thermodynamics
  {
    id: "physics-thermo-variables",
    macroId: "physics-thermodynamics",
    title: "Thermodynamic Variables & States",
    description:
      "State variables, equations of state, and thermodynamic description of systems.",
    order: 1,
  },
  {
    id: "physics-thermo-laws",
    macroId: "physics-thermodynamics",
    title: "Laws of Thermodynamics",
    description:
      "Zeroth, first, second, and third laws and their implications for physical processes.",
    order: 2,
  },
  {
    id: "physics-thermo-entropy",
    macroId: "physics-thermodynamics",
    title: "Entropy, Irreversibility & Equilibrium",
    description:
      "Entropy, irreversibility, and conditions for thermodynamic equilibrium.",
    order: 3,
  },
  {
    id: "physics-thermo-statistical",
    macroId: "physics-thermodynamics",
    title: "Statistical Ensembles & Microscopic Models",
    description:
      "Statistical ensembles, probability distributions, and microscopic interpretations.",
    order: 4,
  },

  // Electromagnetism
  {
    id: "physics-em-electrostatics",
    macroId: "physics-electricity-magnetism",
    title: "Charges, Fields & Gauss’s Law",
    description:
      "Electric charge, electric field, and flux with Gauss’s law.",
    order: 1,
  },
  {
    id: "physics-em-electric-potential",
    macroId: "physics-electricity-magnetism",
    title: "Electric Potentials & Energy",
    description:
      "Electric potential, potential energy, and conservative electric fields.",
    order: 2,
  },
  {
    id: "physics-em-magnetism",
    macroId: "physics-electricity-magnetism",
    title: "Magnetic Fields & Ampère’s Law",
    description:
      "Magnetic fields, forces on currents, and Ampère’s law in magnetostatics.",
    order: 3,
  },
  {
    id: "physics-em-maxwell",
    macroId: "physics-electricity-magnetism",
    title: "Maxwell’s Equations & Electromagnetic Waves",
    description:
      "Integral and differential forms of Maxwell’s equations and EM waves.",
    order: 4,
  },

  // Optics
  {
    id: "physics-optics-geometric",
    macroId: "physics-optics",
    title: "Geometric Optics & Ray Models",
    description:
      "Rays, reflection, refraction, and imaging systems in geometric optics.",
    order: 1,
  },
  {
    id: "physics-optics-wave",
    macroId: "physics-optics",
    title: "Wave Optics, Diffraction & Interference",
    description:
      "Diffraction, interference, and wave-based descriptions of optical phenomena.",
    order: 2,
  },
  {
    id: "physics-optics-polarization",
    macroId: "physics-optics",
    title: "Polarization & Optical Media",
    description:
      "Polarization states, optical media, and polarization-based effects.",
    order: 3,
  },

  // Modern
  {
    id: "physics-modern-relativity",
    macroId: "physics-modern",
    title: "Special Relativity & Spacetime Structure",
    description:
      "Relativistic kinematics, Lorentz transformations, and spacetime geometry.",
    order: 1,
  },
  {
    id: "physics-modern-quantum-origins",
    macroId: "physics-modern",
    title: "Origins of Quantum Theory",
    description:
      "Historical and conceptual origins of quantum theory and early experiments.",
    order: 2,
  },
  {
    id: "physics-modern-atomic",
    macroId: "physics-modern",
    title: "Atomic & Subatomic Structure",
    description:
      "Models of the atom, nuclear structure, and subatomic particles.",
    order: 3,
  },

  // Quantum
  {
    id: "physics-quantum-states",
    macroId: "physics-quantum",
    title: "State Vectors & Hilbert Spaces",
    description:
      "State vectors, inner products, and Hilbert space structure in QM.",
    order: 1,
  },
  {
    id: "physics-quantum-operators",
    macroId: "physics-quantum",
    title: "Operators, Observables & Commutators",
    description:
      "Operators as observables, spectra, and commutation relations.",
    order: 2,
  },
  {
    id: "physics-quantum-schrodinger",
    macroId: "physics-quantum",
    title: "Schrödinger Equation & Potentials",
    description:
      "Time-dependent and time-independent Schrödinger equations in common potentials.",
    order: 3,
  },
  {
    id: "physics-quantum-angular-momentum",
    macroId: "physics-quantum",
    title: "Angular Momentum & Spin",
    description:
      "Orbital angular momentum, spin, and addition of angular momenta.",
    order: 4,
  },
  {
    id: "physics-quantum-measurement",
    macroId: "physics-quantum",
    title: "Measurement, Probability & Interpretation",
    description:
      "Measurement postulates, probabilities, and interpretational questions in QM.",
    order: 5,
  },

  // Relativity
  {
    id: "physics-relativity-special",
    macroId: "physics-relativity",
    title: "Special Relativity & Lorentz Geometry",
    description:
      "Minkowski spacetime, Lorentz transformations, and relativistic dynamics.",
    order: 1,
  },
  {
    id: "physics-relativity-tensors",
    macroId: "physics-relativity",
    title: "Tensor Calculus for Physics",
    description:
      "Tensors, indices, and covariant formulations of physical laws.",
    order: 2,
  },
  {
    id: "physics-relativity-gravity",
    macroId: "physics-relativity",
    title: "Curved Spacetime & Gravity",
    description:
      "Curvature, geodesics, and the Einstein field equations at a structural level.",
    order: 3,
  },
];

function macroFrontmatter({ id, title, description, order }) {
  return `---
id: ${id}
subject: physics
title: ${title}
description: ${description ? JSON.stringify(description) : ""}
order: ${order}
---
`;
}

function courseFrontmatter({ id, macroId, title, description, order }) {
  return `---
id: ${id}
subject: physics
macroId: ${macroId}
title: ${title}
description: ${description ? JSON.stringify(description) : ""}
order: ${order}
tags: []
learningGoals: []
outline: []
---
`;
}

function main() {
  // Subject
  const subjectsDir = path.join(contentDir, "subjects");
  ensureDir(subjectsDir);
  writeFileIfMissing(
    path.join(subjectsDir, "physics.md"),
    subjectFrontmatter()
  );

  // Macro-courses
  const macroDir = path.join(contentDir, "macro-courses");
  ensureDir(macroDir);
  for (const m of physicsMacroCourses) {
    const filePath = path.join(macroDir, `${m.id}.md`);
    writeFileIfMissing(filePath, macroFrontmatter(m));
  }

  // Courses
  const coursesDir = path.join(contentDir, "courses");
  ensureDir(coursesDir);
  for (const c of physicsCourses) {
    const filePath = path.join(coursesDir, `${c.id}.md`);
    writeFileIfMissing(filePath, courseFrontmatter(c));
  }
}

main();
