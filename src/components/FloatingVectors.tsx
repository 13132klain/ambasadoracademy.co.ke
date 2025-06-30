import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Calculator,
  HelpCircle,
  Atom,
  Palette,
  Brush,
  Triangle,
  Search,
  Lightbulb,
  Clock,
  FlaskConical,
  Briefcase,
  GraduationCap,
  PenTool
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  book: BookOpen,
  calculator: Calculator,
  questionMark: HelpCircle,
  atom: Atom,
  palette: Palette,
  brush: Brush,
  ruler: Triangle,
  magnifyingGlass: Search,
  lightbulb: Lightbulb,
  clock: Clock,
  flask: FlaskConical,
  briefcase: Briefcase,
  graduationCap: GraduationCap,
  pen: PenTool
};

const FloatingVectors: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // We are moving the transform calculation to CSS with var(--scroll-y)
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const vectorItems = [
    { type: 'book', x: '5%', y: '10%', size: 'w-12 h-12', color: 'text-academy-maroon/20', parallax: 'parallax-1' },
    { type: 'atom', x: '85%', y: '15%', size: 'w-14 h-14', color: 'text-academy-blue/20', parallax: 'parallax-2' },
    { type: 'ruler', x: '15%', y: '60%', size: 'w-10 h-10', color: 'text-academy-maroon/15', parallax: 'parallax-3', transform: 'rotate(45deg)' },
    { type: 'flask', x: '80%', y: '45%', size: 'w-12 h-12', color: 'text-academy-blue/20', parallax: 'parallax-2' },
    { type: 'lightbulb', x: '10%', y: '30%', size: 'w-10 h-10', color: 'text-academy-maroon/15', parallax: 'parallax-1' },
    { type: 'palette', x: '90%', y: '70%', size: 'w-12 h-12', color: 'text-academy-blue/20', parallax: 'parallax-3' },
    { type: 'calculator', x: '20%', y: '80%', size: 'w-10 h-10', color: 'text-academy-maroon/20', parallax: 'parallax-2' },
    { type: 'magnifyingGlass', x: '75%', y: '85%', size: 'w-8 h-8', color: 'text-academy-blue/15', parallax: 'parallax-1' },
    { type: 'questionMark', x: '50%', y: '20%', size: 'w-12 h-12', color: 'text-academy-maroon/20', parallax: 'parallax-2' },
    { type: 'briefcase', x: '35%', y: '75%', size: 'w-14 h-14', color: 'text-academy-blue/20', parallax: 'parallax-3' },
    { type: 'clock', x: '60%', y: '5%', size: 'w-10 h-10', color: 'text-academy-maroon/15', parallax: 'parallax-1' },
    { type: 'graduationCap', x: '45%', y: '55%', size: 'w-16 h-16', color: 'text-academy-blue/20', parallax: 'parallax-2' },
    { type: 'brush', x: '95%', y: '40%', size: 'w-10 h-10', color: 'text-academy-maroon/20', parallax: 'parallax-3', transform: 'rotate(-30deg)' },
    { type: 'pen', x: '5%', y: '90%', size: 'w-8 h-8', color: 'text-academy-blue/25', parallax: 'parallax-1', transform: 'rotate(15deg)' },
  ];

  return (
    <div className="floating-vectors">
      {vectorItems.map((item, index) => {
        const IconComponent = iconMap[item.type];
        return (
          <div
            key={index}
            className={`vector-item ${item.type} ${item.parallax} ${item.color} ${item.size}`}
            style={{
              left: item.x,
              top: item.y,
              animationDelay: `${index * 0.5}s`,
              transform: item.transform
            }}
          >
            {IconComponent && <IconComponent strokeWidth={1.5} />}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingVectors; 