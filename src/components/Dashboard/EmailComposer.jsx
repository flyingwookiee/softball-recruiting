import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, ExternalLink, RefreshCw, Send } from 'lucide-react';

export const EmailComposer = ({ athlete, selectedCollege, targets }) => {
  const [targetCollege, setTargetCollege] = useState(selectedCollege || (targets[0] || null));
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedCollege) {
      setTargetCollege(selectedCollege);
    }
  }, [selectedCollege]);

  useEffect(() => {
    generateEmail();
  }, [targetCollege, athlete]);

  const generateEmail = () => {
    const coachName = targetCollege?.headCoach || '[Coach Name]';
    const schoolName = targetCollege?.name || '[College Name]';

    const subject = `Class of 2029 ${athlete.primaryPosition} - ${athlete.name} - ${athlete.highSchool} (${athlete.state}) - Video & Stats`;

    const body = `Dear Coach ${coachName.split(' ').pop() || coachName},

My name is ${athlete.name}, and I am a High School Sophomore (Class of 2029) at ${athlete.highSchool} in ${athlete.hometown}. I play ${athlete.primaryPosition} and ${athlete.secondaryPosition} for my high school team and ${athlete.travelTeam} (#${athlete.jerseyNumber}).

I am very interested in ${schoolName} because of your outstanding softball program and strong academic offerings in ${athlete.intendedMajors[0] || 'Kinesiology'}.

Here is a quick snapshot of my athletic and academic profile:
• Graduation Year: ${athlete.gradYear} (Sophomore)
• Cumulative GPA: ${athlete.gpa} (${athlete.gpaScale})
• NCAA ID: ${athlete.ncaaId}
• Key Metrics: Exit Velo ${athlete.metrics.exitVelocity} | Throwing Velo ${athlete.metrics.overhandVelocity} | Home-to-First ${athlete.metrics.homeToFirst}

Highlight Reel Link: ${athlete.videos[0]?.hudlUrl || 'https://www.hudl.com'}

My team will be competing at ${athlete.schedule[0]?.event || 'Upcoming Showcase'} on ${athlete.schedule[0]?.dates || 'Upcoming Dates'} in ${athlete.schedule[0]?.location || 'Location'}. I will be wearing jersey #${athlete.jerseyNumber.replace('#','')}.

I would love for you to evaluate my film. Thank you for your time and consideration!

Sincerely,

${athlete.name}
Class of 2029 | ${athlete.primaryPosition} / ${athlete.secondaryPosition}
${athlete.highSchool} (${athlete.hometown})
Email: ${athlete.contact.email} | Phone: ${athlete.contact.phone}
Twitter: ${athlete.contact.twitter}`;

    setEmailSubject(subject);
    setEmailBody(body);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${emailBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoLink = targetCollege?.coachEmail
    ? `mailto:${targetCollege.coachEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    : `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div style={{ marginBottom: '32px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Coach Outreach Email Builder</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Generate personalized introduction emails with auto-populated athlete stats and coach merge tags.
          </p>
        </div>

        {/* Target School Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700 }}>SELECT PROGRAM:</span>
          <select
            className="select"
            style={{ width: 'auto', minWidth: '220px', fontWeight: 700 }}
            value={targetCollege?.id || ''}
            onChange={(e) => {
              const selected = targets.find(t => t.id === e.target.value);
              setTargetCollege(selected || null);
            }}
          >
            {targets.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.division})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        
        {/* Recipient Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px', background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>TO (HEAD COACH EMAIL)</div>
            <div style={{ fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>
              {targetCollege?.coachEmail || 'Select a target school'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>HEAD COACH NAME</div>
            <div style={{ fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
              {targetCollege?.headCoach || 'Head Coach'}
            </div>
          </div>
        </div>

        {/* Email Subject Line */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
            SUBJECT LINE
          </label>
          <input
            type="text"
            className="input"
            value={emailSubject}
            onChange={e => setEmailSubject(e.target.value)}
          />
        </div>

        {/* Email Body TextArea */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
            EMAIL BODY CONTENT
          </label>
          <textarea
            rows={14}
            className="textarea"
            style={{ fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: '1.6' }}
            value={emailBody}
            onChange={e => setEmailBody(e.target.value)}
          />
        </div>

        {/* Controls Row */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button onClick={generateEmail} className="btn btn-outline btn-sm">
            <RefreshCw size={16} /> Reset Template
          </button>

          <button onClick={handleCopy} className="btn btn-outline btn-sm" style={{ borderColor: copied ? '#10b981' : 'var(--border-color)', color: copied ? '#10b981' : 'var(--text-main)' }}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied to Clipboard!' : 'Copy Email Text'}
          </button>

          <a href={mailtoLink} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            <Send size={16} /> Open Email App (Mailto)
          </a>
        </div>

      </div>

    </div>
  );
};
