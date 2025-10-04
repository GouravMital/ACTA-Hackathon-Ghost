import React from 'react';

function App() {
  const projects = [
    {
      id: 1,
      name: 'GigfinTech Analyser',
      description: 'AI-Powered Startup Analysis Platform for fintech/gig economy validation.',
      overview: 'AI-powered fintech/gig startup validation platform delivering market research, business analysis, and visual intelligence through customizable workflows.',
      targetUsers: 'Gig economy founders seeking validation, Fintech innovators assessing market fit, VCs screening deals.',
      coreFeatures: [
        'Startup Idea Input',
        'AI Research Engine',
        'Business Analysis',
        'Visual Analytics'
      ],
      tryAppLink: 'https://example.com/gigfintech' // Replace with actual link
    },
    {
      id: 2,
      name: 'AgentBlocks',
      description: 'No-Code AI Agency Builder for custom automation flows.',
      overview: 'Visual workflow platform enabling users to drag-drop AI agent modules, creating custom automation flows for business operations without coding expertise.',
      targetUsers: 'Startup founders automating operations, SMB marketers creating content workflows, Hackathon teams building AI solutions.',
      coreFeatures: [
        'Block-based Editor',
        'Starter Modules',
        'Live Preview',
        'Agent Marketplace'
      ],
      tryAppLink: 'https://example.com/agentblocks' // Replace with actual link
    },
    {
      id: 3,
      name: 'SkillBridge',
      description: 'Social AI Mentorship Network for career guidance and skill development.',
      overview: 'AI-powered mentorship platform instantly matching learners with industry experts, facilitating sessions, and tracking career growth through intelligent guidance.',
      targetUsers: 'CS students seeking career guidance, New graduates entering tech industry, Industry mentors offering expertise.',
      coreFeatures: [
        'AI Matchmaking',
        'Verification System',
        'Question Assistant',
        'Session Scheduling'
      ],
      tryAppLink: 'https://example.com/skillbridge' // Replace with actual link
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">ACTA Hackathon Projects</h1>
          <p className="text-xl mb-8">Explore our innovative AI-powered solutions</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Overview:</h4>
                    <p className="text-sm text-gray-500">{project.overview}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Target Users:</h4>
                    <p className="text-sm text-gray-500">{project.targetUsers}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Core Features:</h4>
                    <ul className="text-sm text-gray-500 list-disc list-inside">
                      {project.coreFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={() => window.open(project.tryAppLink, '_blank')}
                  >
                    Try App
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
