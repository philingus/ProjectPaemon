'use client'

import { useState, useEffect } from 'react'
import { OpenAI } from 'openai'
import Image from 'next/image'
import PaemonCard from '../components/PaemonCard'
import PaemonInfo from '../components/PaemonInfo'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface PokemonAnswers {
  environment: string;
  strength: string;
  color: string;
  personality: string;
  activity: string;
  element: string;
}

interface PaemonDetails {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  type: string;
  moves: Array<{
    name: string;
    description: string;
    attack?: number;
  }>;
  weakness: string;
  flavorText: string;
  background: string;
  personality: string;
  specialAbilities: string[];
}

/**
 * Returns default Paemon details when OpenAI generation fails
 */
const getFallbackPaemonDetails = (): PaemonDetails => ({
  name: 'Default Paemon',
  hp: 80,
  attack: 70,
  defense: 65,
  speed: 60,
  type: 'Normal',
  moves: [
    {
      name: 'Basic Attack',
      description: 'A simple but effective strike',
      attack: 1
    },
    {
      name: 'Defensive Stance',
      description: 'Takes a defensive position to minimize damage'
    }
  ],
  weakness: 'None',
  flavorText: 'A mysterious Paemon with undefined origins.',
  background: 'This Paemon appeared when another could not be generated. While its origins are unknown, it possesses a reliable set of basic abilities.',
  personality: 'Adaptable and steady, this Paemon maintains its composure in any situation.',
  specialAbilities: ['Adaptable: Can function in any environment', 'Resilient: Never gives up']
});

/**
 * Generates Paemon details using OpenAI based on user's questionnaire answers
 */
const generatePaemonDetails = async (answers: PokemonAnswers): Promise<PaemonDetails> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a Paemon generator that creates both card details and additional background information. Respond in JSON format."
        },
        {
          role: "user",
          content: `Generate a Paemon based on these preferences:
            Environment: ${answers.environment}
            Primary Strength: ${answers.strength}
            Color: ${answers.color}
            Personality: ${answers.personality}
            Activity: ${answers.activity}
            Element: ${answers.element}

            Respond with a JSON object containing:
            {
              "name": "string (4-10 characters)",
              "hp": "number (60-120)",
              "attack": "number (40-100)",
              "defense": "number (40-100)",
              "speed": "number (40-100)",
              "type": "string",
              "moves": [
                {
                  "name": "string",
                  "description": "string",
                  "attack": "number (optional)"
                }
              ],
              "weakness": "string",
              "flavorText": "string",
              "background": "string",
              "personality": "string",
              "specialAbilities": ["string"]
            }`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || '';
    try {
      return JSON.parse(content);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      return getFallbackPaemonDetails();
    }
  } catch (error) {
    console.error('Error generating details:', error);
    return getFallbackPaemonDetails();
  }
};

/**
 * Generates Paemon details with timeout
 */
const generatePaemonDetailsWithTimeout = async (
  answers: PokemonAnswers, 
  timeout: number = 15000
): Promise<PaemonDetails> => {
  const timeoutPromise = new Promise<PaemonDetails>((_, reject) => {
    setTimeout(() => reject(new Error('Request timed out')), timeout);
  });

  try {
    const result = await Promise.race([
      generatePaemonDetails(answers),
      timeoutPromise
    ]);
    return result;
  } catch (error) {
    console.error('Generation failed:', error);
    throw error;
  }
};

/**
 * Generates image with timeout
 */
const generateImageWithTimeout = async (
  prompt: string,
  timeout: number = 15000
): Promise<string> => {
  const timeoutPromise = new Promise<string>((_, reject) => {
    setTimeout(() => reject(new Error('Image generation timed out')), timeout);
  });

  try {
    const imagePromise = openai.images.generate({
      prompt,
      n: 1,
      size: "256x256",
      response_format: "url",
    }).then(response => response.data[0]?.url || '');

    const result = await Promise.race([
      imagePromise,
      timeoutPromise
    ]);

    if (!result) {
      throw new Error('No image URL received');
    }

    return result;
  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
};

export default function GeneratePage() {
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [paemonDetails, setPaemonDetails] = useState<PaemonDetails | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const generatePaemon = async () => {
      // Skip if already generating or if we already have a Paemon
      if (isGenerating || paemonDetails) {
        return;
      }

      const answers = JSON.parse(localStorage.getItem('pokemonAnswers') || '{}')
      
      if (!Object.keys(answers).length) {
        console.error('No questionnaire answers found')
        setPaemonDetails(getFallbackPaemonDetails())
        setError('Could not find your preferences. Using default Paemon.')
        setLoading(false)
        return
      }
      
      try {
        setIsGenerating(true)
        
        // Generate Paemon details
        const details = await generatePaemonDetailsWithTimeout(answers)
        setPaemonDetails(details)
        
        // Generate image
        const enhancedPrompt = `A highly detailed pixel art Pokemon in GameBoy Advance style. ${details.flavorText}. Create a sharp, clear sprite with rich colors and fine details, maintaining the classic pixel art aesthetic while maximizing detail within the 256x256 resolution. Include subtle shading and highlights to enhance depth.`
        const imageUrl = await generateImageWithTimeout(enhancedPrompt)
        setImageUrl(imageUrl)
        
      } catch (err) {
        console.error('Generation error:', err)
        const errorMessage = err instanceof Error && err.message === 'Request timed out'
          ? 'Generation is taking longer than expected. Using default Paemon.'
          : 'Failed to generate your Paemon. Using default Paemon instead.'
        
        setError(errorMessage)
        setPaemonDetails(getFallbackPaemonDetails())
      } finally {
        setLoading(false)
        setIsGenerating(false)
      }
    }

    generatePaemon()
  }, [isGenerating, paemonDetails]) // Only re-run if these dependencies change

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        {/* Background GIF */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/mnslf2y8hxab1 (1).gif"
            alt="Background Animation"
            fill
            className="object-cover opacity-30"
            priority
            unoptimized
          />
        </div>

        <div className="text-center space-y-4 relative z-10">
          <div className="spinning-cat">
            <Image
              src="/uia-unscreen.gif"
              alt="Loading..."
              fill
              className="object-contain pixelated"
              priority
              unoptimized
            />
          </div>
          <h2 className="text-2xl font-bold text-[#E0757C] animate-pulse text-shadow">
            Hatching...
          </h2>
        </div>
      </div>
    )
  }

  if (!paemonDetails) {
    return null
  }

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      {/* Background GIF */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/mnslf2y8hxab1 (1).gif"
          alt="Background Animation"
          fill
          className="object-cover opacity-30"
          priority
          unoptimized
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        {error && (
          <div className="text-center p-4">
            <p className="text-red-500 font-bold">{error}</p>
          </div>
        )}
        
        <PaemonCard
          name={paemonDetails.name}
          hp={paemonDetails.hp}
          attack={paemonDetails.attack}
          defense={paemonDetails.defense}
          speed={paemonDetails.speed}
          type={paemonDetails.type}
          moves={paemonDetails.moves}
          weakness={paemonDetails.weakness}
          flavorText={paemonDetails.flavorText}
          imageUrl={imageUrl || '/uia-unscreen.gif'}
        />
        
        <PaemonInfo
          name={paemonDetails.name}
          background={paemonDetails.background}
          personality={paemonDetails.personality}
          specialAbilities={paemonDetails.specialAbilities}
        />
      </div>
    </div>
  )
}
