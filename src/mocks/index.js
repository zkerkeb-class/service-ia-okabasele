const mockData = {
  userId: "test_user_123",
  performance: [
    { note: 60, velocity: 90, time: 0 }, // C4
    { note: 62, velocity: 85, time: 500 }, // D4
    { note: 64, velocity: 80, time: 1000 }, // E4
    { note: 65, velocity: 78, time: 1500 }, // F4
    { note: 67, velocity: 75, time: 2000 } // G4
  ]
}

const mockDataSameNoteDifferentVelocityTime = {
    userId: "test_user_789",
    performance: [
        { note: 60, velocity: 95, time: 100 }, // C4
        { note: 62, velocity: 80, time: 600 }, // D4
        { note: 64, velocity: 85, time: 1100 }, // E4
        { note: 65, velocity: 70, time: 1600 }, // F4
        { note: 67, velocity: 65, time: 2100 } // G4
    ]
}

const mockDataMismatch = {
    userId: "test_user_456",
    performance: [
        { note: 61, velocity: 88, time: 0 }, // C#4
        { note: 63, velocity: 82, time: 550 }, // D#4
        { note: 66, velocity: 77, time: 1100 }, // F#4
        { note: 68, velocity: 74, time: 1600 }, // G#4
        { note: 70, velocity: 70, time: 2100 } // A#4
    ]
}
const mockDataError = {
    userId: "test_user_456",
    performance: [
        { note: 60, velocity: 70, time: 300 }, // C4
        { note: 62, velocity: 70, time: 550 }, // D4
        { note: 64, velocity: 77, time: 1100 }, // E4
        { note: 65, velocity: 74, time: 1600 }, // F4
        { note: 67, velocity: 70, time: 2300 } // G4
    ]
}

const referenceScore = {
    title: "Basic C Major Scale",
    reference: [
      { note: 60, time: 0, velocity: 90 },   // C4 (fort)
      { note: 62, time: 500, velocity: 85 }, // D4
      { note: 64, time: 1000, velocity: 80 }, // E4 (moyen)
      { note: 65, time: 1500, velocity: 78 }, // F4
      { note: 67, time: 2000, velocity: 75 }, // G4 (doux)
    ],
  };

const generateMockFeedback = (analysisResults) => {
    const feedback = {
        notes: [],
        adjustTempo: null
    };

    let consecutiveErrors = 0;
    let consecutiveSuccesses = 0;

    analysisResults.forEach(issue => {
        feedback.notes.push({ note: issue.note, color: issue.color });

        if (issue.success) {
            consecutiveSuccesses++;
            consecutiveErrors = 0; // Reset errors counter
        } else {
            consecutiveErrors++;
            consecutiveSuccesses = 0; // Reset success counter
        }

        // Si 5 erreurs consécutives, ralentir de 10%
        if (consecutiveErrors === 5) {
            feedback.adjustTempo = -10;
        }

        // Si 5 notes correctes consécutives, accélérer de 10%
        if (consecutiveSuccesses === 5) {
            feedback.adjustTempo = 10;
        }
    });
    return feedback;
}

module.exports = {
    mockData,
    mockDataSameNoteDifferentVelocityTime,
    mockDataMismatch,
    mockDataError,
    referenceScore,
    generateMockFeedback
}