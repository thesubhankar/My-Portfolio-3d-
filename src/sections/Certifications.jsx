import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import { storage, subscribeToStorage } from '../services/storage';
import { animateSectionReveal } from '../animations/gsapAnimations';
import { FaAward, FaExternalLinkAlt, FaFilePdf } from 'react-icons/fa';

const Certifications = () => {
  const [certificates, setCertificates] = useState([]);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    setCertificates(storage.getCertificates());

    const unsubscribe = subscribeToStorage(({ key }) => {
      if (key?.includes('certificates') || key === 'RESET') {
        setCertificates(storage.getCertificates());
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const header = sectionRef.current.querySelector('.section-header');
    animateSectionReveal(sectionRef.current, header, cardsRef.current);
  }, [certificates]);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-900 bg-dark-950/40"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          number="5"
          title="Verified Certifications & Credentials"
          subtitle="Accredited certifications validating end-to-end capabilities across full-stack data science, machine learning, and cloud generative AI."
          comment="credentials.verify_all(accredited=True)"
        />

        {/* Compact Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <div
              key={cert.id || idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="rounded-2xl p-5 bg-dark-900/80 border border-slate-800/80 hover:border-neon-cyan/50 hover:shadow-neon-cyan transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Organization & Date */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60 font-mono text-[11px]">
                  <span className="text-neon-pink font-semibold truncate max-w-[200px]">
                    {cert.organization}
                  </span>
                  <span className="text-slate-500">
                    {cert.date || '2024'}
                  </span>
                </div>

                {/* Title & Icon */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-dark-800 border border-slate-700/60 flex items-center justify-center text-neon-cyan group-hover:text-neon-pink group-hover:border-neon-pink/40 transition-colors shrink-0">
                    <FaAward className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-white group-hover:text-neon-cyan transition-colors leading-snug">
                      {cert.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4 line-clamp-2">
                  {cert.description}
                </p>

                {/* Skills tags */}
                {cert.skills && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-dark-800 text-[9px] font-mono text-slate-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Icons (Compact Link) */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  VERIFIED CREDENTIAL
                </span>

                <div className="flex items-center gap-2">
                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 hover:text-neon-pink border border-slate-700/60 transition-colors"
                      title="View PDF Document"
                    >
                      <FaFilePdf className="text-xs" />
                    </a>
                  )}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-300 hover:text-neon-cyan border border-slate-700/60 transition-colors"
                      title="View Online Verification"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
