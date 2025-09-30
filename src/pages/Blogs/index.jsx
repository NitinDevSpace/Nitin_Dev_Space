import React from 'react'

const blogCards = [
  {
    title: "Finished My First Project",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    text: "I finally completed my first full-stack project! It was challenging but incredibly rewarding to see it come together.",
  },
  {
    title: "Learnt a New Skill",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    text: "This week, I picked up React Hooks and started using them in my projects. It's amazing how much simpler state management feels now.",
  },
  {
    title: "Exploring UI Design",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    text: "Dove into UI design principles and tried my hand at Figma. Designing interfaces is both fun and challenging!",
  },
  {
    title: "Attended My First Hackathon",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    text: "Joined an online hackathon and collaborated with amazing people. Learned a lot about teamwork and rapid prototyping.",
  },
  {
    title: "Started Blogging",
    image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=800&q=80",
    text: "Launched my blog to share my coding journey. Writing about tech helps me understand topics better and connect with others.",
  },
]

const Blogs = () => {
  return (
    <>
      <section className="py-12 px-4 max-w-7xl mx-auto mt-20">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white-900">My Blog</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogCards.map((card, idx) => (
            <article key={idx} className="max-w-md bg-white rounded-lg shadow-lg overflow-hidden mx-auto flex flex-col">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{card.title}</h2>
                <p className="text-gray-600 mb-4 flex-1">
                  {card.text}
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition self-start">
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Blogs