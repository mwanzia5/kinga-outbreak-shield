import React, { useState, useEffect } from 'react';

type SymptomEntry = {
  id: string;
  symptomName: string;
  severity: string;
  notes: string;
  hospital: string;
  date: string;
};

const App: React.FC = () => {
  const [symptomName, setSymptomName] = useState<string>('');
  const [severity, setSeverity] = useState<string>('low');
  const [notes, setNotes] = useState<string>('');
  const [hospital, setHospital] = useState<string>('');

  const [symptomEntries, setSymptomEntries] = useState<SymptomEntry[]>([]);

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [suspectedDiseases, setSuspectedDiseases] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Outbreak detection (total > 10 symptoms)
  useEffect(() => {
    if (symptomEntries.length > 10) {
      alert("🚨 Outbreak Alert: More than 10 symptoms have been reported! Please notify health authorities.");
    }
  }, [symptomEntries]);

  // AI Analysis function
  const analyzeSymptoms = async (entries: SymptomEntry[]) => {
    if (entries.length === 0) return;

    setIsAnalyzing(true);

    try {
      const symptomsList = entries.map((s) => s.symptomName).join(', ');

      // 👉 Replace with Gemini API call if available
      const response = `Based on the symptoms reported (${symptomsList}), possible conditions could include:
      - Flu or Common Cold
      - Malaria (if fever and fatigue are common)
      - Migraine (if headaches are frequent)
      ⚠️ This is NOT a medical diagnosis. Please consult a doctor for accurate results.`;

      setAiAnalysis(response);

      // Extract suspected diseases (lines starting with "-")
      const extracted = response
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("-"))
        .map((line) => line.replace(/^- /, ""));

      setSuspectedDiseases(extracted);
    } catch (error) {
      setAiAnalysis("Error analyzing symptoms. Please try again.");
      setSuspectedDiseases([]);
    }

    setIsAnalyzing(false);
  };

  // 🚀 Handle Add + Analyze in one click
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: SymptomEntry = {
      id: crypto.randomUUID(),
      symptomName,
      severity,
      notes,
      hospital,
      date: new Date().toLocaleDateString(),
    };

    const updatedEntries = [...symptomEntries, newEntry];
    setSymptomEntries(updatedEntries);

    // Reset form
    setSymptomName('');
    setSeverity('low');
    setNotes('');
    setHospital('');

    // Check same symptom count
    const sameSymptomCount = updatedEntries.filter(
      (entry) => entry.symptomName.toLowerCase() === newEntry.symptomName.toLowerCase()
    ).length;

    // Run analyzer and then show alert if condition met
    await analyzeSymptoms(updatedEntries);

    if (sameSymptomCount >= 3 && suspectedDiseases.length > 0) {
      alert(
        `🚨 Alert: "${newEntry.symptomName}" has been reported ${sameSymptomCount} times!\n\n` +
        `Possible suspected diseases:\n- ${suspectedDiseases.join("\n- ")}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans antialiased">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 tracking-tight sm:text-5xl">
          Symptom Tracker
        </h1>
        <p className="mt-2 text-center text-lg text-gray-600">
          Log and analyze your symptoms with AI assistance.
        </p>
      </header>
      
      <main className="max-w-4xl mx-auto space-y-8">
        {/* Symptom Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Log a New Symptom</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="symptomName" className="block text-sm font-medium text-gray-700 mb-1">
                Symptom Name
              </label>
              <input
                id="symptomName"
                type="text"
                value={symptomName}
                onChange={(e) => setSymptomName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Headache, Fatigue"
              />
            </div>

            <div>
              <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
                Hospital
              </label>
              <input
                id="hospital"
                type="text"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Nairobi Hospital"
              />
            </div>

            <div>
              <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
                Severity
              </label>
              <select
                id="severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional details about the symptom..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isAnalyzing}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isAnalyzing ? "Adding & Analyzing..." : "Add & Analyze"}
              </button>
            </div>
          </form>
        </div>

        {/* Symptom History */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Symptom History</h2>
          {symptomEntries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symptom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hospital</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {symptomEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{entry.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{entry.symptomName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{entry.hospital}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          entry.severity === 'high'
                            ? 'bg-red-100 text-red-800'
                            : entry.severity === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {entry.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{entry.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">No symptoms logged yet.</p>
          )}
        </div>

        {/* AI Analysis */}
        {aiAnalysis && (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Symptom Analysis</h2>
            <p className="text-gray-700 whitespace-pre-line">{aiAnalysis}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
