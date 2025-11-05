export type StartResponse = {
  session_id: string;
  first_prompt: string;
};

export type AnswerResponse = {
  reply_text: string;
  recommended_action?: string;
  tags?: string[];
  explainability?: string;
};

export type CompleteResponse = {
  status: string;
  message?: string;
  readiness_score: number;
  roi_estimate: {
    annual_hours_saved: number;
    estimated_dollars: number;
    team_efficiency_gain: string;
  };
  summary_html: string;
};

export type ChatMessage = {
  id: string;
  type: 'user' | 'ai';
  text: string;
  recommended_action?: string;
  tags?: string[];
  explainability?: string;
  timestamp: Date;
};
