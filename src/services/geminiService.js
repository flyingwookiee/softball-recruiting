import { GoogleGenAI } from '@google/genai';
import { collegesDatabase } from '../data/collegesDatabase';
import { sophomoreRecruitingTimeline } from '../data/recruitingRules';

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
   * Unrestricted AI Assistant handling general Q&A and explicit website commands
   */
  askAssistant: async (prompt, apiKey, athleteContext, targetsContext) => {
    const lowercasePrompt = prompt.toLowerCase().trim();

    // 1. Check ONLY for EXPLICIT website mutation intents (e.g. "change my...", "update my...", "set my...")
    const isExplicitMutationIntent = 
      lowercasePrompt.startsWith('change ') ||
      lowercasePrompt.startsWith('update ') ||
      lowercasePrompt.startsWith('edit ') ||
      lowercasePrompt.startsWith('set ') ||
      lowercasePrompt.includes('add to my target') ||
      lowercasePrompt.includes('add to my crm');

    if (isExplicitMutationIntent) {
      const executionResult = geminiService.executeNaturalLanguageCommand(lowercasePrompt, prompt, athleteContext, targetsContext);
      if (executionResult.commandExecuted) {
        return executionResult;
      }
    }

    // 2. Otherwise, treat as a General AI Question! Use live Gemini LLM API if key is provided.
    const aiClient = getGeminiClient(apiKey);
    if (aiClient) {
      try {
        const systemInstruction = `
You are an intelligent, supportive AI Assistant & College Softball Recruiting Consultant for Emily Sain (Class of 2029) at Chugiak High School in Eagle River, Alaska.
Emily plays Shortstop & Utility (#14) for Alaska Arsenal 16U, has a 3.95 GPA, and intends to major in Nursing (BSN). Her target regions include Texas, Colorado, and the Pacific Northwest.

Guidelines:
1. Answer ANY general question Emily or her family asks (softball strategy, NCAA rules, email advice, academic tips, Nursing school requirements, college search, general conversation).
2. Be friendly, encouraging, concise, and structured with clear Markdown formatting.
3. If they ask about changing site stats or adding schools to CRM, let them know they can say "Change my exit velocity to 68 MPH" or "Add UT Tyler to my target list".
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
        console.error("Gemini API call failed, using intelligent general responder", err);
      }
    }

    // 3. Fallback Intelligent General Question Responder when no API Key is set
    return geminiService.generateGeneralKnowledgeResponse(lowercasePrompt, prompt, athleteContext);
  },

  /**
   * Natural Language Command Mutator (Triggered ONLY on explicit edit requests)
   */
  executeNaturalLanguageCommand: (lowercase, originalPrompt, athlete, targets) => {
    let updatedAthlete = { ...athlete };
    let updatedTargets = [...targets];
    let commandExecuted = false;
    let confirmationMessage = '';

    // Command: Update Exit Velocity (e.g. "change exit velocity to 68", "update exit velo to 70 MPH")
    if (lowercase.includes('exit velo') || lowercase.includes('exit velocity')) {
      const match = originalPrompt.match(/(\d+)\s*(mph)?/i);
      if (match) {
        const newVelo = `${match[1]} MPH`;
        updatedAthlete.metrics = { ...updatedAthlete.metrics, exitVelocity: newVelo };
        commandExecuted = true;
        confirmationMessage = `⚡ **Website Updated!** Updated Exit Velocity to **${newVelo}**!`;
      }
    }

    // Command: Update Batting Average (e.g. "change batting average to .450")
    else if (lowercase.includes('batting average') || lowercase.includes('ba to') || lowercase.includes('batting avg')) {
      const match = originalPrompt.match(/(\.\d{3}|\d\.\d{3})/);
      if (match) {
        const newBa = match[1];
        updatedAthlete.seasonStats = { ...updatedAthlete.seasonStats, battingAverage: newBa };
        commandExecuted = true;
        confirmationMessage = `⚾ **Website Updated!** Updated Batting Average to **${newBa}**!`;
      }
    }

    // Command: Update GPA (e.g. "update GPA to 4.0")
    else if (lowercase.includes('gpa')) {
      const match = originalPrompt.match(/(\d\.\d+)/);
      if (match) {
        const newGpa = match[1];
        updatedAthlete.gpa = newGpa;
        commandExecuted = true;
        confirmationMessage = `🎓 **Website Updated!** Updated Cumulative GPA to **${newGpa}**!`;
      }
    }

    // Command: Add specific target school (e.g. "add UT Tyler to my target list")
    else if (lowercase.includes('target') || lowercase.includes('crm') || lowercase.includes('school')) {
      const foundSchool = collegesDatabase.find(c => lowercase.includes(c.name.toLowerCase()) || lowercase.includes(c.city.toLowerCase()));
      if (foundSchool) {
        if (!updatedTargets.some(t => t.id === foundSchool.id)) {
          updatedTargets.push({
            ...foundSchool,
            status: 'Target',
            addedDate: new Date().toISOString().split('T')[0],
            lastContactDate: '',
            notes: 'Added via Gemini AI Assistant.'
          });
          commandExecuted = true;
          confirmationMessage = `🎯 **Target CRM Updated!** Added **${foundSchool.name}** (${foundSchool.division} - ${foundSchool.state}) to your Target CRM list!`;
        }
      }
    }

    return {
      commandExecuted,
      text: confirmationMessage,
      profileUpdates: commandExecuted ? updatedAthlete : null,
      targetsUpdates: commandExecuted ? updatedTargets : null
    };
  },

  /**
   * General Knowledge Fallback Responder for unrestricted questions
   */
  generateGeneralKnowledgeResponse: (lowercase, originalPrompt, athlete) => {
    // 1. Nursing Questions
    if (lowercase.includes('nursing') || lowercase.includes('nurse') || lowercase.includes('bsn') || lowercase.includes('medical')) {
      return {
        text: `### 🩺 Nursing (BSN) Pathways & Tips for Emily Sain\n\n` +
          `Nursing is a fantastic, high-demand career! Here is what Emily should focus on as a high school sophomore in Alaska:\n\n` +
          `1. **High School Coursework**: Maintain high grades in Chemistry, Biology, and Algebra/Pre-Calculus (Emily's 3.95 GPA is excellent!).\n` +
          `2. **Direct-Entry BSN Programs**: Look for colleges offering *Direct Entry BSN* where you are admitted into the nursing clinical track as a freshman (e.g., UT Tyler, Regis University CO, Pacific Lutheran WA, LeTourneau TX).\n` +
          `3. **Clinical Rotation Schedules & Softball**: Ask college coaches how softball practice and game travel integrate with junior/senior year hospital clinical rotations.\n` +
          `4. **Scholarships**: HRSA NURSE Corps offers 100% full tuition + monthly living stipends for nursing students!\n\n` +
          `> 💡 **Connect Google AI Key**: Connect your Google Gemini API key in the top bar to ask live, detailed questions on any nursing program or topic!`
      };
    }

    // 2. NCAA Rules & Contact Questions
    if (lowercase.includes('ncaa') || lowercase.includes('rule') || lowercase.includes('contact') || lowercase.includes('when') || lowercase.includes('sophomore')) {
      return {
        text: `### 📋 NCAA Recruiting Rules for Class of 2029 Sophomores\n\n` +
          `• **NCAA D1 & D2 Rules**: Head coaches cannot initiate personal phone calls, texts, or private emails with sophomores until **September 1st of Junior Year**.\n` +
          `• **What Emily CAN Do Right Now**: Emily CAN send emails, highlight film, showcase schedules, and call coaches anytime! While D1/D2 coaches can't reply with personal emails yet, they DO watch her video and log her information in their recruit database.\n` +
          `• **NCAA D3 & NAIA**: D3 and NAIA coaches have no contact restrictions and can correspond directly with Emily anytime.`
      };
    }

    // 3. Email & Communication Strategy
    if (lowercase.includes('email') || lowercase.includes('write') || lowercase.includes('contact coach') || lowercase.includes('message')) {
      return {
        text: `### ✉️ College Coach Email Outreach Advice\n\n` +
          `When emailing college head coaches as a sophomore:\n` +
          `1. **Subject Line**: Always include Grad Year, Position, Name, GPA, and Video link (e.g. *Class of 2029 SS - Emily Sain - Chugiak HS (AK) - 3.95 GPA & Hitting Film*).\n` +
          `2. **Keep it Concise**: 3 short paragraphs highlighting GPA, Exit Velo (66 MPH), upcoming showcase dates, and why you love their specific program.\n` +
          `3. **Use the Dashboard Email Builder**: You can use the **Email Builder** tab in the dashboard to generate formatted drafts in 1 click!`
      };
    }

    // 4. Any Other General Question
    return {
      text: `### 🤖 Gemini AI Assistant\n\n` +
        `Hello Emily! I am ready to answer **ANY question** you have about college recruiting, softball strategy, Nursing BSN programs, high school academics, or general topics!\n\n` +
        `Examples of what you can ask me:\n` +
        `• *"What questions should I ask a college nursing professor during a campus visit?"*\n` +
        `• *"How should I prepare for a D2 college prospect camp?"*\n` +
        `• *"Explain the difference between D1, D2, and D3 softball schedules."*\n` +
        `• *"Change my exit velocity to 68 MPH"*\n\n` +
        `> 💡 **Tip**: Connect your Google AI Premium API Key in the top right for live, unrestricted Gemini LLM answers to any question!`
    };
  }
};
