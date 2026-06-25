import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const ADJECTIVES = [
  'breathtaking',
  'pristine',
  'crystalline',
  'timeless',
  'sun-kissed',
  'extraordinary',
  'serene',
  'immersive',
  'vibrant',
  'majestic',
  'island-born',
  'unforgettable',
];

const TYPE_SPEED = 60;
const ERASE_SPEED = 40;
const PAUSE_AFTER_WORD = 1500;
const PAUSE_AFTER_ERASE = 400;

function useTypewriter(words: string[]) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];

    if (!erasing) {
      if (charIndex < word.length) {
        const t = setTimeout(() => {
          setDisplayed(word.slice(0, charIndex + 1));
          setCharIndex(i => i + 1);
        }, TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setErasing(true), PAUSE_AFTER_WORD);
        return () => clearTimeout(t);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(word.slice(0, charIndex - 1));
          setCharIndex(i => i - 1);
        }, ERASE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setWordIndex(i => (i + 1) % words.length);
          setErasing(false);
        }, PAUSE_AFTER_ERASE);
        return () => clearTimeout(t);
      }
    }
  }, [erasing, charIndex, wordIndex, words]);

  return displayed;
}

export default function ComingSoon() {
  const word = useTypewriter(ADJECTIVES);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Helmet>
        <title>BetterAlaminosCity.org — Coming Soon</title>
        <meta
          name="description"
          content="A better way to access Alaminos City government services. Coming soon."
        />
      </Helmet>
      <div
        className="min-h-screen bg-white flex flex-col justify-center px-8 md:px-16 lg:px-32"
        style={{ color: '#162456' }}
      >
        <div
          className="flex items-center gap-2 text-sm font-medium mb-20"
          style={{ opacity: 0.5 }}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>BetterAlaminosCity.org</span>
        </div>

        <div className="mb-20">
          <p className="text-4xl md:text-5xl lg:text-6xl font-normal leading-snug">
            cooking something
          </p>
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug">
            {word}
            <span style={{ opacity: cursorOn ? 1 : 0 }}>|</span>
          </p>
        </div>

        <p className="text-xs" style={{ opacity: 0.35 }}>
          BetterAlaminosCity.org
        </p>
      </div>
    </>
  );
}
