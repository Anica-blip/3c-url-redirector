/**
 * 3C Thread To Success - Branded URL Redirector
 * 
 * Clean, branded short links that redirect to your long URLs
 * Example: 3c-public-library.org/notion → your-long-notion-url
 * 
 * Features:
 * - Branded short URLs
 * - Easy to manage redirects
 * - Analytics tracking
 * - Custom 404 page
 */

// URL Redirect Mapping
// Add your redirects here - easy to update!
const REDIRECTS = {
  // Notion Links
  'notion': 'https://your-notion-workspace-url.notion.site/your-page',
  'notion-docs': 'https://your-notion-workspace-url.notion.site/documentation',
  'notion-resources': 'https://your-notion-workspace-url.notion.site/resources',
  
  // Canva Landing Pages
  'canva-landing': 'https://your-long-canva-url.my.canva.site/landing-page',
  'canva-offer': 'https://your-long-canva-url.my.canva.site/special-offer',
  'canva-signup': 'https://your-long-canva-url.my.canva.site/signup',
  
  // Social Media
  'instagram': 'https://instagram.com/your-profile',
  'youtube': 'https://youtube.com/@your-channel',
  'linkedin': 'https://linkedin.com/in/your-profile',
  'discord': 'https://discord.gg/your-server',
  'telegram': 'https://t.me/your-channel',
  
  // Common Actions
  'join': 'https://your-signup-form-url',
  'book': 'https://calendly.com/your-link',
  'contact': 'https://your-contact-form',
  'support': 'https://your-support-page',
  
  // Courses & Training
  'course': 'https://your-course-platform-url',
  'training': 'https://your-training-page-url',
  'workshop': 'https://your-workshop-registration-url',
  
  // Resources
  'resources': 'https://your-resources-page',
  'downloads': 'https://your-downloads-page',
  'tools': 'https://your-tools-page',
  
  // Special Campaigns
  'promo': 'https://your-promo-page',
  'special': 'https://your-special-offer',
  'launch': 'https://your-launch-page',
  
  // Example: Vercel URLs you want to hide
  'app': 'https://your-app.vercel.app',
  'dashboard': 'https://your-dashboard.vercel.app',
};

// Analytics tracking (optional)
async function trackRedirect(slug, request, env) {
  // You can add analytics here if you have a database
  // For now, we'll just log to console
  console.log(`Redirect: ${slug} from ${request.headers.get('cf-connecting-ip')}`);
}

// Generate a nice 404 page
function generate404Page() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Link Not Found - 3C Thread To Success</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            padding: 60px 40px;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .logo {
            font-size: 80px;
            margin-bottom: 20px;
        }
        
        h1 {
            font-size: 32px;
            color: #333;
            margin-bottom: 10px;
        }
        
        h2 {
            font-size: 24px;
            color: #667eea;
            margin-bottom: 20px;
        }
        
        p {
            font-size: 18px;
            color: #666;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        
        .links {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 2px solid #f0f0f0;
        }
        
        .links h3 {
            color: #333;
            margin-bottom: 15px;
            font-size: 18px;
        }
        
        .link-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }
        
        .link-item {
            background: #f5f5f5;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            color: #667eea;
            text-decoration: none;
            transition: all 0.2s;
        }
        
        .link-item:hover {
            background: #667eea;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🔗</div>
        <h1>Link Not Found</h1>
        <h2>3C Thread To Success</h2>
        <p>
            Oops! The short link you're looking for doesn't exist.<br>
            Double-check the URL or visit our main site.
        </p>
        <a href="https://3c-public-library.org" class="btn">Go to Main Site</a>
        
        <div class="links">
            <h3>Popular Links:</h3>
            <div class="link-list">
                <a href="/join" class="link-item">Join Community</a>
                <a href="/resources" class="link-item">Resources</a>
                <a href="/course" class="link-item">Courses</a>
                <a href="/contact" class="link-item">Contact</a>
            </div>
        </div>
    </div>
</body>
</html>
  `;
}

// Main worker handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.slice(1); // Remove leading slash
    
    // Root path - redirect to main site or show info page
    if (!path || path === '') {
      return Response.redirect('https://3c-public-library.org', 301);
    }
    
    // Check if redirect exists
    const redirectUrl = REDIRECTS[path.toLowerCase()];
    
    if (redirectUrl) {
      // Track the redirect (optional)
      await trackRedirect(path, request, env);
      
      // Perform the redirect
      return Response.redirect(redirectUrl, 301);
    }
    
    // No redirect found - show 404 page
    return new Response(generate404Page(), {
      status: 404,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
      },
    });
  },
};
