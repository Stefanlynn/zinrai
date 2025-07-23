import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function Culture() {
  const { t } = useTranslation();
  const [animatedIn, setAnimatedIn] = useState(false);
  const [activeFoundation, setActiveFoundation] = useState(0);
  const [activePillar, setActivePillar] = useState(-1);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedIn(true);
    }, 100);
  }, []);

  const visionMission = {
    vision: {
      title: t('culture.vision.title'),
      description: t('culture.vision.description')
    },
    mission: {
      title: t('culture.mission.title'), 
      description: t('culture.mission.description')
    }
  };

  const pillarSections = [
    {
      letter: "Z",
      title: t('culture.pillars.zeal.title'),
      description: t('culture.pillars.zeal.description'),
      color: "orange"
    },
    {
      letter: "I",
      title: t('culture.pillars.integrity.title'),
      description: t('culture.pillars.integrity.description'),
      color: "red"
    },
    {
      letter: "N",
      title: t('culture.pillars.nobility.title'),
      description: t('culture.pillars.nobility.description'),
      color: "yellow"
    },
    {
      letter: "R",
      title: t('culture.pillars.resilience.title'),
      description: t('culture.pillars.resilience.description'),
      color: "indigo"
    },
    {
      letter: "A",
      title: t('culture.pillars.authenticity.title'),
      description: t('culture.pillars.authenticity.description'),
      color: "blue"
    },
    {
      letter: "I",
      title: t('culture.pillars.impact.title'),
      description: t('culture.pillars.impact.description'),
      color: "purple"
    }
  ];



  const handlePillarClick = (index: number) => {
    setActivePillar(index);
  };

  const getSectionColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
      purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
      orange: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
      green: "from-green-500/20 to-green-600/10 border-green-500/30",
      red: "from-red-500/20 to-red-600/10 border-red-500/30",
      yellow: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
      cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
      indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30"
    };
    return colors[color] || colors.blue;
  };

  const getDotColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      green: "bg-green-500",
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      cyan: "bg-cyan-500",
      indigo: "bg-indigo-500"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Content area */}
      <div className="relative z-10 page-content">
        <div className={`p-8 pt-[10vh] md:p-16 md:pt-[15vh] transition-all duration-700 ${animatedIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="max-w-4xl mx-auto">
            {/* Main Header */}
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light mb-8 tracking-wide text-center">
              {t('culture.hero_title')}
            </h1>
            
            {/* Main Introduction */}
            <div className="text-white/80 text-lg leading-relaxed mb-16 space-y-4 whitespace-pre-line">
              {t('culture.introduction')}
            </div>

            {/* Vision Section */}
            <div className="mb-12">
              <h2 className="text-white text-2xl md:text-3xl font-light mb-4">
                {visionMission.vision.title}
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                {visionMission.vision.description}
              </p>
            </div>

            {/* Mission Section */}
            <div className="mb-16">
              <h2 className="text-white text-2xl md:text-3xl font-light mb-4">
                {visionMission.mission.title}
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                {visionMission.mission.description}
              </p>
            </div>

            {/* Core Values Section */}
            <div className="mb-8">
              <h2 className="text-white text-2xl md:text-3xl font-light mb-4">
                {t('culture.core_values.title')}
              </h2>
              <p className="text-white/70 text-lg mb-12">
                {t('culture.core_values.description')}
              </p>

              {/* Values Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillarSections.map((pillar, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-br from-black/40 to-black/60 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-10 h-10 rounded-full ${getDotColor(pillar.color)} flex items-center justify-center text-black font-bold text-lg`}>
                        {pillar.letter}
                      </div>
                      <h3 className="text-white text-xl font-medium">{pillar.title}</h3>
                    </div>
                    <p className="text-white/70 text-base leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}