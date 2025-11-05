'use client';

import { useState } from 'react';
import { ValidatedEntryField } from './ValidatedEntryField';
import { CyberButton } from './CyberButton';

interface UserEntryFormProps {
  onSubmit: (email: string, personaHint: string) => Promise<void>;
}

export function UserEntryForm({ onSubmit }: UserEntryFormProps) {
  const [email, setEmail] = useState('');
  const [personaHint, setPersonaHint] = useState('');
  const [errors, setErrors] = useState<{ email?: string; persona?: string }>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string; persona?: string } = {};
    
    if (!email || !validateEmail(email)) {
      newErrors.email = 'A valid email is required.';
    }
    
    if (personaHint && typeof personaHint !== 'string') {
      newErrors.persona = 'Persona hint must be a string.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await onSubmit(email, personaHint);
    } catch (err: any) {
      const backendErrors = err.validation || [];
      const mapped: { email?: string; persona?: string } = {};
      
      backendErrors.forEach((msg: string) => {
        if (msg.toLowerCase().includes('email')) {
          mapped.email = msg;
        }
        if (msg.toLowerCase().includes('persona') || msg.toLowerCase().includes('hint')) {
          mapped.persona = msg;
        }
      });
      
      setErrors(mapped);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ValidatedEntryField
        id="email"
        label="Email Address"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        placeholder="your.email@domain.com"
      />
      
      <ValidatedEntryField
        id="persona"
        label="Role / Persona (Optional)"
        type="textarea"
        value={personaHint}
        onChange={setPersonaHint}
        error={errors.persona}
        placeholder="e.g., Product Manager, Developer, Designer..."
      />
      
      <CyberButton
        type="submit"
        loading={loading}
        variant="primary"
        className="w-full"
      >
        {loading ? 'Initializing...' : 'Begin Assessment'}
      </CyberButton>
    </form>
  );
}
