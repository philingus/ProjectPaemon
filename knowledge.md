# Pokemon AI Generator

## Project Overview
- Next.js web application for generating Pokemon-style pixel art using AI
- GameBoy-inspired UI with classic color palette
- Uses OpenAI for image generation

## Style Guide
- Font: Share Tech Mono from Google Fonts for retro gaming aesthetic
- Color Palette:
  - Darkest: #0F380F
  - Dark: #306230
  - Light: #8BAC0F
  - Lightest: #9BBC0F
  - Background: #C4CFA1
  - Screen: #8B956D

## Assets
- Background: mnslf2y8hxab1 (1).gif - Animated background with 30% opacity
- Logo: Screenshot__1046_-removebg-preview (2).png - Main project logo

## Components
- Use gameboy-container, gameboy-screen, and gameboy-button classes for consistent styling
- Keep pixel art aesthetic with image-rendering: pixelated

## Dependencies
- @vercel/ai: AI integration
- openai: OpenAI API client
- TailwindCSS: Styling

## Vercel Deployment Requirements
- Use Next.js Image component with proper width/height props
- Add remotePatterns to next.config.ts for external image domains
- Use 'use client' directive in client components
- Use proper key props in list iterations (avoid using array index)
- Keep dependencies up to date with `npm install`

## Image Handling
- Always provide fallback images for AI-generated content
- Use default-paemon.png as fallback for failed image loads
- Set unoptimized prop for external AI-generated images
- Log image generation failures for debugging
- Handle both generation and loading failures gracefully
- Add onError handlers to Image components for runtime failures
- For html2canvas image capture:
  - Use regular img tags instead of Next.js Image component
  - Set crossOrigin="anonymous" on images
  - Configure html2canvas with useCORS and allowTaint
  - Set imageTimeout: 0 to prevent timeouts
  - Use onclone to ensure crossOrigin in cloned document
- AI Image Generation:
  - Initialize image state as null to properly handle loading states
  - Only set image URL after successful generation
  - Log all image loading errors for debugging
  - Show loading state while image is being generated
  - Provide clear error messages when generation fails
  - Handle CORS issues with OpenAI-generated images
  - Use document.createElement('img') instead of new Image() for TypeScript compatibility
  - Preload images before setting state to ensure valid URLs
  - Set explicit width/height on image elements
  - Use separate loading states for generation and image loading
  - Validate OpenAI image URLs before attempting to load them
  - Use AbortController for timeouts instead of Promise.race
  - Force image remount by using key prop when URL changes
  - Provide clear fallback paths for each potential failure point
  - Keep image loading logic simple and avoid complex Promise chains
  - Use transition classes for smooth loading states
  - Handle both generation and loading errors separately
  - Log specific error types for better debugging
  - Prefer simple fallbacks over complex error recovery
  - Keep image display logic straightforward with clear loading states
  - Use max-width/max-height with object-contain for proper image scaling
- OpenAI DALL-E image domains to allow in next.config.ts:
  - oaidalleapicontent.blob.core.windows.net
  - oaidalleapiprodscus.blob.core.windows.net

## AI Implementation
- Uses OpenAI's DALL-E model for image generation
- Prompts are enhanced to specify GameBoy style and color palette
- Images are generated at 256x256 resolution
- Error handling and loading states included
- Direct download link for generated images
- Paemon details are generated using OpenAI's GPT-3.5-turbo
  - Generates structured JSON response with name, stats, moves, and background
  - Includes fallback content if AI generation fails
  - Response includes:
    - Basic stats (name, HP, type)
    - Moves with descriptions and attack values
    - Background story and personality traits
    - Special abilities unique to each Paemon

## Error Handling Strategy
- Always provide fallback content for AI failures
- Use default Paemon with basic but complete details
- Log errors to console but show user-friendly messages
- Check for missing data before API calls
- Maintain consistent UI even during errors
- Prevent duplicate API calls:
  - Use isGenerating flag to track API call status
  - Check existing data before making new calls
  - Add proper dependency arrays to useEffect
  - Clear loading states in finally block
- Run TypeScript type checking with `npx tsc --noEmit` to catch type errors
- Set timeouts for API calls:
  - 15 seconds for Paemon details generation
  - 15 seconds for image generation
  - Show appropriate timeout messages
- Two-step generation process:
  1. Generate Paemon details first
  2. Generate image second
  - Show progress for each step
  - Can fall back individually if either step fails
  - Visual progress indicator shows current step
  - Specific loading messages for each step
  - Smooth transitions between states
- Set timeouts for API calls:
  - 15 seconds for Paemon details generation
  - 15 seconds for image generation
  - Show appropriate timeout messages
- Two-step generation process:
  1. Generate Paemon details first
  2. Generate image second
  - Show progress for each step
  - Can fall back individually if either step fails
  - Visual progress indicator shows current step
  - Specific loading messages for each step
  - Smooth transitions between states

## Environment Variables
Required environment variables:
- OPENAI_API_KEY: OpenAI API key for image generation
  - Must be set as NEXT_PUBLIC_OPENAI_API_KEY for client-side access
  - Required for Paemon generation and image creation to work

## Development
- Run `npm install` to install dependencies
- Run `npm run dev` to start development server
- Access the app at:
  - Local: http://localhost:3000
  - Network: http://<your-ip>:3000

## TODO
- Add image saving to server
- Add gallery of generated Pokemon
- Implement rate limiting
- Add more prompt templates

## Flow
1. Homepage ('/') - Welcome screen with animated "Ready" button
2. Questionnaire ('/questionnaire') - 6 questions to determine Pokemon traits
3. Generate ('/generate') - Creates personalized Pokemon with details

## Questionnaire Design
- Questions focus on personality and preferences
- Each question has 5 options for more nuanced choices
- Options are descriptive and immersive
- Questions cover:
  - Daily activities
  - Special abilities
  - Food preferences
  - Problem-solving approach
  - Living environment
  - Companion preferences

## Components
- Use gba-container, gba-screen, gba-button, and gba-input classes for consistent styling
- All components follow GameBoy-inspired theme with pixelated aesthetic
- Animations and transitions use Magic Loops inspired effects
- Use `unoptimized` prop on Next.js Image components when displaying animated GIFs

## Styling Guidelines
- Add text-shadow class to all text for better readability
- Use scrollable-card class for content that might overflow
- Apply shadow-md and hover:shadow-lg for interactive elements
- Use sticky headers in scrollable content
- Maintain consistent rounded corners with rounded-xl
- Add backdrop-blur and semi-transparent backgrounds for depth
- Background GIF: Use opacity-30 and z-0 for subtle effect
- Content: Place in z-10 with relative positioning for proper layering

## Shadow Effects
- Text: Use text-shadow class for 2px/2px/4px shadow with 0.7 opacity
- Images: Apply logo-shadow class for 8px/16px drop shadow
- Spinning Elements: Use spinning-cat class with enhanced drop shadow
- Interactive Elements: Combine hover:shadow-xl with transition effects

## Interactive Elements
- Buttons: Use gba-button class with hover:-translate-y-0.5 and scale-95 on active
- Cards: Apply hover:shadow-2xl for depth on hover
- Inputs: Use gba-input with focus rings and hover states
- Scrollable Content: Use scrollable-card with custom scrollbar styling
- Images: Apply pixelated class for retro aesthetic

## Loading States
- Keep loading states simple and focused
- Use "Hatching..." for Paemon generation
- Center loading indicators on screen
- Provide visual feedback with animations
- Transition smoothly to content when ready

## Layout Guidelines
- Homepage: Centered, vertical layout with logo, welcome message, and start button
- Generate page: Two-column layout on desktop, single column on mobile
- Max width: 1280px for main content container
- Trainer name displayed prominently near Paemon card
- Social sharing section below Paemon details

## Flow
1. Homepage ('/') - Welcome screen with animated "Ready" button
2. Questionnaire ('/questionnaire') - 6 questions to determine Pokemon traits
3. Generate ('/generate') - Creates personalized Pokemon with details

## Components
- Use gba-container, gba-screen, gba-button, and gba-input classes for consistent styling
- All components follow GameBoy-inspired theme with pixelated aesthetic
- Animations and transitions use Magic Loops inspired effects
- Use `unoptimized` prop on Next.js Image components when displaying animated GIFs

## Responsive Design Strategy
- Mobile-first approach with single column layouts
- Breakpoints:
  - Default (mobile): Full-width, stacked elements
  - md (768px): Increased padding and font sizes
  - lg (1024px): Two-column grid for card and info
- Use container queries for nested responsive components
- Maintain consistent spacing with standardized padding classes

## Storage
- pokemonAnswers: JSON object in localStorage with trainer's questionnaire responses
  - Required before accessing generate page
  - Redirect to /questionnaire if missing

## Chatbot (Temporarily Removed)
- Professor Nosu chatbot integration pending proper configuration
- Will be re-implemented once type issues are resolved
- Consider using a different chatbot library or custom implementation

## Audio Implementation
- Background music starts automatically on page load
- Uses autoPlay attribute and programmatic play() call for maximum compatibility
- Note: Browser autoplay policies may block automatic playback until user interacts with the page
- Initial volume set to 50% for better user experience
- Audio player shows in bottom-right corner with prominent play/pause controls
