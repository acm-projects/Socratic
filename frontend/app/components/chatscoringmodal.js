export default function ScoringModal({ onClose }) {
    const scores = [
        { score: 1, label: "Surface Level", desc: "Single-answer, fact-based questions. Useful for orientation, but limited in building real understanding." },
        { score: 2, label: "Developing", desc: "You're moving past memorization and beginning to ask how and why things work." },
        { score: 3, label: "Connecting", desc: "You're drawing on multiple concepts at once, applying knowledge across contexts." },
        { score: 4, label: "Analytical", desc: "You're interrogating the material — comparing frameworks, identifying gaps, and stress-testing your own understanding." },
        { score: 5, label: "Mastery", desc: "You're operating at the level of an expert — questioning assumptions, exploring edge cases, and constructing original lines of reasoning." },
    ]

    return (
        <div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-lg max-h-[70vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >

                {/* Scores */}
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">How Scoring Works</p>
                <div className="flex flex-col gap-5">
                    {scores.map(({ score, label, desc }) => (
                        <div key={score} className="flex gap-4 items-start">
                            {/* Dots */}
                            <div className="flex gap-1 flex-shrink-0 mt-1">
                                {[1, 2, 3, 4, 5].map(dot => (
                                    <div
                                        key={dot}
                                        className={`w-3 h-3 rounded-full ${dot <= score ? "bg-[#4DB5AC]" : "bg-gray-100"}`}
                                    />
                                ))}
                            </div>
                            {/* Text */}
                            <div>
                                <p className="text-sm font-semibold text-black">{label}</p>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-6" />

                {/* Heatmap section */}
                <div className="mb-6">
                    <p className="text-sm font-semibold text-black mb-1">Study Heatmap</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Every question is also reflected in your Study Heatmap — a running record of your intellectual engagement across sessions. It shows not just what you studied, but how rigorously you engaged with it over time.
                    </p>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="w-full py-2.5 rounded-xl bg-[#4DB5AC] text-white text-sm font-semibold hover:bg-[#3da49b] transition-colors"
                >
                    Got it
                </button>
            </div>
        </div>
    )
}
