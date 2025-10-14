# OpenAI Integration for Local SEO Content Generation

This document explains how to set up and use OpenAI for generating unique, high-quality content for city pages in the Local SEO system.

## Setup Instructions

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy your API key (it starts with `sk-`)

### 2. Configure Environment Variables

1. Open the `.env.local` file in the `architecturaldrafting-net` directory
2. Replace `your_openai_api_key_here` with your actual OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
3. Save the file

### 3. Restart the Development Server

After adding your API key, restart the Next.js development server:

```bash
npm run dev
```

## Usage

### Creating a New City Page with OpenAI

1. Navigate to the admin page at `http://localhost:3031/admin`
2. Click "Add New City"
3. Fill in the city information:
   - City Name (required)
   - State (required)
   - Population (optional - helps AI generate more relevant content)
   - Neighborhoods (optional - helps AI understand the area better)
   - Landmarks (optional - adds local context)
4. Make sure "Use OpenAI for content generation" is checked (default)
5. Click "Generate & Add City"

The system will use OpenAI's GPT-4o-mini model to generate:
- A unique hero title
- An engaging hero description
- City-specific information about architectural drafting needs
- Detailed services content tailored to the city

### Fallback Behavior

If OpenAI is unavailable or encounters an error, the system automatically falls back to the template-based content spinner to ensure city pages can always be created.

## Features

### AI-Generated Content

- **High Uniqueness**: 95%+ unique content for each city
- **Natural Language**: Professional, engaging, and readable
- **SEO-Optimized**: Incorporates relevant keywords naturally
- **Location-Specific**: Mentions city characteristics and local context
- **Consistent Quality**: Uses GPT-4o-mini for reliable results

### Content Regeneration

When editing an existing city, you can regenerate its content:
1. Edit the city in the admin panel
2. Make sure "Use OpenAI for content generation" is checked
3. The system will generate fresh content using the updated information

## API Details

### Model Used
- **Model**: `gpt-4o-mini`
- **Temperature**: 0.8 (for creative, varied content)
- **Max Tokens**: 1500
- **Response Format**: JSON

### Cost Considerations

GPT-4o-mini is one of OpenAI's most cost-effective models:
- Input: ~$0.15 per 1M tokens
- Output: ~$0.60 per 1M tokens

Generating content for a single city page typically uses ~500-1000 tokens total (input + output), costing approximately $0.0003-$0.0006 per city page.

## Troubleshooting

### "OpenAI API key not configured" Error

1. Verify your `.env.local` file contains the API key
2. Make sure the key starts with `sk-`
3. Restart the development server
4. Clear your browser cache

### Content Generation Fails

1. Check your OpenAI account has available credits
2. Verify your API key is active and not revoked
3. Check the server console for detailed error messages
4. The system will automatically fall back to template-based generation

### Rate Limits

If you're generating many cities at once and hit rate limits:
1. Add delays between city creations
2. Upgrade your OpenAI plan if needed
3. The batch generation method includes automatic 500ms delays

## Technical Details

### Files Modified/Created

1. **`lib/openaiService.ts`**: Core OpenAI integration service
2. **`pages/api/cities.ts`**: Updated to use OpenAI for content generation
3. **`pages/admin.tsx`**: Added UI toggle for OpenAI usage
4. **`.env.local`**: Environment configuration
5. **`.env.local.example`**: Template for environment setup

### Service Methods

```typescript
// Generate complete city content
await openaiContentGenerator.generateCityContent(city, state, options)

// Generate specific section
await openaiContentGenerator.generateSection(city, state, 'hero')

// Batch generate for multiple cities
await openaiContentGenerator.batchGenerateCityContent(citiesArray)
```

## Best Practices

1. **Provide Additional Context**: Include population, neighborhoods, and landmarks for better AI output
2. **Review Generated Content**: Always review AI-generated content before publishing
3. **Monitor Costs**: Track your OpenAI API usage in the OpenAI dashboard
4. **Rate Limiting**: Avoid generating hundreds of pages simultaneously
5. **Error Handling**: The system gracefully falls back to template generation

## Security Notes

- Never commit your `.env.local` file to version control (it's already in `.gitignore`)
- Keep your OpenAI API key secure and private
- Rotate API keys regularly for security
- Set up usage limits in your OpenAI dashboard to prevent unexpected costs

## Support

For issues or questions:
1. Check the server console for detailed error logs
2. Verify your OpenAI API key and account status
3. Review the OpenAI API documentation: https://platform.openai.com/docs
