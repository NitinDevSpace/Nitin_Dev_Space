export const blogSeed = [
	{
		slug: "from-mechanical-engineering-to-software",
		title: "Switching Lanes: Mechanical Engineering to Software",
		excerpt:
			"I spent four years studying machines. Then I decided to spend the rest of my career building software. Here is how that jump actually felt.",
		coverImage:
			"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
		tags: ["Career", "Engineering", "Learning"],
		published: true,
		readTime: "6 min",
		createdAt: new Date("2026-01-12T10:00:00.000Z"),
		content: `
<p>I graduated as a mechanical engineer. That sentence still surprises people, including me, because most of my day now is Java, React, MongoDB, and production bugs that have nothing to do with gears.</p>
<p>The switch was not a cinematic leap. It was a sequence of small, stubborn decisions. I liked systems. I liked watching something go from sketch to working prototype. At YKK India I was already leading a small R&amp;D team, prototyping, planning, shipping. The missing piece was that I wanted the prototype to live on the internet, not only on a shop floor.</p>
<h2>Why software, specifically</h2>
<p>Software has a feedback loop I could not ignore. You write, you run, you see. That tightness is addictive if you care about craft. Mechanical work taught me constraints, tolerances, and the cost of a bad assumption. Software rewards the same instincts, just with a compiler instead of a machine shop.</p>
<p>I joined Scaler Academy and treated it like a second degree. Data structures, Java, system design, full-stack work. I did not want to be a tutorial tourist. I wanted to be hireable for real product work.</p>
<h2>What I had to unlearn</h2>
<p>In core engineering, a drawing can sit for weeks. In software, waiting is usually fear. I had to get comfortable shipping incomplete things, reading other people's code, and being wrong in public. The career break I took in 2025 was not a pause. It was a workshop. ConnectSphere and Entrify came out of that season.</p>
<p>If you are coming from another discipline: your previous career is not wasted. It is domain taste. You already know how to finish things. Software will teach you how to finish them faster, and how to keep them alive after launch.</p>
`,
	},
	{
		slug: "building-connectsphere",
		title: "ConnectSphere: What Building a Social Platform Taught Me",
		excerpt:
			"A social product looks simple until you add auth, follows, posts, comments, and the quiet requirement that it should not fall over.",
		coverImage:
			"https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1600&q=80",
		tags: ["Projects", "Java", "Spring Boot"],
		published: true,
		readTime: "7 min",
		createdAt: new Date("2026-02-03T10:00:00.000Z"),
		content: `
<p>ConnectSphere started as a question: could I design a social platform that felt complete, not like a class assignment with a login screen glued on top?</p>
<p>I built the backend in Java and Spring Boot, with JWT auth and MySQL. The frontend is React, Redux, and Tailwind. Users can post, comment, like, follow, and get a feed that actually updates. That sentence hides a lot of schema decisions.</p>
<h2>The parts that hurt (in a good way)</h2>
<p>Authentication is not a feature. It is the floor. Role-based access, password hashing, input validation, and clean API boundaries took longer than the pretty UI. I wanted the REST API to stay modular so user, post, and notification logic did not collapse into one service class.</p>
<p>The frontend taught me state discipline. A feed, a profile, and a follow button all want the same data at slightly different times. Redux earned its place. Tailwind kept the interface consistent while I iterated on layout.</p>
<h2>Shipping it</h2>
<p>I deployed the API on Render and the client on Vercel, with Docker in the mix so local and production did not drift. During testing it held a thousand users and stayed up. That number is not a flex. It is a reminder that "it works on my machine" is not an architecture.</p>
<p>If I rebuilt it tomorrow, I would invest earlier in pagination, caching, and a clearer notification pipeline. The lesson I keep: design the data first, then decorate it with UI.</p>
`,
	},
	{
		slug: "career-break-that-wasnt",
		title: "The Eight Months I Called a Career Break",
		excerpt:
			"January to August 2025 looks empty on a resume if you only read the dates. It was the most deliberate work I have done.",
		coverImage:
			"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
		tags: ["Career", "Learning", "Mindset"],
		published: true,
		readTime: "5 min",
		createdAt: new Date("2026-02-20T10:00:00.000Z"),
		content: `
<p>I listed it as "Career Break &amp; Upskilling" because that is the honest label. I left a structured job, sat with Scaler's curriculum, and built products instead of collecting certificates.</p>
<p>People hear "break" and picture rest. I was grinding Java, Spring Boot, React, and system design. I was also dealing with the quieter fear: what if I walked away from mechanical engineering and still was not good enough at this?</p>
<h2>How I structured the time</h2>
<p>Mornings for fundamentals. Afternoons for projects. Evenings for reading other people's code and rewriting mine. ConnectSphere forced backend thinking. Entrify forced payments, roles, and messy real-world flows. Nitin Dev Space forced me to care about design and content, not only endpoints.</p>
<p>The point of a break like this is not to disappear. It is to remove the excuse of "I would build that if I had time." I had time. So I built.</p>
<h2>What I would tell someone considering the same</h2>
<p>Have a date you re-enter the market. Have two projects you can defend in an interview. Do not only watch lectures. The market does not hire your watch history. It hires evidence.</p>
<p>Those eight months got me to Bambhari. The internship was the proof that the break worked. The resume line still looks odd. The work behind it does not.</p>
`,
	},
	{
		slug: "entrify-and-payments",
		title: "Entrify and the Messy Reality of Payments",
		excerpt:
			"Booking a seat is easy until money, roles, and webhooks enter the room. Entrify is where my MERN stack stopped being a tutorial.",
		coverImage:
			"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
		tags: ["Projects", "MERN", "Payments"],
		published: true,
		readTime: "6 min",
		createdAt: new Date("2026-03-08T10:00:00.000Z"),
		content: `
<p>Entrify is an event booking platform. Users browse, pick seats, and pay. Theater owners and admins get their own dashboards. On a slide, that is three user stories. In code, it is three products sharing a database.</p>
<p>I used React, Node, Express, and MongoDB. JWT for sessions. Stripe for payments. The day Stripe webhooks entered the chat, I understood why senior engineers talk about idempotency with a straight face.</p>
<h2>Roles make the product honest</h2>
<p>A user should never see an admin route. An owner should not invent bookings. JWT plus server-side checks is the minimum. I also added rate limiting, sanitization, and CSP headers because a booking app that leaks data is not a portfolio piece. It is a liability.</p>
<h2>What broke first</h2>
<p>Seat selection and payment confirmation race each other if you are careless. I had to treat booking as a state machine, not a form submit. Webhooks were the source of truth for "paid," not the browser's success page.</p>
<p>I shipped frontend on Vercel and backend on Render. The stack is familiar on purpose. I wanted depth, not novelty. Entrify taught me that full-stack means owning the ugly middle: money, permissions, and failure cases.</p>
`,
	},
	{
		slug: "java-spring-and-mern",
		title: "Why I Did Not Pick Only One Stack",
		excerpt:
			"Java and Spring Boot on one side. Node and Mongo on the other. I kept both, and it was a decision, not indecision.",
		coverImage:
			"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
		tags: ["Engineering", "Java", "JavaScript"],
		published: true,
		readTime: "5 min",
		createdAt: new Date("2026-03-22T10:00:00.000Z"),
		content: `
<p>Some people want a single identity: "I am a Java developer." I understand the branding. I still refused it.</p>
<p>Spring Boot gave me structure, typing discipline, and the kind of backend that large teams actually run. The MERN stack gave me speed: ship an idea, put it on Vercel, iterate at night. I use both because product work does not respect your favorite language.</p>
<h2>What each stack trained in me</h2>
<p>Java pushed me toward explicit design: entities, services, security config, SQL schemas. JavaScript pushed me toward product sense: UI, API shape, and getting a demo in front of someone before the idea cools.</p>
<p>At Bambhari I needed both instincts. The hackathon platform was Spring Boot, React, MySQL, JWT. The iDURAR ERP work was MERN. Same intern, two dialects of the same job: make software that people can trust.</p>
<h2>The real specialization</h2>
<p>I am not collecting logos. I am specializing in full-stack product engineering: auth, data, UI, deployment. The runtime can change. The responsibility does not.</p>
<p>If you are early, learn one stack until you can build without a tutorial. Then learn a second so you stop confusing tools with skill.</p>
`,
	},
	{
		slug: "internship-at-bambhari",
		title: "Notes From My Internship at Bambhari",
		excerpt:
			"Remote, Agile, real users. The internship was short. The standard it set for my work is not.",
		coverImage:
			"https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
		tags: ["Career", "Internship", "Teams"],
		published: true,
		readTime: "6 min",
		createdAt: new Date("2026-04-10T10:00:00.000Z"),
		content: `
<p>Bambhari was my first software internship. Remote, out of Bengaluru, from September to December 2025. I joined after a long stretch of self-paced work, so I was hungry for production context: standups, reviews, and tickets that belonged to someone besides me.</p>
<p>We worked Agile. That is easy to write and hard to live. Scope moved. Feedback arrived mid-sprint. Delivery speed improved because we stopped treating every task like a personal epic and started shipping slices.</p>
<h2>Two tracks of work</h2>
<p>The hackathon platform had to support hosting, registration, and team collaboration for more than a thousand users. Spring Boot, React, MySQL, JWT. It forced me to think about scale earlier than a side project usually does.</p>
<p>The iDURAR ERP/CRM customization was different: an existing open-source MERN system, a client, and the need to add validations, image uploads, and UI that did not fight the rest of the product. Improving performance and experience by a noticeable margin mattered more than rewriting it for fun.</p>
<h2>What internships actually teach</h2>
<p>Not syntax. Taste. What is good enough to merge. How to explain a change. How Docker and AWS stop being buzzwords when something has to stay up.</p>
<p>I left with a clearer bar. Personal projects now get the same questions I was asked at work: who is this for, what fails, and can we ship a smaller version first?</p>
`,
	},
	{
		slug: "portfolio-to-brand",
		title: "Nitin Dev Space Is a Brand, Not a Portfolio Tab",
		excerpt:
			"A portfolio is a list of projects. A brand is a place people return to. This site is me drawing that line in public.",
		coverImage:
			"https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
		tags: ["Brand", "Design", "Build in Public"],
		published: true,
		readTime: "5 min",
		createdAt: new Date("2026-05-02T10:00:00.000Z"),
		content: `
<p>I used to think a developer website was a fancy resume. Hero, projects, contact, done. That is a brochure. I want Nitin Dev Space to feel like a studio: work on the walls, writing on the desk, and a door that actually opens.</p>
<p>The stack is intentional. React and Vite on the front. Serverless functions on Vercel. MongoDB for content I can edit without a redeploy. If I cannot update a project write-up from an admin panel, the site is already lying about being alive.</p>
<h2>What a brand requires</h2>
<p>Consistency. The same gold, the same type, the same density of information. Motion that helps, not motion that performs. Writing that sounds like me, not like a template that says "passionate developer" four times.</p>
<p>It also requires opinions. I care about full-stack product work, AI used with judgment, and craft you can click. The 3D pieces on the homepage are not decoration for decoration's sake. They are a promise that the work has depth, then the rest of the site has to keep that promise with real projects and real posts.</p>
<h2>Still building</h2>
<p>A brand is not a launch. It is a cadence. New work, better writing, a resume I can replace without opening VS Code. If you are reading this, you are already inside that loop.</p>
`,
	},
	{
		slug: "video-editing-and-product-taste",
		title: "What Three Years of Video Editing Taught Me About Product",
		excerpt:
			"Before I shipped APIs, I shipped cuts. Timing, audience, and finishing are the same job in a different timeline.",
		coverImage:
			"https://images.unsplash.com/photo-1536240478704-b2cc80e4d34c?auto=format&fit=crop&w=1600&q=80",
		tags: ["Craft", "Product", "Storytelling"],
		published: true,
		readTime: "5 min",
		createdAt: new Date("2026-05-18T10:00:00.000Z"),
		content: `
<p>From about 2021 to 2024 I edited video part-time for clients: promos, tutorials, social cuts. Nobody called it product work. It was.</p>
<p>An edit has a user. They will drop off at second seven if you are indulgent. They need a hook, a promise, and a finish. That is UX with a playhead.</p>
<h2>Transferable instincts</h2>
<p>Pacing maps to interface rhythm. A page that dumps every paragraph at once is a video that never cuts. Hierarchy maps to typography and color, the same way a title card tells you where to look. Feedback maps to client reviews: you will not ship the first version, and that is normal.</p>
<p>I also learned to finish. Clients do not pay for a timeline of unused clips. Users do not thank you for an almost-deployed feature. Editing trained the muscle of calling something done.</p>
<h2>Why I still care</h2>
<p>When I design a project card or a blog layout, I am still cutting. What stays on screen? What is noise? The freelance years were not a detour from engineering. They were pre-training in attention.</p>
`,
	},
	{
		slug: "system-design-without-a-cs-degree",
		title: "Learning System Design Without a CS Degree",
		excerpt:
			"I do not have a computer science bachelor's. I still need to talk about load, data, and failure without bluffing.",
		coverImage:
			"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
		tags: ["System Design", "Learning", "Interviews"],
		published: true,
		readTime: "6 min",
		createdAt: new Date("2026-06-09T10:00:00.000Z"),
		content: `
<p>System design intimidated me longer than algorithms did. Algorithms have a right answer nearby. Design has tradeoffs, and you have to say them out loud.</p>
<p>Scaler forced the vocabulary: HLD, LLD, databases, caches, queues, consistency. I stopped treating those as trivia and started mapping them onto things I had already built. ConnectSphere is a feed plus identity. Entrify is inventory plus money. Nitin Dev Space is content plus an admin write path.</p>
<h2>How I study it now</h2>
<p>I pick a real product I use, sketch the core entities, then ask where it breaks at 10x traffic. I read postmortems more than motivational threads. I practice explaining a design in five minutes, because interviews and standups both punish rambling.</p>
<p>Not having a CS degree means I do not get to skip the reading. It does not mean I cannot do the work. Mechanical engineering already taught me to respect constraints. Distributed systems are constraints with network latency.</p>
<h2>The bar I use</h2>
<p>If I cannot explain why a piece of data lives where it lives, I do not understand the system yet. Frameworks will change. That question will not.</p>
`,
	},
	{
		slug: "using-ai-without-outsourcing-thinking",
		title: "Using AI as a Teammate, Not a Crutch",
		excerpt:
			"I am an AI enthusiast who still wants to be able to write the function when the model is wrong. That tension is the whole point.",
		coverImage:
			"https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
		tags: ["AI", "Craft", "Workflow"],
		published: true,
		readTime: "5 min",
		createdAt: new Date("2026-07-14T10:00:00.000Z"),
		content: `
<p>I like AI. I use it. I also refuse to become the person who cannot read their own pull request.</p>
<p>A model is fast at drafts, refactors, and "show me three ways to structure this." It is bad at knowing what Nitin Dev Space should feel like, which bug is actually the product, and when a shortcut will cost me a week. That judgment stays human.</p>
<h2>Rules I actually follow</h2>
<p>I do not paste a generated block I cannot explain. I do not let a chatbot invent an architecture I have not sketched first. I do use it to challenge my approach, write tests I forgot, and compress research. The homepage even talks about a future where visitors can query this site in natural language. That only works if the underlying content is true.</p>
<p>The industry will keep accelerating. The developers who last will be the ones who can still think when the suggestion is confidently wrong.</p>
<h2>Where this goes</h2>
<p>I want AI in my products as a feature, not as a personality transplant. Assist, retrieve, draft. Then I ship. The brand is still mine.</p>
`,
	},
];
