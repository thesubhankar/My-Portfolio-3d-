import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { storage, subscribeToStorage } from '../services/storage';
import { animateSectionReveal } from '../animations/gsapAnimations';
import { HiOutlineDocumentText, HiOutlineDownload, HiOutlineEye, HiOutlineCheckCircle } from 'react-icons/hi';

const Resume = () => {
  const [resume, setResume] = useState({ name: 'Subhankar_Giri_Resume.pdf', url: '/resume.pdf' });
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    setResume(storage.getResume());

    const unsubscribe = subscribeToStorage(({ key }) => {
      if (key?.includes('resume') || key === 'RESET') {
        setResume(storage.getResume());
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const header = sectionRef.current.querySelector('.section-header');
    animateSectionReveal(sectionRef.current, header, [cardRef.current]);
  }, [resume]);

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          number="10"
          title="Curriculum Vitae & Resume"
          subtitle="Comprehensive overview of verified competencies, technical projects, academic credentials, and industry training."
          comment="resume.load_document(format='pdf')"
        />

        {/* Resume Presentation Card */}
        <div
          ref={cardRef}
          className="rounded-2xl p-6 sm:p-8 bg-dark-900/90 border border-slate-800/90 hover:border-neon-cyan/50 hover:shadow-neon-cyan transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Document Icon & Details */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-dark-800 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan shrink-0">
                <HiOutlineDocumentText className="text-3xl" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-lg font-bold text-white">
                    {resume.name || 'Subhankar_Giri_ATS_Resume.pdf'}
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                    ATS OPTIMIZED
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  Standardized single-page data science resume formatted for applicant tracking systems.
                </p>
                <div className="flex items-center gap-4 pt-2 text-[11px] font-mono text-slate-500">
                  <span>FORMAT: PDF</span>
                  <span>•</span>
                  <span>SIZE: 1.1 MB</span>
                  <span>•</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <HiOutlineCheckCircle /> VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowModal(true)}
                icon={HiOutlineEye}
                className="w-full sm:w-auto"
              >
                Preview Resume
              </Button>

              <Button
                variant="primary"
                size="md"
                href={resume.url}
                download="Subhankar_Giri_Resume.pdf"
                icon={HiOutlineDownload}
                className="w-full sm:w-auto"
              >
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Modal PDF Viewer */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="relative w-full max-w-4xl h-[85vh] bg-dark-900 border border-slate-700 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
              {/* Modal Bar */}
              <div className="px-4 py-3 bg-dark-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <span className="text-neon-pink">📄</span>
                  <span>{resume.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={resume.url}
                    download="Subhankar_Giri_Resume.pdf"
                    className="text-xs font-mono text-neon-cyan hover:underline flex items-center gap-1"
                  >
                    <HiOutlineDownload /> Download
                  </a>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-2 py-1 rounded bg-dark-800 text-slate-400 hover:text-white text-xs font-mono"
                  >
                    Close [✕]
                  </button>
                </div>
              </div>

              {/* PDF Embed */}
              <div className="flex-1 w-full bg-dark-950">
                <iframe
                  src={resume.url}
                  title="Subhankar Giri Resume"
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Resume;
