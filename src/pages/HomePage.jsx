import { motion } from 'framer-motion';
import {
  Rocket,
  BookOpen,
  Users,
  MessageCircle,
  CreditCard,
  PlayCircle,
  Award,
  Briefcase,
} from 'lucide-react';
import profile1 from '../assets/profile1.jpg'
import profile2 from '../assets/profile2.jpg'
import profile3 from '../assets/profile3.jpg'
import mentor from '../assets/mentor.jpg'
import lesson from '../assets/lesson.jpg'
import learn from '../assets/learn.jpg'

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Feature Card Component
const FeatureCard = ({
  title,
  description,
  icon,
}) => (
  <motion.div
    variants={itemVariants}
    className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 bg-blue-600 rounded-full">{icon}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

// Testimonial Card Component
const TestimonialCard = ({
  name,
  role,
  quote,
  image,
}) => (
  <motion.div
    variants={itemVariants}
    className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10"
  >
    <div className="flex items-center gap-4 mb-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h4 className="text-lg font-semibold text-white">{name}</h4>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
    </div>
    <blockquote className="text-gray-300 italic">“{quote}”</blockquote>
  </motion.div>
);

// Main App Component
const HomePage = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: 'Personalized Mentoring',
      description: 'Find the perfect Mentor for your needs. Browse profiles, check qualifications, and read reviews.',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-white" />,
      title: 'Secure Payments',
      description: 'Hassle-free and secure payment processing. Pay for lessons with confidence.',
    },
    {
      icon: <PlayCircle className="w-6 h-6 text-white" />,
      title: 'Lesson Recordings',
      description: 'Review your lessons anytime, anywhere. Recordings are available for convenient access.',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      title: 'Flexible Scheduling',
      description: 'Schedule lessons at your convenience. Reschedule or cancel with ease.',
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: 'Expert Mentors',
      description: 'Learn from experienced and qualified Mentors in various subjects.',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      title: 'Feedback & Reviews',
      description: 'Provide feedback and help others find the best Mentors. Your opinion matters!',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6"
        >
          MentorBridge: Connect. Learn. Grow.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.3 }}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
        >
          Your platform for connecting with expert Mentors, mastering new skills, and achieving your learning
          goals.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.6 }}>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-lg ">
           <div className="flex items-center gap-2">
             <Rocket className="mr-2 w-5 h-5 "/>
            Get Started
            </div>
          </button>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-semibold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Key Features
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((f, i) => (
            <FeatureCard key={i} title={f.title} description={f.description} icon={f.icon} />
          ))}
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="bg-gradient-to-br from-black to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigoCustom">
            How It Works
          </h2>
          <div className="space-y-12">
            {[
              {
                title: '1. Find a Mentor',
                text:
                  'Browse Mentors profiles, check their qualifications and expertise. Filter by subject, price, and availability to find your ideal Mentor.',
                img: mentor,
                imgFirst: false,
              },
              {
                title: '2. Book a Lesson',
                text:
                  'Check Mentor availability and schedule a lesson that fits your needs. Reschedule or cancel lessons with ease.',
                img: lesson,
                imgFirst: true,
              },
              {
                title: '3. Start Learning',
                text:
                  'Connect with your Mentor in a live online lesson. Access lesson recordings for review anytime.',
                img: learn,
                imgFirst: false,
              },
            ].map(({ title, text, img, imgFirst }, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-12">
                {!imgFirst && (
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigoCustom">
                      {title}
                    </h3>
                    <p className="text-gray-300">{text}</p>
                  </div>
                )}
                <div className="md:w-1/2 aspect-video">
                  <img src={img} alt={title} className="w-full h-full object-cover rounded-xl shadow-lg" />
                </div>
                {imgFirst && (
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigoCustom">
                      {title}
                    </h3>
                    <p className="text-gray-300">{text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-semibold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigoCustom">
          What Our Users Say
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <TestimonialCard
            name="Alice Johnson"
            role="Student"
            quote="MentorBridge has transformed my learning experience. I found the perfect Mentor and improved my grades significantly!"
            image={profile2}
          />
          <TestimonialCard
            name="Bob Williams"
            role="Mentor"
            quote="I love teaching on MentorBridge. The platform is easy to use, and I can connect with students from all over the world."
            image={profile1}
          />
          <TestimonialCard
            name="Sarah Davis"
            role="Parent"
            quote="MentorBridge provides a safe and effective way for my children to get the extra help they need."
            image={profile3}
          />
        </motion.div>
      </section>

      {/* Mentor Statistics Section */}
      <section className="bg-gradient-to-br from-black to-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigoCustom">
            Become a Mentor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-4xl font-bold text-white">1000+</h3>
              <p className="text-gray-300">Active Mentors</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-white">50+</h3>
              <p className="text-gray-300">Subjects Covered</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-white">4.9/5</h3>
              <p className="text-gray-300">Average Mentor Rating</p>
            </div>
          </div>
          <button className="mt-12 text-white border-purple-500 hover:bg-purple-500/20 hover:border-indigoCustom px-8 py-3 rounded-full shadow-lg transition-all duration-300 border text-lg">
            <Briefcase className="mr-2 w-5 h-5" />
            Become a Mentor
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} MentorBridge. All rights reserved.
          <p className="mt-4">
            <a href="#" className="hover:text-blue-400 mr-4">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-400">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
