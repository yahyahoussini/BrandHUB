const fs = require('fs');
const path = require('path');
const { generateUniqueBlogPosts } = require('../services/ai.cjs');

const POST_COUNT = 200;
const OUTPUT_DIR = path.resolve(__dirname, '../src/content');
const OUTPUT_FILE = path.resolve(OUTPUT_DIR, 'generated-posts.json');

async function generateAndSavePosts() {
  try {
    console.log('Starting content generation process...');

    // Ensure the output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Generate the blog posts
    const newPosts = await generateUniqueBlogPosts(POST_COUNT);

    if (newPosts.length === 0) {
      console.error('No posts were generated. Aborting.');
      return;
    }

    // Save the posts to a JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(newPosts, null, 2), 'utf-8');

    console.log(`Successfully generated and saved ${newPosts.length} posts to ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('An error occurred during the content generation process:', error);
  }
}

generateAndSavePosts();
