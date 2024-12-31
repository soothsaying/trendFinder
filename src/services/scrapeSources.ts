
import FirecrawlApp from '@mendable/firecrawl-js';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';


dotenv.config();

const app = new FirecrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});

export async function scrapeSources(sources: string[]) {
  const num_sources = sources.length;
    console.log(`Scraping ${num_sources} sources...`)

    let combinedText: { stories: any[] } = { stories: [] };
    const useTwitter = true;
    const useScrape = true;

    for (const source of sources) {
 
      if (source.includes('x.com')) {
        if (useTwitter) {
        const usernameMatch = source.match(/x\.com\/([^\/]+)/);

        if (usernameMatch) {
            const username = usernameMatch[1];
          
            // Construct and encode the queries for both from: and to:
            const fromQuery = `from:${username} has:media -is:reply -is:retweet`;
       
            const encodedFromQuery = encodeURIComponent(fromQuery);
        
          
            // Encode the start time
            const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
            const encodedStartTime = encodeURIComponent(startTime);
          
            // Make requests for both from: and to: tweets
            const fromApiUrl = `https://api.x.com/2/tweets/search/recent?query=${encodedFromQuery}&max_results=10&start_time=${encodedStartTime}`;
    
          
            // Fetch tweets from both endpoints
            const fromResponse = await fetch(fromApiUrl, {
                headers: {
                  'Authorization': `Bearer ${process.env.X_API_BEARER_TOKEN}`
                }
              });
            
            if (!fromResponse.ok) {
              throw new Error(`Failed to fetch from: tweets for ${username}: ${fromResponse.statusText}`);
            }
           
            
            const fromTweets = await fromResponse.json();

             
            // Process from: tweets
            if (fromTweets.data && Array.isArray(fromTweets.data)) {
              console.log(`Tweets found from username ${username}`);
              const stories = fromTweets.data.map((tweet: any) => {
                return {
                  headline: tweet.text,
                  link: `https://x.com/i/status/${tweet.id}`,
                  date_posted: startTime
                };
              });
              combinedText.stories.push(...stories);
            }
          }
        }
      } 
    }
    //fs.writeFileSync('./combinedText.json', JSON.stringify(combinedText, null, 2));
    const rawStories = combinedText.stories;
    return rawStories;
  }  
