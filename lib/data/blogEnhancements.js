// Additional reporting and practical detail for the published portfolio essays.
// Keep claims about projects aligned with their source write-ups.
export const blogEnhancements = {
	"from-mechanical-engineering-to-software": `
<h2>What transferred from one discipline to the other</h2>
<p>A useful engineering habit is to write down the constraints before choosing a solution. In mechanical work those constraints can be material, tolerance, cost, and safety. In software they become latency, data integrity, deployment cost, accessibility, and the time a team has to maintain the feature. Naming them early keeps a project from becoming an exercise in choosing fashionable tools.</p>
<p>That habit changed how I approached web projects. A prototype should answer a question, not just demonstrate that a framework runs. If the question is whether people can complete a booking, the useful work is a complete path from selection to confirmation, including the failure cases. A polished landing page alone cannot answer it.</p>
<h2>A practical route for career changers</h2>
<p>Pick one language and build enough with it to explain your decisions without a tutorial open. Then ship a small product with a database, authentication, error handling, and a real deployment. Write down what broke and how you fixed it. That record is more useful in an interview than a long list of course names.</p>
<p>The previous career still matters. It gives you examples of tradeoffs, deadlines, and communication. The new skill is translating those lessons into software that somebody else can use and maintain.</p>
`,
	"building-connectsphere": `
<h2>The data model behind a familiar screen</h2>
<p>A social feed looks like a sequence of cards, but each card connects a person, a post, reactions, comments, and a relationship to the viewer. I learned to start with those relationships. Who owns a post? What should happen when an account follows another? Which records can be removed without leaving broken references? These questions are easier to answer in a schema than after the interface has grown around a guess.</p>
<p>Authentication also needs to be enforced at the API boundary. Hiding an edit button in React is useful for presentation, but the server still has to check that the caller owns the post. The same principle applies to following, liking, and retrieving private profile data.</p>
<h2>What I would strengthen next</h2>
<p>A feed that works with a small test set needs pagination before it becomes a large one. Queries should have indexes that match the way people browse, and the client should handle a failed request without losing the rest of the page. Caching can help, but it should be added only after measuring where the time goes.</p>
<p>ConnectSphere made the lesson concrete for me: the hard part of a social product is not drawing the feed. It is keeping identity, permissions, and changing data consistent as the product grows.</p>
`,
	"career-break-that-wasnt": `
<h2>Turning study into evidence</h2>
<p>I found it more useful to connect each topic to something I could build. Studying authentication led to a login flow with server-side checks. Reading about databases led to modelling relationships for ConnectSphere and booking states for Entrify. Studying deployment meant getting a client and API running outside my laptop, then investigating the differences between local and production behavior.</p>
<p>This approach gives a career break a visible output. A repository can show the code; a project page can explain the problem, the tradeoffs, and what is still unfinished. Neither should pretend a prototype is a production business. Honest scope is a stronger signal than an inflated feature list.</p>
<h2>What I would measure</h2>
<p>If I had to plan the same period again, I would keep a weekly record: a feature completed, a bug investigated, a concept explained in my own words, and one piece of feedback from somebody else. That record makes progress easier to judge than hours spent watching lessons.</p>
<p>A career transition is rarely a straight line. The practical question is whether the work leaves you able to build, explain, and improve a real system. That became the standard I carried into my internship.</p>
`,
	"entrify-and-payments": `
<h2>Draw the booking states first</h2>
<p>An event booking needs more than a paid-or-unpaid flag. A seat may be available, temporarily held, paid for, released after a timeout, or refunded. Those states determine what the interface can truthfully tell a customer. They also help the backend decide whether a second request is a new booking or a retry of one already in progress.</p>
<p>Payment providers send webhooks because the browser can close, lose its connection, or report success before the server has recorded the result. The safe design is to verify events on the server and make repeated delivery harmless. The client should show a pending state until the backend has enough evidence to confirm the booking.</p>
<h2>Questions worth testing</h2>
<p>What if two people choose the last seat? What if payment succeeds but the callback is delayed? What if an owner changes an event after tickets have sold? Each question crosses more than one screen and more than one database record. I use them as a checklist because the happy path alone hides the work that makes a booking system trustworthy.</p>
<p>Entrify is still a useful learning project precisely because those edges are difficult. They force product decisions about what customers and owners should see when the system is uncertain.</p>
`,
	"java-spring-and-mern": `
<h2>Choose for the constraint, not the label</h2>
<p>For a service with a long life and many contributors, explicit types, clear layers, and predictable deployment can be worth more than a quick first version. For a small product idea that needs a browser prototype and rapid iteration, sharing JavaScript across the interface and API can shorten the loop. Neither choice removes the need for validation, logging, tests, and access control.</p>
<p>I try to ask what the team already knows, how the data will be stored, and what will be hardest to change later. Those answers are more useful than declaring a universal winner. A database choice, for example, should follow the relationships and queries the product needs, not the logo on a stack diagram.</p>
<h2>The common work underneath</h2>
<p>Whether the endpoint is written in Spring Boot or Express, somebody must define its contract, handle invalid input, prevent unauthorized changes, and make failures visible. On the frontend, the same care applies to loading states and forms. That is why learning a second stack helped me: it exposed which habits were engineering fundamentals and which were just framework syntax.</p>
`,
	"internship-at-bambhari": `
<h2>Working inside an existing product</h2>
<p>Personal projects let me change a design whenever I want. An internship adds existing users, code written by other people, and a reason to preserve behavior while improving it. For the ERP/CRM customization, that meant understanding the current flow before adding validations, image handling, or interface changes. A small change could affect another part of the product that the original ticket never mentioned.</p>
<p>Review and feedback were as important as implementation. A useful change is one a teammate can read, test, and deploy. Breaking work into smaller pieces made it easier to spot a wrong assumption early and to explain why a particular fix belonged in the API rather than the interface.</p>
<h2>The lesson I kept</h2>
<p>I now start a feature by identifying the user action, the data it changes, and the failure path. Then I look for the smallest end-to-end slice that can be reviewed. This makes a project less dramatic, but it makes delivery more reliable.</p>
<p>The difference between a portfolio demo and team software is not a bigger framework. It is the discipline of making a change that other people can safely carry forward.</p>
`,
	"portfolio-to-brand": `
<h2>Give a visitor a clear path</h2>
<p>A visitor should be able to answer three questions quickly: what work is offered, what evidence supports it, and how to get in touch. That is why this site connects the home page to project write-ups, a profile, articles, and a contact form. Motion and visual identity can make the experience memorable, but they should never hide those basic answers.</p>
<p>Each project page has a different job from a project card. The card helps somebody decide whether to open it. The page should explain the problem, the stack, the difficult decisions, and the current state of the work. Marking a project as in progress is useful when it is true; it also creates a responsibility to say what is unfinished.</p>
<h2>How I judge a change to the site</h2>
<p>I ask whether it helps a visitor understand the work or complete a task. A faster page, clearer writing, and a working contact route usually do. An effect that delays the content often does not. The same test applies to monetization: advertising should support the writing, not dominate a short article.</p>
<p>A brand earns repeat visits through consistent work. The design can invite someone in, but useful, accurate content gives them a reason to return.</p>
`,
	"video-editing-and-product-taste": `
<h2>Use the timeline as a design tool</h2>
<p>Editing taught me to think in sequences. A viewer needs context before a payoff; a visitor needs a reason to trust a page before being asked to submit a form. This is why I pay attention to the order of headings, examples, and actions. Even a technically correct page can feel confusing when it reveals the wrong information at the wrong time.</p>
<p>A rough cut is also a prototype. It lets a client react to something concrete while changes are still cheap. In software, a small interactive flow can serve the same purpose. Showing it early tests assumptions about the user journey before the team builds every edge case.</p>
<h2>What feedback is for</h2>
<p>Feedback is more useful when it describes an outcome: the message was unclear, the action was hard to find, or the pacing dragged. I try to separate that signal from a request for a particular visual treatment. The first tells me about the problem; the second is one possible solution.</p>
<p>Finishing still matters. A clear, usable version that reaches people can teach more than a polished draft that never leaves the editor.</p>
`,
	"system-design-without-a-cs-degree": `
<h2>Practice with a product you can inspect</h2>
<p>For Entrify, I can start with the simplest useful model: events, seats, reservations, payments, and users. Then I ask which operations must be strongly consistent. Reserving the last seat is different from counting how many people viewed an event. That distinction tells me where transactions or careful locking may matter and where eventual updates may be acceptable.</p>
<p>For ConnectSphere, the questions change. A feed can tolerate a short delay before a new post appears, but permissions on private data need a firmer boundary. Pagination and indexing become important as a user follows more accounts. Working from a product makes terms like consistency and caching less abstract.</p>
<h2>Explain the failure case</h2>
<p>After drawing the happy path, I pick a failure: a database is slow, an API call is retried, or a user loses connectivity. I state what the user should see and what the system must not do. That exercise often reveals more about a design than adding another box to a diagram.</p>
<p>The goal is not to recite a standard architecture. It is to explain why a particular compromise fits the problem and what evidence would make me change it.</p>
`,
	"using-ai-without-outsourcing-thinking": `
<h2>A workflow that keeps the work mine</h2>
<p>I start with the behavior I want and the constraints around it. Then I use a model to compare approaches, find an overlooked edge case, or draft a small piece of code. Before that code is accepted, I read it line by line, check its assumptions against the actual project, and run the relevant build or test. If I cannot explain a branch or dependency, I do not treat the output as finished.</p>
<p>The same rule applies to writing. A fluent paragraph is not evidence. Names, dates, results, and project claims have to come from records I can verify. AI can make a draft easier to revise, but it cannot supply a personal experience that never happened.</p>
<h2>When I avoid the shortcut</h2>
<p>Authentication, payments, privacy, and data deletion deserve extra care because a plausible answer can still be wrong in ways that hurt people. I use documentation and direct checks, then keep the scope of a change small enough to review. If the tool gives a confident suggestion that conflicts with the code or a source, the source wins.</p>
<p>The useful outcome is not more generated text or code. It is a product whose behavior I understand and can take responsibility for after it ships.</p>
`,
};
