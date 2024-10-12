const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-700 via-green-800 to-black text-white">
      <header className="text-center py-20">
        <h1 className="text-6xl font-bold mb-4 animate-fadeIn">About Us</h1>
        <p className="text-2xl animate-fadeIn delay-500">
          Welcome to GardenConnect, your go-to platform for all things
          gardening. We connect passionate gardeners who want to share tips,
          comment on posts, and inspire each other to grow sustainable gardens.
          Join us on this green journey!
        </p>
      </header>

      <section className="py-20 bg-green-800">
        <div className="container mx-auto text-center">
          <h2 className="text-6xl font-semibold mb-8">Our Mission</h2>
          <p className="text-2xl mb-8 animate-fadeIn delay-700">
            Our mission is to cultivate a thriving online gardening community
            where knowledge is shared, creativity blossoms, and sustainable
            practices are embraced. We aim to empower every gardener, from
            beginners to experts, to grow with confidence.
          </p>

          <h2 className="text-3xl font-semibold mb-8">Meet the Team</h2>
          <div className="flex flex-wrap justify-center space-x-10 space-y-10">
            <div className="bg-green-700 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-4xl font-bold mb-2">Abir Islam</h3>
              <p className="text-lg">Founder & Lead Gardener</p>
            </div>
            <div className="bg-green-700 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-4xl font-bold mb-2">Samantha Banerjee</h3>
              <p className="text-lg">Community Manager</p>
            </div>
            <div className="bg-green-700 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-4xl font-bold mb-2">Mr. Rahat ali khan</h3>
              <p className="text-lg">Content Creator & Gardener</p>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mt-16 mb-8">
            Our Achievements
          </h2>
          <div className="flex justify-center space-x-10">
            <div className="bg-green-700 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-lg">Active Gardeners</p>
            </div>
            <div className="bg-green-700 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-4xl font-bold mb-2">1,000+</h3>
              <p className="text-lg">Posts Shared</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-green-900 text-center py-4">
        <p>&copy; 2024 GardenConnect. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
