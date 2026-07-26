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
   * Main AI entry point with Natural Language Direct Command Execution
   */
  askAssistant: async (prompt, apiKey, athleteContext, targetsContext) => {
    const lowercasePrompt = prompt.toLowerCase();
    
    // Check if the user is asking to update/change/add something on her website
    const executionResult = geminiService.executeNaturalLanguageCommand(lowercasePrompt, prompt, athleteContext, targetsContext);

    // If a direct command was matched and executed
    if (executionResult.commandExecuted) {
      return executionResult;
    }

    // Otherwise, check Gemini API Key for live LLM response
    const aiClient = getGeminiClient(apiKey);
    if (aiClient) {
      try {
        const systemInstruction = `
You are an expert College Softball Recruiting Consultant & Automated Website Assistant for Emily Sain (Class of 2029) at Chugiak High School in Eagle River, AK.
Emily plays Shortstop/Utility for Alaska Arsenal 16U (#14). She wants to major in Nursing (BSN) and is interested in colleges in Texas, Colorado, and the Pacific Northwest.
GPA: ${athleteContext.gpa}, Exit Velo: ${athleteContext.metrics.exitVelocity}.

Instructions:
1. Provide actionable advice for Nursing softball prospects and Class of 2029 sophomores.
2. Recommend softball programs with top Nursing BSN degrees in Texas (UT Tyler, West Texas A&M, St. Mary's, TAMU-Commerce, Tarleton State), Colorado (Colorado Mesa, Regis, UCCS), and PNW (Linfield, PLU).
3. If Emily asks you to update her profile or add target schools, instruct her clearly or confirm the change!
`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Prompt: ${prompt}` }] }
          ]
        });

        if (response && response.text) {
          return { text: response.text };
        }
      } catch (err) {
        console.error("Gemini API error, falling back to intelligent responder", err);
      }
    }

    // Default intelligent responder tailored for Nursing & Texas/Colorado/PNW recruiting
    return geminiService.generateNursingAndRegionalResponse(lowercasePrompt, prompt, athleteContext);
  },

  /**
   * Parses & executes natural language commands to update website profile & CRM directly!
   */
  executeNaturalLanguageCommand: (lowercase, originalPrompt, athlete, targets) => {
    let updatedAthlete = { ...athlete };
    let updatedTargets = [...targets];
    let commandExecuted = false;
    let confirmationMessage = '';

    // Command 1: Update Exit Velocity (e.g., "change exit velo to 68", "update exit velocity to 70 MPH")
    if (lowercase.includes('exit velo') || lowercase.includes('exit velocity')) {
      const match = originalPrompt.match(/(\d+)\s*(mph)?/i);
      if (match) {
        const newVelo = `${match[1]} MPH`;
        updatedAthlete.metrics = { ...updatedAthlete.metrics, exitVelocity: newVelo };
        commandExecuted = true;
        confirmationMessage = `⚡ **Website Updated!** I have updated your Exit Velocity to **${newVelo}** on your public profile!`;
      }
    }

    // Command 2: Update Batting Average (e.g., "change batting average to .450", "update BA to .435")
    else if (lowercase.includes('batting average') || lowercase.includes('ba to') || lowercase.includes('batting avg')) {
      const match = originalPrompt.match(/(\.\d{3}|\d\.\d{3})/);
      if (match) {
        const newBa = match[1];
        updatedAthlete.seasonStats = { ...updatedAthlete.seasonStats, battingAverage: newBa };
        commandExecuted = true;
        confirmationMessage = `⚾ **Website Updated!** I have updated your Batting Average to **${newBa}** on your public profile!`;
      }
    }

    // Command 3: Update GPA (e.g., "update GPA to 4.0", "change gpa to 3.98")
    else if (lowercase.includes('gpa')) {
      const match = originalPrompt.match(/(\d\.\d+)/);
      if (match) {
        const newGpa = match[1];
        updatedAthlete.gpa = newGpa;
        commandExecuted = true;
        confirmationMessage = `🎓 **Website Updated!** I have updated your GPA to **${newGpa}**!`;
      }
    }

    // Command 4: Add Texas & Nursing Colleges to Target List
    else if (lowercase.includes('add texas') || lowercase.includes('add colorado') || lowercase.includes('add nursing')) {
      const nursingSchools = collegesDatabase.filter(c => 
        c.popularMajors.some(m => m.toLowerCase().includes('nursing')) &&
        (c.state === 'TX' || c.state === 'CO' || c.state === 'OR' || c.state === 'WA')
      );

      const newSchoolsAdded = [];
      nursingSchools.forEach(school => {
        if (!updatedTargets.some(t => t.id === school.id)) {
          updatedTargets.push({
            ...school,
            status: 'Target',
            addedDate: new Date().toISOString().split('T')[0],
            lastContactDate: '',
            notes: 'Added via Gemini AI Assistant for Nursing (BSN) focus.'
          });
          newSchoolsAdded.push(school.name);
        }
      });

      if (newSchoolsAdded.length > 0) {
        commandExecuted = true;
        confirmationMessage = `🩺 **Target CRM Updated!** I have added **${newSchoolsAdded.length} top Nursing softball programs** in Texas, Colorado, and PNW directly to your Target CRM:\n\n` +
          newSchoolsAdded.map(s => `• **${s}**`).join('\n');
      }
    }

    // Command 5: Add specific target school by name (e.g., "Add UT Tyler to my targets", "Add Regis to my target list")
    else if (lowercase.includes('add') && (lowercase.includes('target') || lowercase.includes('crm') || lowercase.includes('school'))) {
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
          confirmationMessage = `🎯 **Target CRM Updated!** Added **${foundSchool.name}** (${foundSchool.division} - ${foundSchool.state}) to your target CRM list!`;
        } else {
          commandExecuted = true;
          confirmationMessage = `ℹ️ **${foundSchool.name}** is already in your Target CRM list!`;
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
   * Fallback responder focused on Nursing Majors & Texas/Colorado/PNW schools
   */
  generateNursingAndRegionalResponse: (lowercase, originalPrompt, athlete) => {
    // 1. Nursing Majors & College Recommendation Query
    if (lowercase.includes('nursing') || lowercase.includes('texas') || lowercase.includes('colorado') || lowercase.includes('major') || lowercase.includes('school')) {
      const nursingSchools = collegesDatabase.filter(c => 
        c.popularMajors.some(m => m.toLowerCase().includes('nursing'))
      );

      let replyText = `### 🩺 Top Nursing Softball Programs for Emily Sain (Texas, Colorado & PNW)\n\n`;
      replyText += `Since Emily wants to pursue **Nursing (BSN)** and is interested in **Texas, Colorado, and the Pacific Northwest**, here are premier college softball programs with top-ranked Nursing schools:\n\n`;

      nursingSchools.slice(0, 5).forEach(school => {
        replyText += `#### 🥎 **${school.name}** (${school.division} - ${school.conference})\n`;
        replyText += `• 📍 **Location**: ${school.city}, ${school.state} (${school.region})\n`;
        replyText += `• 🩺 **Nursing Major**: ${school.popularMajors.find(m => m.includes('Nursing')) || 'Nursing BSN'}\n`;
        replyText += `• 🧢 **Head Coach**: ${school.headCoach} (${school.coachEmail})\n`;
        replyText += `• 💡 **Program Notes**: ${school.notes}\n\n`;
      });

      replyText += `---\n\n### ⚡ How Emily Can Update Her Website Live With AI:\n`;
      replyText += `Emily can type natural commands directly in this chat and **I will automatically update her website for her**! Examples:\n`;
      replyText += `1. *"Add Texas and Colorado Nursing schools to my target CRM list"*\n`;
      replyText += `2. *"Change my exit velocity to 68 MPH"*\n`;
      replyText += `3. *"Update my GPA to 4.0"*\n`;
      replyText += `4. *"Add UT Tyler to my target list"*\n`;

      return {
        text: replyText,
        actionRecommendations: nursingSchools.slice(0, 5)
      };
    }

    // Default Response explaining direct website updates
    return {
      text: `### 🤖 Gemini AI Website Assistant for Emily Sain\n\n` +
        `I am Emily's active AI Recruiting Consultant. I can **answer questions** AND **update her website live** when she types to me!\n\n` +
        `#### 🩺 Featured Nursing & Region Recommendations:\n` +
        `• **Texas Programs**: UT Tyler (D2), West Texas A&M (D2), St. Mary's TX (D2), Texas A&M Commerce (D1), Tarleton State (D1).\n` +
        `• **Colorado Programs**: Colorado Mesa (D2), Regis University (D2 - Loretto Heights School of Nursing), UCCS (D2 - Johnson Beth-El School of Nursing).\n` +
        `• **Pacific Northwest**: Linfield University (D3 #1 Softball + Portland Nursing School), Pacific Lutheran (D3 Direct Entry BSN).\n\n` +
        `> 💡 **Try typing a live command right now**: *"Add Texas Nursing schools to my target list"* or *"Change my exit velocity to 68 MPH"*!`
    };
  }
};
