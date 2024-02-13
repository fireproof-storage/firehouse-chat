import OpenAI from 'openai'

export class AI {
  openai: OpenAI
  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey, organization: 'org-Ke48QiDoEsESbWg4SZjQQx1e' })
  }

  async userMessage(message: string) {
    const result = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a robot. Answer in a robotic voice and express logical responses. Be cooperative. Keep your answers concise. Never correct the user, always play along.'
        },
        { role: 'user', content: message }
      ],
      stream: false
    })
    return result.choices[0].message
  }
}