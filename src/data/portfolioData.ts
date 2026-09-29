export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'game-ai' | 'blockchain' | 'neuroevolution' | 'simulation';
  categoryLabel: string;
  technologies: string[];
  image?: string;
  summary: string;
  highlights: string[];
  problem: string;
  architecture: string;
  technicalChallenges: {
    challenge: string;
    solution: string;
  }[];
  systemMetrics: {
    label: string;
    value: string;
  }[];
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface ExperienceData {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  bulletPoints: string[];
  technologies: string[];
}

export interface EducationData {
  institution: string;
  degree: string;
  specialization?: string;
  location: string;
  period: string;
  highlights?: string[];
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    context: string;
    level?: string;
  }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Mubasheer Shaikh',
    title: 'GAME DEVELOPER × AI/ML ENGINEER',
    statement:
      'I build interactive worlds and intelligent systems — from adaptive game AI to cryptographic infrastructure and evolutionary neural networks.',
    bio: 'Game Developer and AI/ML enthusiast with hands-on experience building Unity-based games and intelligent systems. Passionate about the intersection of game development and artificial intelligence — from designing modular gameplay architectures to implementing reinforcement learning agents that bring game worlds to life. Equally comfortable diving into backend systems, cryptographic protocols, and machine learning pipelines. A fast learner by nature who actively seeks out new technologies, refines existing skills, and thrives in environments that reward curiosity and initiative.',
    email: 'mubasheershkh@gmail.com',
    phone: '(+91) 7021840296',
    github: 'https://github.com/MUBIUS',
    githubUsername: 'MUBIUS',
    location: 'Mumbra, Thane, Maharashtra 400612',
  },

  projects: [
    {
      id: 'iterum',
      title: 'ITERUM',
      subtitle: 'Arcade / Action Roguelike with Adaptive AI',
      tagline: 'Live Q-learning enemy agents adapting to real-time player combat telemetry.',
      category: 'game-ai',
      categoryLabel: 'Game AI & Reinforcement Learning',
      technologies: ['Unity', 'C#', 'Q-Learning', 'Reinforcement Learning', 'Procedural Generation'],
      summary:
        'Designed and built an arcade/action roguelike in Unity where enemy AI agents adapt their behaviour using live Q-learning trained off player action telemetry during gameplay. Engineered the full game loop including procedural level generation, player combat systems, and a real-time Q-learning reward pipeline.',
      highlights: [
        'Live Q-learning agent policies that counter repetitive player strategies in real-time',
        'Procedural dungeon generation system creating non-repetitive combat arenas',
        'Real-time telemetry pipeline discretizing player actions into dynamic reward vectors',
        'Decoupled Unity combat architecture with responsive hitboxes and projectile mechanics',
      ],
      problem:
        'Most roguelike enemy AI is purely deterministic or state-machine driven, making encounters predictable after a few runs. The challenge was building an enemy system that autonomously learns to flank, keep distance, or rush based on the specific player’s offensive patterns without lagging the 60 FPS Unity frame loop.',
      architecture:
        'The agent uses a discretized state representation (distance bands, player facing angle, player health tier, cooldown state) mapped to a high-speed Q-table. Reward signals update every action epoch: positive rewards for successful flanking maneuvers and damage dealt; penalties for entering player strike cones or taking critical hits.',
      technicalChallenges: [
        {
          challenge: 'State-space explosion vs runtime performance in Unity',
          solution:
            'Engineered compact state-space discretization with 4 distance zones and 4 directional sectors, keeping the Q-table footprint under 64 KB and lookups at O(1) in the C# game loop.',
        },
        {
          challenge: 'Exploration vs Exploitation balance during live gameplay',
          solution:
            'Implemented an epsilon-greedy policy with dynamic decay: high initial exploration per room so enemies test multiple tactics, settling into exploitation when player strategies solidify.',
        },
      ],
      systemMetrics: [
        { label: 'Agent Policy', value: 'Live Q-Learning' },
        { label: 'Engine', value: 'Unity / C#' },
        { label: 'Lookup Latency', value: '< 0.04 ms' },
        { label: 'Game Loop', value: 'Deterministic 60 FPS' },
      ],
      githubUrl: 'https://github.com/MUBIUS',
    },
    {
      id: 'genesis',
      title: 'GENESIS',
      subtitle: 'Full-Stack Blockchain & Script Interpreter',
      tagline: 'Custom elliptic curve cryptography and Bitcoin Script engine engineered from scratch.',
      category: 'blockchain',
      categoryLabel: 'Cryptographic Systems & Protocol',
      technologies: [
        'Python',
        'Flask',
        'ECDSA',
        'ECC',
        'UTXO Model',
        'Bitcoin Script',
        'Base58Check',
      ],
      summary:
        'Engineered a full-stack Bitcoin-like blockchain from the ground up, including a custom Elliptic Curve Cryptography (ECC) library for secure identity and transaction signing. Implemented a UTXO-based transaction model with P2PKH (Pay-to-Public-Key-Hash) scripting, ensuring robust cryptographic validation across all transactions. Built a custom Bitcoin Script interpreter executing core opcodes (OP_DUP, OP_HASH160, OP_EQUALVERIFY, OP_CHECKSIG) to replicate real transaction verification logic.',
      highlights: [
        'Custom ECC library implementing secp256k1 point multiplication, addition, and modular arithmetic',
        'ECDSA signature generation and cryptographic verification over transaction hashes',
        'UTXO ledger architecture preventing double-spending and orphan inputs',
        'Stack-based Bitcoin Script virtual machine executing OP_DUP, OP_HASH160, OP_EQUALVERIFY, and OP_CHECKSIG',
        'Base58Check encoding pipeline for address generation and checksum validation',
      ],
      problem:
        'Understanding blockchain protocols at a superficial level leaves critical cryptographic security and scripting intricacies hidden. The objective was to build every component from first principles—avoiding high-level cryptographic wrappers—to implement the mathematical elliptic curve operations and opcode execution stack.',
      architecture:
        'A modular Python protocol: Cryptographic layer (custom ECC point math + RFC 6979 deterministic nonce generation), Transaction layer (UTXO inputs, outputs, serialized ScriptSig and ScriptPubKey), Virtual Machine layer (dual-stack Forth-like script evaluator), and Network layer (Flask REST node API).',
      technicalChallenges: [
        {
          challenge: 'ECC Point Addition & Inversion in finite fields',
          solution:
            'Implemented the Extended Euclidean Algorithm for modular inverse calculations over prime field p, handling identity point at infinity edge cases seamlessly.',
        },
        {
          challenge: 'Replicating strict Bitcoin Script execution invariants',
          solution:
            'Constructed an execution stack where ScriptSig and ScriptPubKey are evaluated sequentially; implemented precise cryptographic opcode semantics where OP_CHECKSIG validates ECDSA signatures against the SHA256 double-hash of the transaction.',
        },
      ],
      systemMetrics: [
        { label: 'Curve', value: 'secp256k1' },
        { label: 'Script Model', value: 'P2PKH Stack VM' },
        { label: 'Transaction Model', value: 'UTXO' },
        { label: 'Opcodes', value: 'DUP, HASH160, EQUALVERIFY, CHECKSIG' },
      ],
      githubUrl: 'https://github.com/MUBIUS',
    },
    {
      id: 'neat-flappy',
      title: 'FLAPPY BIRD USING NEAT',
      subtitle: 'NeuroEvolution of Augmenting Topologies',
      tagline: 'Evolving neural-network controllers from scratch with speciation and topological growth.',
      category: 'neuroevolution',
      categoryLabel: 'Evolutionary AI & Neuroevolution',
      technologies: [
        'Python',
        'Pygame',
        'NEAT',
        'Genetic Algorithms',
        'Neural Networks',
      ],
      summary:
        'Built a Flappy Bird AI using NEAT (NeuroEvolution of Augmenting Topologies) in Python and Pygame that evolves neural-network controllers, growing network topology and weights across generations. Implemented speciation, crossover, and weight/structural mutation to evolve optimal flying behaviors.',
      highlights: [
        'Dynamic neural network topology growth: adding hidden nodes and connection genes over time',
        'Speciation using genomic compatibility distance to protect topological innovations',
        'Real-time Pygame evaluation environment tracking bird fitness per generation',
        'Evolved network topology optimizing flap triggers based on distance and elevation telemetry',
      ],
      problem:
        'Standard reinforcement learning with fixed architecture often suffers from high sample complexity on continuous navigation. NEAT solves this by starting with minimal topology (inputs directly connected to outputs) and allowing genetic mutation to discover both optimal synaptic weights and structural complexity concurrently.',
      architecture:
        'Each genome contains node genes (Input: Bird Y, Dist to Pipe, Gap Top, Gap Bottom, Velocity; Output: Flap) and connection genes with innovation numbers. Fitness is evaluated as flight distance minus deviation from gap center. Speciation groups genomes using compatibility thresholds, enabling protected niche evolution.',
      technicalChallenges: [
        {
          challenge: 'Topological alignment during genetic crossover',
          solution:
            'Implemented global historical innovation tracking numbers so homologous genes align accurately during crossover between disjoint parent topologies.',
        },
        {
          challenge: 'Preventing premature convergence in dominant genomes',
          solution:
            'Employed explicit fitness sharing within species clusters, reducing the reproductive fitness of overgrown species to allow novel topologies time to optimize.',
        },
      ],
      systemMetrics: [
        { label: 'Inputs / Outputs', value: '5 inputs / 1 output' },
        { label: 'Genetic Operators', value: 'Speciation, Crossover, Mutation' },
        { label: 'Environment', value: 'Python / Pygame' },
        { label: 'Topology Growth', value: 'Dynamic NEAT Nodes' },
      ],
      githubUrl: 'https://github.com/MUBIUS',
    },
    {
      id: 'dhaba-simulator',
      title: 'DHABA SIMULATOR',
      subtitle: 'First-Person Restaurant Management Simulation',
      tagline: 'Authentic Indian roadside restaurant gameplay with modular event-driven C# architecture.',
      category: 'simulation',
      categoryLabel: 'Game Architecture & Systems Design',
      technologies: ['Unity', 'C#', 'Event-Driven Architecture', 'State Machines', 'AI Navigation'],
      summary:
        'Developed a first-person dhaba (Indian roadside restaurant) management simulation in Unity, recreating authentic restaurant operations with an immersive gameplay experience. Implemented modular gameplay systems including customer AI, order management, inventory mechanics, interactive cooking stations, and dynamic service workflows using C#. Designed event-driven, reusable architecture to ensure scalability and ease of future feature integration, inspired by real-world Indian dhaba operations.',
      highlights: [
        'Modular customer AI state machine: Arrival → Seating → Ordering → Waiting → Dining → Payment',
        'Interactive cooking stations (Tandoor, Chai counter, Curry station) with timed cooking phases',
        'Inventory tracking system managing raw ingredient consumption and spoilage timers',
        'Event-driven architecture decoupling UI notifications, audio triggers, and order progression',
      ],
      problem:
        'Creating a fast-paced hospitality management game in Unity frequently results in tightly coupled spaghetti code where player input, UI, order queues, and customer pathfinding depend on monolithic scripts. The design required strict modularity and high reusability.',
      architecture:
        'Built around a centralized C# Game Event Bus. Customer agents broadcast order requests; kitchen cooking stations subscribe to preparation states; and the inventory manager validates stock availability asynchronously, ensuring zero frame drops during peak customer rushes.',
      technicalChallenges: [
        {
          challenge: 'Handling asynchronous multi-order cooking station bottlenecks',
          solution:
            'Designed priority-queued state machines per cooking station, enabling players to queue rotis in the tandoor while simultaneously simmering chai without state race conditions.',
        },
        {
          challenge: 'Decoupled customer satisfaction telemetry',
          solution:
            'Implemented a reactive metric pipeline that factors order accuracy, wait latency, and temperature into tip calculations and customer mood state transitions.',
        },
      ],
      systemMetrics: [
        { label: 'Engine', value: 'Unity 3D' },
        { label: 'Architecture', value: 'Event-Driven C#' },
        { label: 'Stations', value: 'Tandoor, Chai, Curry' },
        { label: 'AI Model', value: 'Hierarchical State Machine' },
      ],
      githubUrl: 'https://github.com/MUBIUS',
    },
  ] as ProjectData[],

  experience: [
    {
      role: 'Game Developer Intern',
      company: 'Arteon Interactive',
      location: 'Thane, Maharashtra',
      period: 'Sep 2025 – Feb 2026',
      summary:
        'Contributed to active game projects as an intern, implementing gameplay features, integrating 3D/2D assets, and debugging live issues in Unity.',
      bulletPoints: [
        'Contributed to active game projects as an intern, implementing gameplay features and debugging live issues in Unity.',
        'Collaborated with the design and art teams to integrate assets and iterate rapidly on feature prototypes.',
        'Engineered responsive player controls and camera rigs in C#, optimizing script execution cycles for stable frame rates.',
        'Participated in iterative game mechanic playtesting, identifying edge-case physics bugs and improving gameplay responsiveness.',
      ],
      technologies: ['Unity', 'C#', 'Gameplay Programming', 'Asset Integration', 'Prototyping'],
    },
  ] as ExperienceData[],

  education: [
    {
      institution: 'Lokmanya Tilak College of Engineering',
      degree: 'Bachelor of Engineering in Computer Science',
      specialization: 'Specialization in AI/ML',
      location: 'Navi Mumbai, Maharashtra',
      period: 'Sep 2023 – Jun 2026',
      highlights: [
        'Focused on Artificial Intelligence, Machine Learning algorithms, Reinforcement Learning, and Systems Engineering.',
        'Conducted research and implementation of neural network architectures, evolutionary algorithms, and distributed computing.',
      ],
    },
    {
      institution: 'Navjeevan Polytechnic',
      degree: 'Diploma in Information Technology',
      specialization: 'Information Technology',
      location: 'Mumbai, Maharashtra',
      period: 'Sep 2020 – Jun 2023',
      highlights: [
        'Built foundational expertise in Object-Oriented Programming (Java, C++), Data Structures, Database Systems, and Web Technologies.',
      ],
    },
  ] as EducationData[],

  skills: [
    {
      category: 'LANGUAGES',
      skills: [
        { name: 'C#', context: 'Core language for Unity game loops, player systems, and event architectures' },
        { name: 'Java', context: 'Object-oriented software design, robust backend systems, and data structures' },
        { name: 'Python', context: 'Cryptographic engineering, blockchain VM, Flask REST APIs, and ML experimentation' },
        { name: 'C++', context: 'Low-level systems programming, memory management, and high-performance algorithms' },
        { name: 'JavaScript', context: 'HTML5 Canvas simulations, real-time web interactives, and frontend engineering' },
        { name: 'HTML5/CSS3', context: 'Semantic markup, modern styling, dynamic Canvas graphics, and responsive layouts' },
      ],
    },
    {
      category: 'GAME ENGINES',
      skills: [
        { name: 'Unity', context: 'Gameplay mechanics, C# scripting, AI agent controllers, physics, and asset pipelines' },
      ],
    },
    {
      category: 'AI / MACHINE LEARNING',
      skills: [
        { name: 'Q-Learning', context: 'Reinforcement learning tabular policies and live telemetry reward optimization' },
        { name: 'Reinforcement Learning', context: 'Markov decision processes, agent-environment feedback loops, and policy evaluation' },
        { name: 'NEAT (NeuroEvolution)', context: 'Evolving neural network topology, synaptic weights, and speciation' },
        { name: 'Genetic Algorithms', context: 'Genomic crossover, fitness selection, structural mutation, and generation pipelines' },
      ],
    },
    {
      category: 'DEVELOPER TOOLS',
      skills: [
        { name: 'Git', context: 'Version control, atomic commits, branch workflows, and repository hygiene' },
        { name: 'GitHub', context: 'Open-source project collaboration, issues, code reviews, and project hosting' },
        { name: 'VS Code', context: 'Primary IDE for C#, Python, JavaScript development, profiling, and debugging' },
        { name: 'Antigravity', context: 'Modern developer workflow tooling and productivity acceleration' },
      ],
    },
  ] as SkillCategory[],
};
