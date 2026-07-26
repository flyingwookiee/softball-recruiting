import { GoogleGenAI } from '@google/genai';
import { collegesDatabase } from '../data/collegesDatabase';
import { sophomoreRecruitingTimeline } from '../data/recruitingRules';

// Initialize Gemini Client dynamically
const getGeminiClient = (apiKey) => {
  if (!apiKey) return null;
  try {
    return new GoogleGenAI({ apiKey });
  } catch (e) {
    console.warn("Could not instantiate GoogleGenAI", e);
    return null;
  }
};

export const geminiService = {
  /**
   * Main chat function for the recruiting assistant
   * @param {string} prompt User message or prompt
   * @param {string} apiKey User's Gemini API key (optional)
   * @param {object} athleteContext Current athlete profile details
   * @returns {Promise<{text: string, actionRecommendations?: Array}>}
   */
  askAssistant: async (prompt, apiKey, athleteContext) => {
    const aiClient = getGeminiClient(apiKey);
    const lowercasePrompt = prompt.toLowerCase();

    // If Gemini API Key is provided, attempt live API call
    if (aiClient) {
      try {
        const systemInstruction = `
You are an expert College Softball Recruiting Consultant assisting a High School Sophomore (Class of 2029) named ${athleteContext.name} from ${athleteContext.hometown} who plays at ${athleteContext.highSchool} and ${athleteContext.travelTeam}.
Her positions are ${athleteContext.primaryPosition} / ${athleteContext.secondaryPosition}. GPA: ${athleteContext.gpa}.
Exit Velo: ${athleteContext.metrics.exitVelocity}, Home-to-First: ${athleteContext.metrics.homeToFirst}.

Guidelines:
1. Provide actionable, supportive, and clear recruiting advice formatted with Markdown (bolding, lists, code blocks for emails).
2. For Class of 2029 sophomores, emphasize NCAA Division 1 & Division 2 rules (D1/D2 coaches cannot make direct contact until Sept 1 of Junior year, but athletes CAN email coaches, send video, and attend camps).
3. Draft personalized, professional emails when requested using merge tags like [Head Coach Name], [College Name].
4. Suggest target colleges from NCAA D1, D2, D3, NAIA, NJCAA based on location, academic majors, and division preferences.
`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }] }
          ]
        });

        if (response && response.text) {
          return { text: response.text };
        }
      } catch (err) {
        console.error("Gemini API call error, using intelligent fallback", err);
      }
    }

    // Intelligent Fallback Logic if no key is provided or call fails
    return geminiService.generateFallbackResponse(lowercasePrompt, prompt, athleteContext);
  },

  /**
   * Smart fallback AI responder for College Softball Recruiting
   */
  generateFallbackResponse: (lowercase, originalPrompt, athlete) => {
    // 1. College Recommendation Request
    if (lowercase.includes('find') || lowercase.includes('suggest') || lowercase.includes('college') || lowercase.includes('school') || lowercase.includes('recommend')) {
      let filtered = collegesDatabase;
      if (lowercase.includes('d2') || lowercase.includes('division 2')) {
        filtered = collegesDatabase.filter(c => c.division === 'NCAA D2');
      } else if (lowercase.includes('d3') || lowercase.includes('division 3')) {
        filtered = collegesDatabase.filter(c => c.division === 'NCAA D3');
      } else if (lowercase.includes('d1') || lowercase.includes('division 1')) {
        filtered = collegesDatabase.filter(c => c.division === 'NCAA D1');
      } else if (lowercase.includes('naia')) {
        filtered = collegesDatabase.filter(c => c.division === 'NAIA');
      } else if (lowercase.includes('west') || lowercase.includes('washington') || lowercase.includes('pacific')) {
        filtered = collegesDatabase.filter(c => c.region === 'Pacific Northwest' || c.state === 'WA' || c.state === 'OR');
      }

      const topPicks = filtered.slice(0, 4);
      let replyText = `### 🥎 College Softball Recommendations for ${athlete.name} (Class of 2029)\n\n`;
      replyText += `Based on your request, your High School Sophomore status in ${athlete.hometown}, and your academic profile (GPA: **${athlete.gpa}**):\n\n`;

      topPicks.forEach(school => {
        replyText += `* **${school.name}** (${school.division} - ${school.conference})\n`;
        replyText += `  * 📍 *Location*: ${school.city}, ${school.state}\n`;
        replyText += `  * 🧢 *Head Coach*: ${school.headCoach} (${school.coachEmail})\n`;
        replyText += `  * 📚 *Majors*: ${school.popularMajors.join(', ')}\n`;
        replyText += `  * 💡 *Notes*: ${school.notes}\n\n`;
      });

      replyText += `> **Recruiting Tip for Sophomores**: You can add any of these programs directly to your **Target CRM** in the dashboard and send intro emails with your hitting film!`;

      return {
        text: replyText,
        actionRecommendations: topPicks
      };
    }

    // 2. Email Drafting Request
    if (lowercase.includes('email') || lowercase.includes('draft') || lowercase.includes('template') || lowercase.includes('write')) {
      const template = `Subject: Class of 2029 [Position] - ${athlete.name} - ${athlete.highSchool} (${athlete.state}) - Video & Stats

Dear Coach [Head Coach Last Name],

My name is ${athlete.name}, and I am a Sophomore (Class of 2029) at ${athlete.highSchool} in ${athlete.hometown}. I play ${athlete.primaryPosition} and ${athlete.secondaryPosition} for my high school team and ${athlete.travelTeam} (#${athlete.jerseyNumber}).

I am very interested in [College Name] because of your outstanding softball program and strong academic offerings in [Intended Major].

Here is a quick snapshot of my athletic and academic credentials:
• Graduation Year: 2029 | GPA: ${athlete.gpa} (Weighted)
• Primary Positions: ${athlete.primaryPosition} / ${athlete.secondaryPosition}
• Exit Velocity: ${athlete.metrics.exitVelocity} | Home-to-First: ${athlete.metrics.homeToFirst}
• NCAA Eligibility ID: ${athlete.ncaaId}

Highlight Reel Link: [Insert Link to Video]

I would love for you to evaluate my film. My team will be competing at [Upcoming Event Name] on [Event Dates] in [Location]. I will be wearing jersey #${athlete.jerseyNumber}.

Thank you for your time and consideration!

Best regards,

${athlete.name}
Class of 2029 | ${athlete.primaryPosition}
${athlete.highSchool} (${athlete.hometown})
Email: ${athlete.contact.email} | Phone: ${athlete.contact.phone}
Twitter: ${athlete.contact.twitter}`;

      return {
        text: `### ✉️ Personalized Sophomore Outreach Email Template\n\nHere is a tailored email draft optimized for Class of 2029 recruiting outreach to college head coaches:\n\n\`\`\`text\n${template}\n\`\`\`\n\n> **Tip**: You can use the **Email Composer** tab in your dashboard to auto-populate this email with any college in your target list!`
      };
    }

    // 3. NCAA Rules or Timeline Questions
    if (lowercase.includes('rule') || lowercase.includes('ncaa') || lowercase.includes('sophomore') || lowercase.includes('when') || lowercase.includes('contact')) {
      let rulesReply = `### 📋 NCAA Recruiting Rules & Guidelines for Sophomores (Class of 2029)\n\n`;
      rulesReply += `As a High School Sophomore in Alaska, here is what you need to know about college softball recruiting rules:\n\n`;
      
      sophomoreRecruitingTimeline.keyRules.forEach(rule => {
        rulesReply += `* **${rule.title}**: ${rule.description}\n`;
      });

      rulesReply += `\n#### 🎯 Key Action Items for 10th Grade:\n`;
      rulesReply += `1. **Create/Update your Skills Video**: Keep it under 3 minutes with unedited clips of exit velo, footwork, and game swings.\n`;
      rulesReply += `2. **Register with the NCAA Eligibility Center**: Create a Free Profile Page account.\n`;
      rulesReply += `3. **Build your 20-30 School Target List**: Include a mix of D1, D2, D3, and NAIA programs.\n`;
      rulesReply += `4. **Send Regular Monthly Updates**: Send your summer showcase schedule and high school stats to target coaches. Even if D1/D2 coaches can't reply yet, they maintain prospective athlete folders!`;

      return { text: rulesReply };
    }

    // Default General Assistant Response
    return {
      text: `### 🤖 Softball Recruiting AI Assistant\n\nHello ${athlete.name}! I am your AI Recruiting Consultant. I can help you with:\n\n` +
        `1. **Finding College Programs**: Ask me to recommend D1, D2, D3, or NAIA softball teams based on location or academic majors (e.g., *"Find D2 schools in Washington state with Nursing"*).\n` +
        `2. **Composing Coach Outreach**: Ask me to draft a high-impact intro email or follow-up email to college coaches.\n` +
        `3. **NCAA Rules & Timeline**: Ask me about NCAA rules for Class of 2029 sophomores, camp invitation strategies, or official visit rules.\n` +
        `4. **Mailing Lists & Correspondence**: Ask me how to organize your contact logs and schedule updates.\n\n` +
        `> **Pro-Tip**: Add your Google Gemini API Key in the top dashboard bar to unlock real-time Gemini LLM answers!`
    };
  }
};
