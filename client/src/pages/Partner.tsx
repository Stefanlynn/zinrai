import { useState, useEffect } from "react";

function OnboardingForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    interests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partner application submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-white/20 rounded-lg p-8 max-w-md mx-4 w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-light text-white mb-6 text-center">
          Partner Application
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            />
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-2">Experience Level</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select Experience</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white/70 text-sm mb-2">Areas of Interest</label>
            <textarea
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white resize-none"
              placeholder="Tell us about your investment interests..."
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-2 bg-blue-600 border border-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Partner() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState<any>(null);
  const [animatedIn, setAnimatedIn] = useState(false);

  const partnerships = [
    {
      id: 1,
      title: "Business Promoter",
      subtitle: "Revenue Sharing",
      description: "Join our affiliate program and earn commissions by promoting ZiNRAi educational content.",
      benefits: ["20-40% commission rates", "Marketing materials provided", "Monthly payouts", "Performance bonuses"],
      color: "blue"
    },
    {
      id: 2,
      title: "Educational Partner",
      subtitle: "Content Collaboration",
      description: "Collaborate with us to create and distribute high-quality financial education content.",
      benefits: ["Co-branded content", "Revenue sharing", "Platform access", "Expert networking"],
      color: "purple"
    },
    {
      id: 3,
      title: "Technology Partner",
      subtitle: "Platform Integration",
      description: "Integrate your fintech solutions with our educational platform for mutual growth.",
      benefits: ["API access", "Technical support", "Joint marketing", "User base expansion"],
      color: "green"
    },
    {
      id: 4,
      title: "Community Leader",
      subtitle: "Influence & Impact",
      description: "Lead educational initiatives and build communities around financial literacy.",
      benefits: ["Leadership recognition", "Exclusive events", "Direct support", "Community tools"],
      color: "orange"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setAnimatedIn(true);
    }, 100);
  }, []);

  const handlePartnershipClick = (partnership: any) => {
    setSelectedPartnership(partnership);
    setShowDetailModal(true);
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedPartnership(null);
  };

  const getColorClasses = (colorName: string, type: 'bg' | 'border' | 'text' = 'bg') => {
    const colors: Record<string, Record<string, string>> = {
      blue: {
        bg: 'bg-blue-500/20',
        border: 'border-blue-400/30',
        text: 'text-blue-300'
      },
      purple: {
        bg: 'bg-purple-500/20',
        border: 'border-purple-400/30',
        text: 'text-purple-300'
      },
      green: {
        bg: 'bg-green-500/20',
        border: 'border-green-400/30',
        text: 'text-green-300'
      },
      orange: {
        bg: 'bg-orange-500/20',
        border: 'border-orange-400/30',
        text: 'text-orange-300'
      }
    };
    
    return colors[colorName][type];
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showOnboardingForm) {
          setShowOnboardingForm(false);
        } else if (showDetailModal) {
          closeModal();
        }
      }
    };

    if (showDetailModal || showOnboardingForm) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showDetailModal, showOnboardingForm]);

  return (
    <div className="min-h-screen">
      {/* Background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-[calc(100vh-96px)] flex flex-col">
        {/* Header Section */}
        <div className="text-center py-16">
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6">
            Partner With Us
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto px-6">
            Join the ZiNRAi<span className="text-xs align-super">™</span> ecosystem and grow your business 
            while helping others achieve financial literacy and independence.
          </p>
        </div>

        {/* Partnership Options */}
        <div className="flex-1 px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partnerships.map((partnership, index) => (
                <div
                  key={partnership.id}
                  className={`
                    ${getColorClasses(partnership.color, 'bg')} 
                    ${getColorClasses(partnership.color, 'border')}
                    border rounded-lg p-8 cursor-pointer
                    hover:scale-105 transition-all duration-300
                    transform ${animatedIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => handlePartnershipClick(partnership)}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-light text-white mb-2">
                      {partnership.title}
                    </h3>
                    <p className={`text-sm ${getColorClasses(partnership.color, 'text')} mb-4`}>
                      {partnership.subtitle}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {partnership.description}
                    </p>
                    <div className="text-left">
                      <p className="text-white/50 text-xs mb-2">Key Benefits:</p>
                      <ul className="text-white/60 text-xs space-y-1">
                        {partnership.benefits.slice(0, 2).map((benefit, idx) => (
                          <li key={idx}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="px-6 pb-16">
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-light text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Join thousands of partners who are already building successful businesses with ZiNRAi<span className="text-xs align-super">™</span>.
            </p>
            <button
              onClick={() => setShowOnboardingForm(true)}
              className="px-8 py-3 bg-blue-600 border border-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Partnership Detail Modal */}
      {showDetailModal && selectedPartnership && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-white/20 rounded-lg p-8 max-w-md mx-4">
            <div className="text-center">
              <h3 className="text-2xl font-light text-white mb-4">
                {selectedPartnership.title}
              </h3>
              <p className={`text-sm ${getColorClasses(selectedPartnership.color, 'text')} mb-6`}>
                {selectedPartnership.subtitle}
              </p>
              <p className="text-white/80 leading-relaxed mb-6">
                {selectedPartnership.description}
              </p>
              <div className="text-left mb-8">
                <p className="text-white/70 text-sm mb-3">Benefits Include:</p>
                <ul className="text-white/60 text-sm space-y-2">
                  {selectedPartnership.benefits.map((benefit: string, idx: number) => (
                    <li key={idx}>• {benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    setShowOnboardingForm(true);
                  }}
                  className="flex-1 px-6 py-2 bg-blue-600 border border-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Form Modal */}
      {showOnboardingForm && (
        <OnboardingForm onClose={() => setShowOnboardingForm(false)} />
      )}
    </div>
  );
}