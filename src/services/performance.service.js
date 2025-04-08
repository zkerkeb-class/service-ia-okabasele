// Fonction d'analyse : Comparaison avec la partition de référence
const comparePerformance = (performance, reference) => {
  let analysis = []
  performance.forEach((notePlayed, index) => {
    const expectedNote = reference[index]
    if (!expectedNote) return // Ignore extra notes played

    let feedback = {
      note: notePlayed.note,
      success: true,
      errors: [],
      color: "green"
    }

    if (notePlayed.note !== expectedNote.note) {
      feedback.success = false
      feedback.color = "red"
      feedback.errors.push({
        type: "note",
        message: `❌ Wrong note: Played ${notePlayed.note}, expected ${expectedNote.note}`
      })
    }

    const timingDiff = Math.abs(notePlayed.time - expectedNote.time)
    if (timingDiff > 200) {
      feedback.success = false
      feedback.color = "red"
      feedback.errors.push({
        type: "timing",
        message: `⏳ Timing off by ${timingDiff}ms`
      })
    }

    const velocityDiff = Math.abs(notePlayed.velocity - expectedNote.velocity)
    if (velocityDiff > 15) {
      feedback.success = false
      feedback.color = "red"
      feedback.errors.push({
        type: "velocity",
        message: `🎵 Dynamics issue: Played at ${notePlayed.velocity}, expected ${expectedNote.velocity}`
      })
    }

    analysis.push(feedback)
  })

  return analysis
}

const generatePrompt = (studentData, referenceScore, analysisResults) => {
  return `
You are a piano teacher AI. Your role is to analyze the student's performance compared to the reference sheet music and provide structured feedback.

## 🎼 Reference Score (Expected Notes):
${referenceScore.map((n) => `- Note: ${n.note}, Time: ${n.time}ms, Velocity: ${n.velocity || "N/A"}`).join("\n")}

## 🎹 Student's Performance:
${studentData.performance.map((n) => `- Note: ${n.note}, Time: ${n.time}ms, Velocity: ${n.velocity}`).join("\n")}

## 📝 Detected Issues:
${analysisResults.map((result) => {
  let errorMessages = result.errors.map((error) => `  - ${error.message}`).join("\n");
  return `- Note: ${result.note}, Status: ${result.success ? "✅ Correct" : "❌ Incorrect"}\n${errorMessages}`;
}).join("\n")}

## 🔍 Feedback Rules:
- If the student has **1-4 mistakes**, return only **color-based feedback** ('green' for correct, 'red' for incorrect).
- If the student makes **5 or more mistakes**, return detailed **feedback messages** about the errors.
- If mistakes exceed **5 in a row**, suggest slowing down the tempo by **-10%**.
- If the student plays **5 correct notes in a row**, suggest increasing the tempo by **+5%**.

## 🛠️ Expected JSON Response Format:
### ✅ Example 1: Minor Mistakes (1-4 errors)
\`\`\`json
{
  "notes": [
    { "note": 64, "color": "red" }
  ]
}
\`\`\`

### ❌ Example 2: Persistent Mistakes (5+ errors)
\`\`\`json
{
  "notes": [
    { "note": 64, "color": "red" },
    { "message": "Wrong note: Played E4 instead of F4." },
    { "message": "Timing off by 350ms (late)." },
    { "message": "Dynamics: Too loud (110), expected 80." }
  ],
  "adjustTempo": -10
}
\`\`\`

## 🔄 Your response **must be strictly in JSON format** without additional text.
  `;
};


module.exports = {
  comparePerformance,
  generatePrompt
}
